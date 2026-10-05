import { useState } from 'react'
import Landing from './Landing'
import { CreateRoom, Dashboard, Profile, Summary, TeacherRoom, TeacherShell } from './Teacher'
import { Join, StudentBar, StudentRoom } from './Student'
import System from './System'
import { Icon, useToast } from './ui'

const screens: [string, string][] = [
  ['landing', 'Landing'], ['dashboard', 'Dashboard'], ['create', 'Create'], ['room', 'Teacher room'],
  ['join', 'Join'], ['student', 'Student room'], ['summary', 'Summary'], ['system', 'Components'],
]

export default function App() {
  const [screen, setScreen] = useState('landing')
  const [dark, setDark] = useState(false)
  const { show, node } = useToast()

  const go = (s: string) => { setScreen(s); window.scrollTo(0, 0) }
  const teacher = (active: string, el: React.ReactNode) => <TeacherShell active={active} go={go}>{el}</TeacherShell>

  let view: React.ReactNode
  switch (screen) {
    case 'landing': view = <Landing go={go} />; break
    case 'dashboard': view = teacher('dashboard', <Dashboard go={go} />); break
    case 'dashboardEmpty': view = teacher('dashboard', <Dashboard go={go} empty />); break
    case 'create':
      view = teacher('create', <><Dashboard go={go} /><CreateRoom onClose={() => go('dashboard')} notify={show} /></>); break
    case 'room': view = teacher('dashboard', <TeacherRoom go={go} notify={show} />); break
    case 'roomLoading': view = teacher('dashboard', <TeacherRoom go={go} notify={show} loading />); break
    case 'summary': view = teacher('dashboard', <Summary notify={show} />); break
    case 'profile': view = teacher('profile', <Profile />); break
    case 'join': view = <><StudentBar go={go} /><Join go={go} /></>; break
    case 'joinError': view = <><StudentBar go={go} /><Join go={go} state="error" /></>; break
    case 'student': view = <><StudentBar go={go} /><StudentRoom notify={show} /></>; break
    case 'studentLoading': view = <><StudentBar go={go} /><StudentRoom notify={show} loading /></>; break
    case 'studentEmpty': view = <><StudentBar go={go} /><StudentRoom notify={show} empty /></>; break
    default: view = <System go={go} />
  }

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen bg-bg pb-20 text-fg">
        {view}
        {node}
        <nav aria-label="Screens" className="fixed inset-x-0 bottom-0 z-30 flex justify-center px-2 pb-2">
          <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-2xl border border-line bg-surface/95 p-1.5 shadow-soft backdrop-blur">
            {screens.map(([k, l]) => (
              <button key={k} onClick={() => go(k)} aria-current={screen === k}
                className={`min-h-10 shrink-0 cursor-pointer whitespace-nowrap rounded-xl px-3 text-sm font-medium transition ${screen === k ? 'bg-primary text-primary-fg' : 'text-muted hover:bg-surface2 hover:text-fg'}`}>{l}</button>
            ))}
            <button aria-label="Toggle dark mode" onClick={() => setDark(!dark)} className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-xl text-fg hover:bg-surface2">
              <Icon n={dark ? 'sun' : 'moon'} />
            </button>
          </div>
        </nav>
      </div>
    </div>
  )
}
