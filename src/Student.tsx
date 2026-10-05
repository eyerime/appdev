import { useState } from 'react'
import { Badge, Button, Field, Icon, Logo, QSkeleton, QuestionCard, Skeleton, Toggle, inputCls, seedQuestions, type Q } from './ui'

export function StudentBar({ go }: { go: (s: string) => void }) {
  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
        <button onClick={() => go('landing')} className="cursor-pointer"><Logo /></button>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary"><Icon n="lock" className="size-3.5" />You are anonymous</span>
      </div>
    </header>
  )
}

export function Join({ go, state = 'ok' }: { go: (s: string) => void; state?: 'ok' | 'loading' | 'error' }) {
  const [code, setCode] = useState(state === 'error' ? 'ZZ9-000' : 'HX7-4K2')
  return (
    <div className="grid min-h-[calc(100vh-64px)] place-items-center p-4">
      <div className="w-full max-w-md rounded-3xl border border-line bg-surface p-7 shadow-soft sm:p-9">
        <h1 className="text-2xl font-semibold">Join a room</h1>
        <p className="mt-1 text-muted">Enter the code your teacher shared, or open their link.</p>
        <div className="mt-6 space-y-4">
          <Field label="Room code">
            <input value={code} onChange={(e) => setCode(e.target.value)} aria-invalid={state === 'error'}
              className={`${inputCls} font-display text-lg font-semibold tracking-widest ${state === 'error' ? '!border-bad' : ''}`} />
          </Field>
          {state === 'error' && (
            <div role="alert" className="flex gap-3 rounded-xl bg-bad-soft p-4 text-bad">
              <Icon n="alert" className="mt-0.5 size-5 shrink-0" />
              <div className="text-sm"><b>This room link isn't valid.</b><br />It may have expired or been mistyped. Check with your teacher for a fresh link.</div>
            </div>
          )}
          {state === 'loading' && <div className="space-y-2 rounded-2xl bg-surface2 p-4"><Skeleton className="h-5 w-2/3" /><Skeleton className="h-4 w-1/2" /></div>}
          {state === 'ok' && (
            <div className="rounded-2xl bg-surface2 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">Room found</p>
              <p className="mt-1 font-display text-lg font-semibold">Calculus 101 · Derivatives</p>
              <p className="text-sm text-muted">Chain rule and implicit differentiation</p>
            </div>
          )}
          <Field label="Nickname (optional)"><input className={inputCls} placeholder="e.g. Curious Otter" /></Field>
          <p className="flex gap-2 rounded-xl bg-primary-soft p-3 text-sm text-primary"><Icon n="lock" className="mt-0.5 size-4 shrink-0" />Your questions are anonymous to everyone, including your teacher.</p>
          <Button size="lg" className="w-full" disabled={state !== 'ok'} onClick={() => go('student')}>Enter Room</Button>
        </div>
      </div>
    </div>
  )
}

export function StudentRoom({ notify, loading, empty }: { notify: (m: string) => void; loading?: boolean; empty?: boolean }) {
  const [qs, setQs] = useState<Q[]>(empty ? [] : seedQuestions.map((q, i) => (i === 0 ? { ...q, status: 'now' as const } : q)))
  const [text, setText] = useState('')
  const [anon, setAnon] = useState(true)
  const vote = (id: number) => setQs((a) => a.map((q) => (q.id === id ? { ...q, voted: !q.voted, votes: q.votes + (q.voted ? -1 : 1) } : q)))
  const send = () => {
    if (!text.trim()) return
    setQs([{ id: Date.now(), text: text.trim(), votes: 1, voted: true, mine: true, time: 'Just now', status: 'pending' }, ...qs])
    setText('')
    notify(anon ? 'Sent anonymously' : 'Question sent')
  }
  const sorted = [...qs].sort((a, b) => b.votes - a.votes)
  return (
    <div className="mx-auto max-w-2xl px-4 pb-16">
      <div className="py-6">
        <div className="flex items-center gap-3"><h1 className="text-2xl font-semibold">Calculus 101 · Derivatives</h1><Badge k="live" /></div>
        <p className="mt-1 text-muted">Chain rule and implicit differentiation</p>
      </div>
      <div className="sticky top-0 z-20 -mx-4 bg-bg/90 px-4 pb-4 pt-2 backdrop-blur">
        <div className="rounded-2xl border border-line bg-surface p-4 shadow-soft">
          <textarea aria-label="Ask a question" rows={2} value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask a question. No one will know it's you." className={`${inputCls} py-3`} />
          <div className="mt-2 flex items-center justify-between gap-3">
            <div className="flex-1"><Toggle on={anon} onChange={setAnon} label="Ask anonymously" /></div>
            <Button onClick={send} disabled={!text.trim()}><Icon n="send" className="size-4" />Send</Button>
          </div>
        </div>
      </div>
      <div className="mt-2 space-y-4">
        {loading ? [0, 1, 2].map((i) => <QSkeleton key={i} />) : sorted.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-line bg-surface py-16 text-center">
            <p className="text-4xl" aria-hidden>💬</p>
            <p className="mt-3 font-display text-lg font-semibold">No questions yet. Be the first to ask!</p>
            <p className="mt-1 text-muted">Someone else is probably wondering the same thing.</p>
          </div>
        ) : sorted.map((q) => <QuestionCard key={q.id} q={q} variant="student" onVote={() => vote(q.id)} />)}
      </div>
    </div>
  )
}
