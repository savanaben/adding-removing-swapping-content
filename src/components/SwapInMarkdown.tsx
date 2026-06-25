import { useMemo } from 'react'
import type { Components } from 'react-markdown'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

export function SwapInMarkdown({
  markdown,
  eagerImages = false,
  theme = 'default',
  highlightOnSwap = true,
}: {
  markdown: string
  /** Use for invisible measure layers so dimensions match before swap (lazy imgs stay 0-height briefly). */
  eagerImages?: boolean
  theme?: 'default' | 'beige' | 'dark'
  highlightOnSwap?: boolean
}) {
  const components = useMemo<Components>(() => {
    const imgBorder = highlightOnSwap
      ? theme === 'dark'
        ? 'border-[#c4b5fd]'
        : 'border-purple-200'
      : theme === 'dark'
        ? 'border-[#555]'
        : 'border-slate-200'
    return {
      a: ({ href, children, className, ...props }) => (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className={cn(
            highlightOnSwap &&
              theme === 'dark' &&
              'font-medium text-[#e9d5ff] underline underline-offset-2 hover:text-white',
            className,
          )}
          {...props}
        >
          {children}
        </a>
      ),
      img: ({ src, alt, ...props }) => (
        <img
          src={src}
          alt={alt ?? ''}
          loading={eagerImages ? 'eager' : 'lazy'}
          decoding={eagerImages ? 'sync' : 'async'}
          {...props}
          className={cn(
            'my-2 max-h-[400px] max-w-full rounded object-contain',
            imgBorder,
          )}
        />
      ),
    }
  }, [eagerImages, theme, highlightOnSwap])

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {markdown}
    </ReactMarkdown>
  )
}
