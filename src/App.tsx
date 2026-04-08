import { useSnapshot } from 'valtio'
import { cn } from '@/lib/utils'
import { store } from '@/store'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { PassagePage1, PassagePage2, PassagePage3 } from '@/components/PassagePage'
import { ConfigSidebar } from '@/components/ConfigSidebar'
import { ActivityPanel } from '@/components/ActivityPanel'

const THEMES = ['default', 'beige', 'dark'] as const

function cycleTheme() {
  const i = THEMES.indexOf(store.theme)
  store.theme = THEMES[(i + 1) % THEMES.length]!
}

function themeLabel(t: (typeof THEMES)[number]) {
  if (t === 'default') return 'Theme · Default'
  if (t === 'beige') return 'Theme · Beige'
  return 'Theme · Dark'
}

function App() {
  const snap = useSnapshot(store)
  const { theme } = snap

  return (
    <div
      className={cn(
        'flex h-screen min-h-0 overflow-hidden',
        theme === 'default' && 'bg-slate-50 text-[#262626]',
        theme === 'beige' && 'bg-[rgb(246,246,230)] text-[#262626]',
        theme === 'dark' && 'bg-[#1a1a1a] text-[#EBEBEB]',
      )}
    >
      <div
        className={cn(
          'flex min-h-0 flex-1 flex-col overflow-hidden',
          theme === 'dark' && 'text-[#EBEBEB]',
        )}
      >
        <Tabs
          value={snap.activeTab}
          onValueChange={(v) => {
            store.activeTab = v
          }}
          className="flex min-h-0 flex-1 flex-col overflow-hidden"
        >
          <div
            className={cn(
              'flex shrink-0 items-center justify-between gap-4 border-b px-4 py-2',
              theme === 'dark'
                ? 'border-[#555] bg-[#252525]'
                : 'border-slate-200 bg-white',
            )}
          >
            <TabsList
              className={cn(theme === 'dark' && 'bg-[#333] text-[#EBEBEB]')}
            >
              <TabsTrigger
                value="tab1"
                className={cn(theme === 'dark' && 'data-[state=active]:bg-[#1a1a1a] data-[state=active]:text-[#EBEBEB]')}
              >
                Renewable Energy
              </TabsTrigger>
              <TabsTrigger
                value="tab2"
                className={cn(theme === 'dark' && 'data-[state=active]:bg-[#1a1a1a] data-[state=active]:text-[#EBEBEB]')}
              >
                Ocean Currents
              </TabsTrigger>
              <TabsTrigger
                value="tab3"
                className={cn(theme === 'dark' && 'data-[state=active]:bg-[#1a1a1a] data-[state=active]:text-[#EBEBEB]')}
              >
                Cartography
              </TabsTrigger>
            </TabsList>
            <div className="flex shrink-0 items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className={cn(
                  theme === 'dark' &&
                    'border-[#AFAFAF] bg-[#3c3c3c] text-[#EBEBEB] hover:bg-[#4a4a4a] hover:text-[#EBEBEB]',
                )}
                onClick={cycleTheme}
              >
                {themeLabel(snap.theme)}
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  store.activityPanelOpen = true
                }}
              >
                Activity Panel
              </Button>
            </div>
          </div>

          <div
            id="passage-scroll-area"
            className="min-h-0 flex-1 overflow-y-auto px-6 pt-6"
          >
            <TabsContent value="tab1" forceMount className={snap.activeTab === 'tab1' ? '' : 'hidden'}>
              <PassagePage2 />
            </TabsContent>
            <TabsContent value="tab2" forceMount className={snap.activeTab === 'tab2' ? '' : 'hidden'}>
              <PassagePage1 />
            </TabsContent>
            <TabsContent value="tab3" forceMount className={snap.activeTab === 'tab3' ? '' : 'hidden'}>
              <PassagePage3 />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <ConfigSidebar />
      <ActivityPanel />
    </div>
  )
}

export default App
