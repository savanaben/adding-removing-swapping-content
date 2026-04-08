import { useSnapshot } from 'valtio'
import { store, runSwapSequence, resetDemo } from '@/store'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

export function ActivityPanel() {
  const snap = useSnapshot(store)

  return (
    <Dialog
      open={snap.activityPanelOpen}
      onOpenChange={(open) => {
        store.activityPanelOpen = open
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Activity Panel</DialogTitle>
          <DialogDescription>
            Add research content or reset the demo.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 pt-2">
          <Button onClick={() => runSwapSequence()}>Add Research</Button>
          <Button variant="outline" onClick={() => resetDemo()}>
            Reset
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
