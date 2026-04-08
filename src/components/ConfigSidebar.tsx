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

export function ConfigSidebar() {
  const snap = useSnapshot(store)
  const { mode, width, height, moreComingText, matchHeightToContent } =
    snap.placeholderConfig

  return (
    <aside className="flex h-screen w-[300px] shrink-0 flex-col gap-6 overflow-y-auto border-l border-slate-200 bg-white p-5 text-[#262626] [color-scheme:light]">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            className="flex-1"
            onClick={() => runSwapSequence({ skipCloseModal: true })}
          >
            Add Research
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

      <h2 className="text-[0.9rem] font-semibold tracking-tight">Placeholder Config</h2>

      <div className="flex flex-col gap-2">
        <Label className="text-xs">Mode</Label>
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

      <div className="flex flex-col gap-2">
        <Label className="text-xs">
          Width: {width === 0 ? 'auto' : `${width}px`}
        </Label>
        <Slider
          min={0}
          max={800}
          step={10}
          value={[width]}
          onValueChange={([v]) => {
            store.placeholderConfig.width = v
          }}
        />
      </div>

      {mode === 'blank' && (
        <div className="flex flex-col gap-3">
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
              Height:{' '}
              {matchHeightToContent
                ? '(slider off)'
                : `${Math.max(40, height)}px`}
            </Label>
            <Slider
              min={40}
              max={600}
              step={10}
              disabled={matchHeightToContent}
              value={[Math.max(40, height)]}
              onValueChange={([v]) => {
                store.placeholderConfig.height = Math.max(40, v)
              }}
            />
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

      <div className="flex flex-col gap-3 border-t border-slate-200 pt-5">
        <h2 className="text-[0.9rem] font-semibold tracking-tight">Content swapped in</h2>
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
