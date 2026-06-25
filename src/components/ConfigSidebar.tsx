import type { ReactNode } from 'react'
import { useSnapshot } from 'valtio'
import { cn } from '@/lib/utils'
import { store, runSwapSequence, resetDemo } from '@/store'
import {
  SWAP_SAMPLE_LESS,
  SWAP_SAMPLE_MORE,
  SWAP_SAMPLE_MAX,
} from '@/swapInSamples'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

function SidebarInfo({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-2 rounded-md border border-sky-200 bg-sky-50 px-2.5 py-2 text-[0.6rem] leading-snug text-sky-950">
      <span
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-600 text-[10px] font-semibold leading-none text-white"
        aria-hidden
      >
        i
      </span>
      <p className="min-w-0 flex-1">{children}</p>
    </div>
  )
}

export function ConfigSidebar() {
  const snap = useSnapshot(store)
  const {
    mode,
    widthPercent,
    height,
    moreComingText,
    matchHeightToContent,
    alignment,
    highlightOnSwap,
  } = snap.placeholderConfig

  return (
    <aside className="flex h-screen w-[400px] shrink-0 flex-col gap-6 overflow-y-auto border-l border-slate-200 bg-white px-5 pb-5 text-[#262626] [color-scheme:light]">
      <div className="sticky top-0 z-20 -mx-5 shrink-0 border-b border-slate-200 bg-white px-4 pb-2 pt-2 shadow-[0_4px_6px_-4px_rgba(0,0,0,0.06)]">
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            className="flex-1"
            onClick={() => runSwapSequence({ skipCloseModal: true })}
          >
            Trigger
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => resetDemo()}
          >
            Reset
          </Button>
        </div>
      </div>

      <h2 className="text-[0.9rem] font-semibold tracking-tight">Placeholder Box Config</h2>

      <div className="flex flex-col gap-2">
        <Label className="text-xs font-bold">Placeholder Variant</Label>
        <Select
          value={mode}
          onValueChange={(v) => {
            store.placeholderConfig.mode = v as 'blank' | 'moreComing'
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="blank">Blank</SelectItem>
            <SelectItem value="moreComing">More Coming</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {mode === 'blank' && (
        <div className="flex flex-col gap-2">
          <Label className="text-xs font-bold">Alignment</Label>
          <div className="flex h-9 w-full overflow-hidden rounded-md border border-slate-200 bg-slate-100 p-px shadow-sm">
            {(
              [
                { id: 'left' as const, label: 'Left' },
                { id: 'center' as const, label: 'Middle' },
                { id: 'right' as const, label: 'Right' },
              ] as const
            ).map(({ id, label }) => (
              <Button
                key={id}
                type="button"
                size="sm"
                variant={alignment === id ? 'default' : 'outline'}
                className={cn(
                  'h-full min-w-0 flex-1 rounded-sm px-1 text-xs shadow-none',
                  alignment !== id && 'border-0 bg-transparent hover:bg-white/80',
                )}
                onClick={() => {
                  store.placeholderConfig.alignment = id
                }}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {mode === 'blank' && (
        <div className="flex flex-col gap-3">
          <Label className="text-xs font-bold">Width</Label>
          <div className="flex flex-col gap-2">
            <Label className="text-xs">{widthPercent}%</Label>
            <Slider
              min={0}
              max={100}
              step={1}
              value={[Math.min(100, Math.max(0, widthPercent))]}
              onValueChange={([v]) => {
                store.placeholderConfig.widthPercent = Math.min(100, Math.max(0, v))
              }}
            />
          </div>
          <SidebarInfo>
            For this width slider, use the same version we have for images (allows %,
            px, 12-column, and free-text-entry values). Ideally there are minimum values (is it ever valid to have some element be 0px wide), but this would be a larger discussion across all usages of this slider (e.g. on image component).
          </SidebarInfo>
        </div>
      )}

      {mode === 'blank' && (
        <div className="flex flex-col gap-3">
          <Label className="text-xs font-bold">Height</Label>
          <div className="flex items-start gap-2">
            <input
              id="match-height-placeholder"
              type="checkbox"
              checked={matchHeightToContent}
              onChange={(e) => {
                const checked = e.target.checked
                store.placeholderConfig.matchHeightToContent = checked
                if (!checked && store.placeholderConfig.height < 40) {
                  store.placeholderConfig.height = 40
                }
              }}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border border-slate-900 text-slate-900 accent-slate-900"
            />
            <Label
              htmlFor="match-height-placeholder"
              className="cursor-pointer text-xs font-normal leading-snug"
            >
              Match height to content
            </Label>
          </div>
          <div className="flex flex-col gap-2">
            <Label
              className={cn(
                'text-xs',
                matchHeightToContent && 'text-slate-400',
              )}
            >
              {matchHeightToContent
                ? '(slider off)'
                : `${Math.max(40, height)}px`}
            </Label>
            <Slider
              min={40}
              max={600}
              step={1}
              disabled={matchHeightToContent}
              value={[Math.max(40, height)]}
              onValueChange={([v]) => {
                store.placeholderConfig.height = Math.max(40, v)
              }}
            />
            <SidebarInfo>
              For height slider, constrain to px values only (slider and free-text-entry).
              Ideally add a minimum value of 40px. Ideally add a max value of 600px.
            </SidebarInfo>
          </div>
        </div>
      )}

      {mode === 'moreComing' && (
        <div className="flex flex-col gap-2">
          <Label className="text-xs">Display Text</Label>
          <Input
            value={moreComingText}
            onChange={(e) => {
              store.placeholderConfig.moreComingText = e.target.value
            }}
          />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label className="text-xs font-bold">Highlight on Swap</Label>
        <Select
          value={highlightOnSwap ? 'yes' : 'no'}
          onValueChange={(v) => {
            store.placeholderConfig.highlightOnSwap = v === 'yes'
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-3 border-t border-slate-200 pt-5">
        <h2 className="text-[0.9rem] font-semibold tracking-tight">Content swapped in</h2>
        <SidebarInfo>
          this section is just for prototype testing of different lengths of content.
        </SidebarInfo>
        <p className="text-[0.65rem] leading-snug text-slate-500">
          Markdown supported (headings, lists, paragraphs). Link an image:{' '}
          <code className="rounded bg-slate-100 px-1 text-[0.6rem]">
            ![description](https://picsum.photos/200/100)
          </code>
        </p>
        <textarea
          className="min-h-[180px] w-full resize-y rounded-md border border-slate-200 bg-white px-3 py-2 text-[0.65rem] leading-normal text-slate-900 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
          spellCheck={false}
          value={snap.swapInMarkdown}
          onChange={(e) => {
            store.swapInMarkdown = e.target.value
          }}
        />
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            className="text-xs"
            onClick={() => {
              store.swapInMarkdown = SWAP_SAMPLE_LESS
            }}
          >
            Less content
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-xs"
            onClick={() => {
              store.swapInMarkdown = SWAP_SAMPLE_MORE
            }}
          >
            More
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-xs"
            onClick={() => {
              store.swapInMarkdown = SWAP_SAMPLE_MAX
            }}
          >
            Max
          </Button>
        </div>
      </div>
    </aside>
  )
}
