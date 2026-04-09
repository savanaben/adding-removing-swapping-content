import { proxy } from 'valtio'
import { DEFAULT_SWAP_IN_MARKDOWN } from '@/swapInSamples'

export const store = proxy({
  activeTab: 'tab1',

  theme: 'default' as 'default' | 'beige' | 'dark',

  swapInMarkdown: DEFAULT_SWAP_IN_MARKDOWN,

  placeholderConfig: {
    mode: 'blank' as 'blank' | 'moreComing',
    /** Blank width as % of passage column (100% = full column). */
    widthPercent: 100,
    /** When true (blank mode), height follows swapped-in content; height slider is unused. */
    matchHeightToContent: true,
    /** Fixed blank height when matchHeightToContent is false; minimum 40px. */
    height: 100,
    /** Horizontal placement of the blank placeholder when width is less than full column. */
    alignment: 'left' as 'left' | 'center' | 'right',
    moreComingText: 'Later you will read the rest of the passage.',
  },

  placeholderTab: 'tab1',
  isSwapped: false,
  activityPanelOpen: false,
  swapAnimationPhase: 'idle' as 'idle' | 'fadeOut' | 'pause' | 'fadeIn' | 'done',
})

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

const PASSAGE_SCROLL_AREA_ID = 'passage-scroll-area'
/** Distance from top of passage scroll region to top of placeholder after autoscroll */
const PLACEHOLDER_SCROLL_TOP_INSET = 50

/** Pixels — treat scroll position as “at target” when within this of the computed goal */
const SCROLL_TOP_TOLERANCE = 2

function scrollPlaceholderToPassageTopInset(): {
  scrollRegion: HTMLElement
  targetScrollTop: number
} | null {
  const anchor = document.getElementById('placeholder-anchor')
  const scrollRegion = document.getElementById(PASSAGE_SCROLL_AREA_ID)
  if (!anchor || !scrollRegion) return null

  const anchorTopInScrollContent =
    anchor.getBoundingClientRect().top -
    scrollRegion.getBoundingClientRect().top +
    scrollRegion.scrollTop

  const nextScrollTop = Math.max(
    0,
    anchorTopInScrollContent - PLACEHOLDER_SCROLL_TOP_INSET,
  )

  const alreadyThere =
    Math.abs(scrollRegion.scrollTop - nextScrollTop) <= SCROLL_TOP_TOLERANCE

  if (!alreadyThere) {
    scrollRegion.scrollTo({ top: nextScrollTop, behavior: 'smooth' })
  }

  return { scrollRegion, targetScrollTop: nextScrollTop }
}

/**
 * Resolves when programmatic smooth scrolling has finished (or position already matches).
 * Uses `scrollend` when available; otherwise polls until `scrollTop` stays near the target.
 */
function waitForScrollComplete(
  scrollRegion: HTMLElement,
  targetScrollTop: number,
): Promise<void> {
  const atTarget = () =>
    Math.abs(scrollRegion.scrollTop - targetScrollTop) <= SCROLL_TOP_TOLERANCE

  if (atTarget()) {
    return Promise.resolve()
  }

  return new Promise((resolve) => {
    let done = false
    const finish = () => {
      if (done) return
      done = true
      scrollRegion.removeEventListener('scrollend', onScrollEnd)
      clearInterval(pollId)
      clearTimeout(safetyId)
      resolve()
    }

    const onScrollEnd = () => finish()

    scrollRegion.addEventListener('scrollend', onScrollEnd, { once: true })

    let stableTicks = 0
    const pollId = window.setInterval(() => {
      if (atTarget()) {
        stableTicks += 1
        if (stableTicks >= 4) finish()
      } else {
        stableTicks = 0
      }
    }, 24)

    const safetyId = window.setTimeout(finish, 12_000)
  })
}

export type RunSwapOptions = { skipCloseModal?: boolean }

export async function runSwapSequence(options: RunSwapOptions = {}) {
  if (!options.skipCloseModal) {
    store.activityPanelOpen = false
    await sleep(800)
  }

  store.activeTab = store.placeholderTab
  await sleep(800)

  const scrollInfo = scrollPlaceholderToPassageTopInset()
  if (scrollInfo) {
    await waitForScrollComplete(
      scrollInfo.scrollRegion,
      scrollInfo.targetScrollTop,
    )
  }

  await sleep(300)

  store.swapAnimationPhase = 'fadeOut'
  await sleep(400)

  store.swapAnimationPhase = 'pause'
  await sleep(200)

  store.isSwapped = true
  await sleep(200)

  store.swapAnimationPhase = 'fadeIn'
  await sleep(400)

  store.swapAnimationPhase = 'done'
}

export function resetDemo() {
  store.isSwapped = false
  store.swapAnimationPhase = 'idle'
}
