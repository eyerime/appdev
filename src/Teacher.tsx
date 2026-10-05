import { useEffect, useState, type ReactNode } from 'react'
import { makeCode, type Room } from './rooms'
import { Badge, Button, Field, Icon, Illustration, Logo, Modal, QR, QSkeleton, QuestionCard, Skeleton, Toggle, inputCls, seedQuestions, type Q } from './ui'

export function TeacherShell({ children, active, go, toggle }: { children: ReactNode; active: string; go: (s: string) => void; toggle?: ReactNode }) {
  const nav: [string, string, 'list' | 'plus' | 'user'][] = [['/teacher', 'Rooms', 'list'], ['/teacher/create', 'Create Room', 'plus'], ['/teacher/profile', 'Profile', 'user']]
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="hidden flex-col border-r border-line bg-surface p-5 lg:flex">
        <button onClick={() => go('/')} className="mb-8 cursor-pointer text-left"><Logo /></button>
        <nav className="space-y-1">
          {nav.map(([k, l, ic]) => (
            <button key={k} onClick={() => go(k)} aria-current={active === k}
              className={`flex min-h-12 w-full cursor-pointer items-center gap-3 rounded-xl px-4 text-[15px] font-medium transition ${active === k ? 'bg-primary-soft text-primary' : 'text-muted hover:bg-surface2 hover:text-fg'}`}>
              <Icon n={ic} />{l}
            </button>
          ))}
        </nav>
        <div className="mt-auto flex items-center gap-3 rounded-2xl bg-surface2 p-3">
          <span className="grid size-10 place-items-center rounded-full bg-primary font-semibold text-primary-fg">MR</span>
          <div className="text-sm"><p className="font-semibold">Ms. Rivera</p><p className="text-muted">Teacher</p></div>
        </div>
      </aside>
      <div className="min-w-0">
        <div className="flex items-center justify-between border-b border-line bg-surface px-4 py-3 lg:hidden">
          <Logo />
          <div className="flex gap-1">
            {nav.map(([k, l, ic]) => (
              <button key={k} aria-label={l} onClick={() => go(k)} className={`grid size-11 cursor-pointer place-items-center rounded-xl ${active === k ? 'bg-primary-soft text-primary' : 'text-muted'}`}><Icon n={ic} /></button>
            ))}
          </div>
        </div>
        <main className="mx-auto max-w-5xl p-5 sm:p-8">{children}</main>
        {toggle}
      </div>
    </div>
  )
}

export function Dashboard({ go, rooms, empty, loading }: { go: (s: string) => void; rooms: Room[]; empty?: boolean; loading?: boolean }) {
  const isEmpty = empty || rooms.length === 0
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div><h1 className="text-3xl font-semibold">Your rooms</h1><p className="mt-1 text-muted">Welcome back, Ms. Rivera.</p></div>
        <Button onClick={() => go('/teacher/create')}><Icon n="plus" />New room</Button>
      </div>
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">{[0, 1, 2, 3].map((i) => <div key={i} className="space-y-4 rounded-2xl border border-line bg-surface p-6"><Skeleton className="h-5 w-3/4" /><Skeleton className="h-4 w-1/2" /><Skeleton className="h-8 w-1/3" /></div>)}</div>
      ) : isEmpty ? (
        <div className="flex flex-col items-center rounded-3xl border-2 border-dashed border-line bg-surface px-6 py-16 text-center">
          <Illustration />
          <h2 className="mt-6 text-2xl font-semibold">No rooms yet</h2>
          <p className="mt-2 max-w-sm text-muted">Create a room, share the link, and your class can start asking without fear.</p>
          <Button className="mt-6" size="lg" onClick={() => go('/teacher/create')}>Create your first room</Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {rooms.map((r) => (
            <button key={r.id} onClick={() => go(`/teacher/room/${r.id}`)} className="group cursor-pointer rounded-2xl border border-line bg-surface p-6 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-primary">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold leading-snug">{r.title}</h3>
                <Badge k={r.live ? 'live' : 'ended'} />
              </div>
              <p className="mt-1.5 text-muted">{r.topic}</p>
              <div className="mt-5 flex items-center gap-5 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5"><Icon n="clock" className="size-4" />{r.date}</span>
                <span className="inline-flex items-center gap-1.5"><Icon n="list" className="size-4" />{r.n} questions</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function CreateRoom({ onClose, notify, onCreate, go }: {
  onClose: () => void
  notify: (m: string) => void
  onCreate: (d: { title: string; topic: string; when: string }) => Room
  go: (s: string) => void
}) {
  const [created, setCreated] = useState<Room | null>(null)
  const [t, setT] = useState('')
  const [topic, setTopic] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [anon, setAnon] = useState(true)
  const [vote, setVote] = useState(true)
  const [close, setClose] = useState(false)
  const link = created ? `speakup.app/r/${created.code}` : ''

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const day = date ? new Date(`${date}T00:00`).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : ''
    const when = [day, time].filter(Boolean).join(', ') || 'Today'
    setCreated(onCreate({ title: t.trim(), topic: topic.trim() || 'No description', when }))
  }
  const copy = () => {
    navigator.clipboard?.writeText(link).catch(() => {})
    notify('Link copied to clipboard')
  }

  return (
    <Modal onClose={onClose} title="Create room">
      <div className="mb-6 flex items-start justify-between">
        <h2 className="text-2xl font-semibold">{created ? 'Your room is ready' : 'Create a room'}</h2>
        <button aria-label="Close" onClick={onClose} className="grid size-11 cursor-pointer place-items-center rounded-xl text-muted hover:bg-surface2"><Icon n="x" /></button>
      </div>
      {!created ? (
        <form className="space-y-4" onSubmit={submit}>
          <Field label="Room title"><input className={inputCls} value={t} onChange={(e) => setT(e.target.value)} placeholder="e.g. Calculus 101 · Derivatives" required /></Field>
          <Field label="Topic / description"><textarea rows={2} className={`${inputCls} py-3`} value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="What is this session about?" /></Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Date (optional)"><input type="date" className={inputCls} value={date} onChange={(e) => setDate(e.target.value)} /></Field>
            <Field label="Time (optional)"><input type="time" className={inputCls} value={time} onChange={(e) => setTime(e.target.value)} /></Field>
          </div>
          <div className="divide-y divide-line rounded-2xl bg-surface2 px-4">
            <Toggle on={anon} onChange={setAnon} label="Allow anonymous questions" />
            <Toggle on={vote} onChange={setVote} label="Enable upvoting" />
            <Toggle on={close} onChange={setClose} label="Close room after meeting" />
          </div>
          <Button type="submit" size="lg" className="w-full">Generate Room Link</Button>
        </form>
      ) : (
        <div className="space-y-5">
          <div className="flex flex-col items-center gap-5 rounded-2xl bg-surface2 p-5 sm:flex-row">
            <QR />
            <div className="text-center sm:text-left">
              <p className="text-sm text-muted">Room code</p>
              <p className="font-display text-3xl font-bold tracking-widest text-primary">{created.code}</p>
              <p className="mt-2 text-sm text-muted">Students can scan or type the code.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-line px-4 py-3"><Icon n="link" className="size-4 text-muted" /><span className="truncate font-medium">{link}</span></div>
          <div className="flex gap-3">
            <Button className="flex-1" onClick={copy}><Icon n="copy" />Copy Link</Button>
            <Button v="secondary" className="flex-1" onClick={() => go(`/teacher/room/${created.id}`)}>Open room</Button>
          </div>
        </div>
      )}
    </Modal>
  )
}

export function TeacherRoom({ go, notify, room, onEnd, loading }: { go: (s: string) => void; notify: (m: string) => void; room: Room; onEnd: () => void; loading?: boolean }) {
  const [qs, setQs] = useState<Q[]>(room.seeded ? seedQuestions.map((q) => ({ ...q, mine: false, voted: false })) : [])
  const [tab, setTab] = useState<'live' | 'answered' | 'all'>('live')
  const [sort, setSort] = useState('votes')
  const [cur, setCur] = useState<number | null>(room.seeded && room.live ? 1 : null)
  const ended = !room.live
  const patch = (id: number, p: Partial<Q>) => setQs((a) => a.map((q) => (q.id === id ? { ...q, ...p } : q)))
  const hidden = new Set<number>()
  let list = qs.filter((q) => !hidden.has(q.id))
  if (tab === 'live') list = list.filter((q) => q.status !== 'answered')
  if (tab === 'answered') list = list.filter((q) => q.status === 'answered')
  if (sort === 'unanswered') list = list.filter((q) => q.status !== 'answered')
  list = [...list].sort((a, b) => (sort === 'newest' ? b.id - a.id : Number(!!b.pinned) - Number(!!a.pinned) || b.votes - a.votes))
  const topId = qs.filter((q) => q.status !== 'answered').sort((a, b) => b.votes - a.votes)[0]?.id
  const selected = qs.find((q) => q.id === cur)
  const tabs: ['live' | 'answered' | 'all', string][] = [['live', 'Live Queue'], ['answered', 'Answered'], ['all', 'All Questions']]

  return (
    <div>
      <button onClick={() => go('/teacher')} className="mb-4 inline-flex min-h-10 cursor-pointer items-center gap-1.5 text-sm font-semibold text-muted hover:text-fg"><Icon n="home" className="size-4" />All rooms</button>
      <div className="mb-6 rounded-3xl border border-line bg-surface p-6 shadow-soft">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3"><h1 className="text-2xl font-semibold">{room.title}</h1><Badge k={ended ? 'ended' : 'live'} /></div>
            <p className="mt-1 text-muted">{room.topic}</p>
            <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium"><Icon n="users" className="size-4" />{room.students} participants · Code <span className="font-display tracking-widest text-primary">{room.code}</span></p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button v="secondary" size="sm" onClick={() => { navigator.clipboard?.writeText(`speakup.app/r/${room.code}`).catch(() => {}); notify('Link copied to clipboard') }}><Icon n="copy" className="size-4" />Copy link</Button>
            {ended ? <Button v="secondary" size="sm" onClick={() => go(`/teacher/summary/${room.id}`)}>View summary</Button> : <Button v="danger" size="sm" onClick={() => { onEnd(); go(`/teacher/summary/${room.id}`) }}>End Room</Button>}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <section>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div role="tablist" className="inline-flex rounded-xl bg-surface2 p-1">
              {tabs.map(([k, l]) => (
                <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
                  className={`min-h-10 cursor-pointer rounded-lg px-4 text-sm font-semibold transition ${tab === k ? 'bg-surface text-primary shadow-soft' : 'text-muted hover:text-fg'}`}>{l}</button>
              ))}
            </div>
            <select aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value)} className={`${inputCls} !w-auto !min-h-11 cursor-pointer !py-0 font-medium`}>
              <option value="votes">Most upvoted</option><option value="newest">Newest</option><option value="unanswered">Unanswered</option>
            </select>
          </div>
          <div className="space-y-4">
            {loading ? [0, 1, 2].map((i) => <QSkeleton key={i} />) : list.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-line py-14 text-center text-muted">Nothing here yet.</div>
            ) : list.map((q) => (
              <div key={q.id} className="relative">
                {q.id === topId && q.status !== 'answered' && <div className="absolute -top-3 left-5 z-10"><Badge k="top" /></div>}
                <div className={q.id === topId && q.status !== 'answered' ? 'rounded-2xl ring-2 ring-up' : ''}>
                  <QuestionCard q={q} selected={cur === q.id}
                    actions={q.status === 'answered' ? undefined : (
                      <>
                        <Button size="sm" onClick={() => { patch(q.id, { status: 'answered' }); notify('Marked as answered'); if (cur === q.id) setCur(null) }}><Icon n="check" className="size-4" />Mark as Answered</Button>
                        <Button size="sm" v="secondary" onClick={() => setCur(q.id)}>Answer now</Button>
                        <Button size="sm" v="ghost" onClick={() => { patch(q.id, { status: 'later' }); notify('Saved for later') }}><Icon n="clock" className="size-4" />Answer Later</Button>
                        <Button size="sm" v="ghost" onClick={() => patch(q.id, { pinned: !q.pinned })}><Icon n="pin" className="size-4" />{q.pinned ? 'Unpin' : 'Pin'}</Button>
                        <Button size="sm" v="ghost" onClick={() => { setQs((a) => a.filter((x) => x.id !== q.id)); notify('Question hidden') }}><Icon n="eye" className="size-4" />Hide</Button>
                      </>
                    )} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="xl:sticky xl:top-6 xl:self-start">
          <div className="rounded-3xl border border-primary/40 bg-primary-soft p-6">
            <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-primary"><span className="size-2 animate-pulse rounded-full bg-primary" />Now answering</p>
            {selected && selected.status !== 'answered' ? (
              <>
                <p className="font-display text-lg font-medium leading-snug">{selected.text}</p>
                <p className="mt-2 text-sm text-muted">{selected.votes} students want this answered</p>
                <textarea rows={3} placeholder="Jot a note or answer for later..." className={`${inputCls} mt-4 bg-surface py-3`} />
                <Button className="mt-3 w-full" onClick={() => { patch(selected.id, { status: 'answered' }); setCur(null); notify('Marked as answered') }}>Done, mark answered</Button>
              </>
            ) : <p className="text-muted">Pick a question from the queue to show it here.</p>}
          </div>
        </aside>
      </div>
    </div>
  )
}

export function Summary({ notify, room, go }: { notify: (m: string) => void; room: Room; go: (s: string) => void }) {
  const [ans, setAns] = useState<Record<number, string>>({})
  const all = room.seeded ? seedQuestions : []
  const answered = all.filter((q) => q.status === 'answered')
  const open = all.filter((q) => q.status !== 'answered')
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div><Badge k="ended" /><h1 className="mt-2 text-3xl font-semibold">Session summary</h1><p className="mt-1 text-muted">{room.title} · {all.length} questions, {answered.length} answered</p></div>
        <div className="flex flex-wrap gap-2">
          <Button v="ghost" onClick={() => go('/teacher')}>Back to rooms</Button>
          <Button v="secondary" onClick={() => notify('PDF exported')}><Icon n="pdf" />Export as PDF</Button>
        </div>
      </div>
      <h2 className="mb-3 text-lg font-semibold">Unanswered ({open.length})</h2>
      <div className="space-y-4">
        {open.map((q) => (
          <div key={q.id} className="rounded-2xl border border-line bg-surface p-5 shadow-soft">
            <div className="flex items-start justify-between gap-4"><p className="leading-relaxed">{q.text}</p><span className="shrink-0 rounded-full bg-up-soft px-2.5 py-1 text-xs font-bold text-up-fg">{q.votes} votes</span></div>
            <textarea rows={2} value={ans[q.id] ?? ''} onChange={(e) => setAns({ ...ans, [q.id]: e.target.value })} placeholder="Type your answer..." className={`${inputCls} mt-3 py-3`} aria-label="Answer" />
            <button className="mt-2 cursor-pointer text-sm font-semibold text-primary hover:underline">Attach a file</button>
          </div>
        ))}
      </div>
      <h2 className="mb-3 mt-10 text-lg font-semibold">Answered ({answered.length})</h2>
      <div className="space-y-4">{answered.map((q) => <QuestionCard key={q.id} q={q} />)}</div>
      <div className="sticky bottom-4 mt-8 flex justify-end"><Button size="lg" onClick={() => notify('Answers published to students')}>Publish answers to students</Button></div>
    </div>
  )
}

export function Profile() {
  return (
    <div className="max-w-md">
      <h1 className="mb-6 text-3xl font-semibold">Profile</h1>
      <div className="space-y-4 rounded-2xl border border-line bg-surface p-6 shadow-soft">
        <Field label="Display name"><input className={inputCls} defaultValue="Ms. Rivera" /></Field>
        <Field label="Email"><input className={inputCls} defaultValue="rivera@northfield.edu" /></Field>
        <Button>Save changes</Button>
      </div>
    </div>
  )
}

export function useDelay(ms = 1200) {
  const [l, s] = useState(true)
  useEffect(() => { const t = setTimeout(() => s(false), ms); return () => clearTimeout(t) }, [ms])
  return l
}
