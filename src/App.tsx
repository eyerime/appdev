import { useState } from 'react'
import Landing from './Landing'
import Login from './Login'
import Info, { infoPages } from './Info'
import NotFound from './NotFound'
import { CreateRoom, Dashboard, Profile, Summary, TeacherRoom, TeacherShell, useDelay } from './Teacher'
import { Join, StudentBar, StudentRoom } from './Student'
import System from './System'
import { Icon, useToast } from './ui'
import { makeCode, seedRooms, type Room } from './rooms'
import { navigate, query, Redirect, segments, usePath } from './router'
import { useAuth, type Role } from './auth'

const THEME_KEY = 'speakup-theme'

function useTheme() {
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem(THEME_KEY) === 'dark' } catch { return false }
  })
  const toggle = () => {
    setDark(!dark)
    try { localStorage.setItem(THEME_KEY, !dark ? 'dark' : 'light') } catch { /* ignore */ }
  }
  return { dark, toggle }
}

export default function App() {
  const path = usePath()
  const { dark, toggle } = useTheme()
  const { user, logout } = useAuth()
  const { show, node } = useToast()
  const [rooms, setRooms] = useState<Room[]>(seedRooms)
  const go = navigate

  const addRoom = (d: { title: string; topic: string; when: string }) => {
    const room: Room = {
      id: Date.now(), code: makeCode(rooms.map((r) => r.code)), title: d.title, topic: d.topic,
      date: d.when, n: 0, students: 0, live: true,
    }
    setRooms((a) => [room, ...a])
    return room
  }
  const endRoom = (id: number) => setRooms((a) => a.map((r) => (r.id === id ? { ...r, live: false } : r)))

  const [a, b, c] = segments(path)
  const roomById = rooms.find((r) => String(r.id) === c)
  const roomByCode = rooms.find((r) => r.code === c?.toUpperCase())
  const signOut = () => { logout(); go('/') }
  const name = user?.role === 'teacher' ? user.name : 'Ms. Rivera'
  const teacher = (active: string, el: React.ReactNode) => <TeacherShell active={active} go={go} name={name} onLogout={signOut}>{el}</TeacherShell>
  /** Where to send someone after logging in: the page they asked for, else their home. */
  const destination = (role: Role) => {
    const next = query(path).get('next')
    return next && next.startsWith(`/${role}`) ? next : `/${role}`
  }

  let view: React.ReactNode
  if (!a) view = <Landing go={go} user={user} />
  else if (infoPages.includes(a) && !b) view = <Info page={a} go={go} />
  else if (a === 'login' && (b === 'teacher' || b === 'student'))
    view = user?.role === b ? <Redirect to={destination(b)} /> : <Login key={b} role={b} go={go} />
  else if ((a === 'teacher' || a === 'student') && user?.role !== a)
    view = <Redirect to={`/login/${a}?next=${encodeURIComponent(path)}`} />
  else if (a === 'teacher') {
    if (!b) view = teacher('/teacher', <Dashboard go={go} rooms={rooms} name={name} />)
    else if (b === 'create')
      view = teacher('/teacher/create', <><Dashboard go={go} rooms={rooms} name={name} /><CreateRoom onClose={() => go('/teacher')} notify={show} onCreate={addRoom} go={go} /></>)
    else if (b === 'profile') view = teacher('/teacher/profile', <Profile name={name} />)
    else if (b === 'room' && roomById)
      view = teacher('/teacher', <TeacherRoomPage key={roomById.id} room={roomById} go={go} notify={show} onEnd={() => endRoom(roomById.id)} />)
    else if (b === 'summary' && roomById) view = teacher('/teacher', <Summary room={roomById} go={go} notify={show} />)
    else view = <NotFound go={go} />
  } else if (a === 'student') {
    if (!b) view = <><StudentBar go={go} onLogout={signOut} /><Join go={go} rooms={rooms} /></>
    else if (b === 'room' && roomByCode?.live)
      view = <><StudentBar go={go} onLeave={() => go('/student')} /><StudentRoomPage key={roomByCode.id} room={roomByCode} notify={show} /></>
    else view = <><StudentBar go={go} /><Join go={go} rooms={rooms} state="error" /></>
  } else if (a === 'components') {
    const demo = seedRooms[0]
    switch (b) {
      case undefined: view = <System go={go} />; break
      case 'dashboard-empty': view = teacher('/teacher', <Dashboard go={go} rooms={rooms} name={name} empty />); break
      case 'teacher-loading': view = teacher('/teacher', <TeacherRoom go={go} notify={show} room={demo} onEnd={() => {}} loading />); break
      case 'student-loading': view = <><StudentBar go={go} /><StudentRoom notify={show} room={demo} loading /></>; break
      case 'student-empty': view = <><StudentBar go={go} /><StudentRoom notify={show} room={demo} empty /></>; break
      case 'join-error': view = <><StudentBar go={go} /><Join go={go} rooms={rooms} state="error" /></>; break
      default: view = <NotFound go={go} />
    }
  } else view = <NotFound go={go} />

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="min-h-screen bg-bg text-fg">
        {view}
        {node}
        <button aria-label="Toggle dark mode" onClick={toggle}
          className="fixed bottom-4 right-4 z-30 grid size-12 cursor-pointer place-items-center rounded-full border border-line bg-surface text-fg shadow-soft transition hover:bg-surface2">
          <Icon n={dark ? 'sun' : 'moon'} />
        </button>
      </div>
    </div>
  )
}

/** Simulates a short network load so the skeleton states are reachable in normal use. */
function TeacherRoomPage(p: React.ComponentProps<typeof TeacherRoom>) {
  return <TeacherRoom {...p} loading={useDelay(600)} />
}
function StudentRoomPage(p: React.ComponentProps<typeof StudentRoom>) {
  return <StudentRoom {...p} loading={useDelay(600)} />
}
