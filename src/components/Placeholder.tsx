import { useSnapshot } from 'valtio'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { store } from '@/store'
import { SwapInMarkdown } from '@/components/SwapInMarkdown'

function MoreComingLockIcon({ fill }: { fill: string }) {
  return (
    <svg
      width="60"
      height="90"
      viewBox="0 0 40 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M40 40C40 51.0457 31.0457 60 20 60C8.9543 60 0 51.0457 0 40C0 28.9543 8.9543 20 20 20C31.0457 20 40 28.9543 40 40ZM22.0981 39.5398C23.8115 38.7466 25 37.0121 25 35C25 32.2386 22.7614 30 20 30C17.2386 30 15 32.2386 15 35C15 37.0121 16.1885 38.7466 17.9019 39.5398L16 50H24L22.0981 39.5398Z"
        fill={fill}
      />
      <path
        d="M20.0352 0C28.3194 0 35.0352 6.71573 35.0352 15V30H5.03516V15C5.03516 6.71573 11.7509 0 20.0352 0ZM20.1016 6C15.131 6 11.1016 10.0294 11.1016 15V25H29.1016V15C29.1016 10.0294 25.0721 6 20.1016 6Z"
        fill={fill}
      />
    </svg>
  )
}

function ReplacementPanel({
  className,
  markdown,
  measureLayer = false,
  theme,
  highlightOnSwap = true,
}: {
  className?: string
  markdown: string
  /** Invisible stack layer: eager-load images so row height matches swapped-in prose. */
  measureLayer?: boolean
  theme: 'default' | 'beige' | 'dark'
  highlightOnSwap?: boolean
}) {
  const isDarkSwap = theme === 'dark'

  return (
    <div
      className={cn(
        'rounded-md p-4 max-w-none leading-[1.4] prose prose-p:my-3 prose-p:leading-[1.4] prose-headings:my-4 prose-headings:leading-[1.4] prose-ul:my-3 prose-li:my-0.5 prose-li:leading-[1.4] [&>*:first-child]:!mt-0 [&>*:last-child]:!mb-0',
        highlightOnSwap
          ? isDarkSwap
            ? 'bg-[#2a1250] ring-4 ring-[#d8b4fe] text-[#EBEBEB] prose-headings:text-[#EBEBEB] prose-p:text-[#EBEBEB] prose-strong:text-[#EBEBEB] prose-li:text-[#EBEBEB] prose-li:marker:text-[#d8b4fe]'
            : 'bg-purple-100 ring-4 ring-purple-500 prose-slate'
          : isDarkSwap
            ? 'prose-invert'
            : 'prose-slate',
        className,
      )}
    >
      <SwapInMarkdown
        markdown={markdown}
        eagerImages={measureLayer}
        theme={theme}
        highlightOnSwap={highlightOnSwap}
      />
    </div>
  )
}

export function Placeholder() {
  const snap = useSnapshot(store)
  const { mode, widthPercent, height, moreComingText, matchHeightToContent, alignment, highlightOnSwap } =
    snap.placeholderConfig
  const { isSwapped, swapAnimationPhase, swapInMarkdown, theme } = snap

  const placeholderSurface =
    theme === 'dark'
      ? 'box-border rounded-[6px] border-2 border-[#AFAFAF] bg-[#3c3c3c]'
      : theme === 'beige'
        ? 'box-border rounded-[6px] border-2 border-[#696969] bg-[rgb(237,237,213)]'
        : 'box-border rounded-[6px] border-2 border-[#696969] bg-[#EEEEEE]'

  const moreComingLockFill = theme === 'dark' ? '#c7c7c7' : '#909090'
  const moreComingTextClass =
    theme === 'dark' ? 'text-[#c7c7c7]' : 'text-[#696969]'

  const fixedBlankHeight = Math.max(40, height)
  /** More coming is always full width; blank below 100% uses that % of column. */
  const blankWidthExplicit =
    mode === 'blank' && widthPercent < 100 ? `${widthPercent}%` : null
  const heightStyle =
    mode === 'moreComing' || (mode === 'blank' && matchHeightToContent)
      ? 'auto'
      : `${fixedBlankHeight}px`
  /** Blank + match height to content: invisible replacement copy sizes the grid. */
  const blankAutoHeight = mode === 'blank' && matchHeightToContent

  const blankJustifySelf =
    mode === 'blank' && blankWidthExplicit
      ? alignment === 'left'
        ? 'justify-self-start'
        : alignment === 'center'
          ? 'justify-self-center'
          : 'justify-self-end'
      : null

  /** Full column width always so swapped-in content uses passage width, not the narrow placeholder box. */
  const containerClass =
    'relative inline-grid w-full max-w-full min-w-0 align-top'

  return (
    <div id="placeholder-anchor" className={containerClass}>
      {/* Keep mounted for entire blank+auto swap: removing this when isSwapped flips true + AnimatePresence mode="wait" leaves a frame with no row height (stutter). */}
      {blankAutoHeight && (
        <div
          className="pointer-events-none invisible col-start-1 row-start-1 w-full"
          aria-hidden
        >
          <ReplacementPanel markdown={swapInMarkdown} measureLayer theme={theme} highlightOnSwap={highlightOnSwap} />
        </div>
      )}
      <AnimatePresence mode="wait">
        {!isSwapped ? (
          <motion.div
            key="placeholder"
            initial={{ opacity: 1 }}
            animate={{
              opacity:
                swapAnimationPhase === 'fadeOut' || swapAnimationPhase === 'pause'
                  ? 0
                  : 1,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={cn(
              'relative z-10 col-start-1 row-start-1 flex max-w-full',
              placeholderSurface,
              blankWidthExplicit
                ? cn(
                    'w-auto',
                    mode === 'blank'
                      ? blankJustifySelf
                      : 'justify-self-start',
                  )
                : 'w-full',
              mode === 'moreComing'
                ? 'flex-col items-center gap-[16px] p-4'
                : 'items-center justify-center',
              blankAutoHeight && 'h-full min-h-[40px]',
            )}
            style={{
              ...(blankWidthExplicit
                ? { width: blankWidthExplicit, maxWidth: '100%' }
                : blankAutoHeight
                  ? {}
                  : { width: '100%' }),
              height: blankAutoHeight ? undefined : heightStyle,
            }}
          >
            {mode === 'moreComing' && (
              <>
                <MoreComingLockIcon fill={moreComingLockFill} />
                <p
                  className={cn(
                    'm-0 select-none text-center italic',
                    moreComingTextClass,
                  )}
                >
                  {moreComingText}
                </p>
              </>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="replacement"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 col-start-1 row-start-1 w-full min-w-0"
          >
            <ReplacementPanel markdown={swapInMarkdown} theme={theme} highlightOnSwap={highlightOnSwap} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
