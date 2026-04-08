import { proxy } from 'valtio'
import { DEFAULT_SWAP_IN_MARKDOWN } from '@/swapInSamples'

export const store = proxy({
  activeTab: 'tab1',

  theme: 'default' as 'default' | 'beige' | 'dark',

  swapInMarkdown: DEFAULT_SWAP_IN_MARKDOWN,

  placeholderConfig: {
    mode: 'blank' as 'blank' | 'moreComing',
    width: 0,
    /** When true (blank mode), height follows swapped-in content; height slider is unused. */
    matchHeightToContent: true,
    /** Fixed blank height when matchHeightToContent is false; minimum 40px. */
    height: 40,
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

function scrollPlaceholderToPassageTopInset() {
  const anchor = document.getElementById('placeholder-anchor')
  const scrollRegion = document.getElementById(PASSAGE_SCROLL_AREA_ID)
  if (!anchor || !scrollRegion) return

  const anchorTopInScrollContent =
    anchor.getBoundingClientRect().top -
    scrollRegion.getBoundingClientRect().top +
    scrollRegion.scrollTop

  const nextScrollTop = Math.max(
    0,
    anchorTopInScrollContent - PLACEHOLDER_SCROLL_TOP_INSET,
  )
  scrollRegion.scrollTo({ top: nextScrollTop, behavior: 'smooth' })
}

export type RunSwapOptions = { skipCloseModal?: boolean }

export async function runSwapSequence(options: RunSwapOptions = {}) {
  if (!options.skipCloseModal) {
    store.activityPanelOpen = false
    await sleep(800)
  }

  store.activeTab = store.placeholderTab
  await sleep(800)

  scrollPlaceholderToPassageTopInset()

  await sleep(500)

  store.swapAnimationPhase = 'fadeOut'
  await sleep(400)

  store.swapAnimationPhase = 'pause'
  await sleep(200)

  store.isSwapped = true
  await sleep(250)

  store.swapAnimationPhase = 'fadeIn'
  await sleep(500)

  store.swapAnimationPhase = 'done'
}

export function resetDemo() {
  store.isSwapped = false
  store.swapAnimationPhase = 'idle'
}
