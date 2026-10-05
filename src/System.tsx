import { useState, type ReactNode } from 'react'
import { Badge, Button, Field, Icon, Logo, Modal, QSkeleton, QuestionCard, Toast, Toggle, Upvote, inputCls, seedQuestions } from './ui'

const S = ({ t, children }: { t: string; children: ReactNode }) => (
  <section className="mb-10">
    <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">{t}</h2>
    <div className="rounded-3xl border border-line bg-surface p-6 shadow-soft">{children}</div>
  </section>
)

export default function System({ go }: { go: (s: string) => void }) {
  const [a, setA] = useState(true)
  const [b, setB] = useState(false)
  const [m, setM] = useState(false)
  const [tab, setTab] = useState(0)
  const q = seedQuestions
  return (
    <div className="mx-auto max-w-4xl p-5 sm:p-8">
      <h1 className="text-3xl font-semibold">Component library</h1>
      <p className="mb-10 mt-1 text-muted">Buttons, cards, badges, inputs, navigation and states.</p>

      <S t="Buttons">
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button><Button v="secondary">Secondary</Button><Button v="ghost">Ghost</Button><Button v="danger">Danger</Button><Button disabled>Disabled</Button>
        </div>
      </S>
      <S t="Upvote button: default, hover, active">
        <div className="flex items-center gap-6">
          <Upvote count={8} /><Upvote count={9} active /><span className="text-sm text-muted">Hover fills with soft yellow; active is solid yellow.</span>
        </div>
      </S>
      <S t="Status badges">
        <div className="flex flex-wrap gap-3"><Badge k="live" /><Badge k="ended" /><Badge k="pending" /><Badge k="now" /><Badge k="answered" /><Badge k="later" /><Badge k="top" /></div>
      </S>
      <S t="Question cards: default, upvoted, answered, pinned, highlighted">
        <div className="grid gap-4 md:grid-cols-2">
          <QuestionCard q={{ ...q[3], voted: false }} />
          <QuestionCard q={{ ...q[1], voted: true, mine: false }} />
          <QuestionCard q={q[4]} />
          <QuestionCard q={q[2]} />
          <div className="rounded-2xl ring-2 ring-up md:col-span-2"><QuestionCard q={q[0]} selected /></div>
        </div>
      </S>
      <S t="Inputs, toggles, dropdown, tabs">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Field label="Text input"><input className={inputCls} placeholder="Room title" /></Field>
            <Field label="Dropdown"><select className={`${inputCls} cursor-pointer`}><option>Most upvoted</option><option>Newest</option></select></Field>
          </div>
          <div>
            <Toggle on={a} onChange={setA} label="Enable upvoting" /><Toggle on={b} onChange={setB} label="Close room after meeting" />
            <div role="tablist" className="mt-3 inline-flex rounded-xl bg-surface2 p-1">
              {['Live Queue', 'Answered', 'All'].map((l, i) => (
                <button key={l} role="tab" aria-selected={tab === i} onClick={() => setTab(i)} className={`min-h-10 cursor-pointer rounded-lg px-4 text-sm font-semibold ${tab === i ? 'bg-surface text-primary shadow-soft' : 'text-muted'}`}>{l}</button>
              ))}
            </div>
          </div>
        </div>
      </S>
      <S t="Modal and toasts">
        <div className="flex flex-wrap items-center gap-4">
          <Button v="secondary" onClick={() => setM(true)}>Open modal</Button>
          <Toast msg="Link copied to clipboard" /><Toast msg="Couldn't send. Try again." kind="error" />
        </div>
        {m && (
          <Modal onClose={() => setM(false)} title="End room">
            <h3 className="text-xl font-semibold">End this room?</h3>
            <p className="mt-2 text-muted">Students can no longer ask or vote. You can still answer afterwards.</p>
            <div className="mt-6 flex gap-3"><Button v="secondary" className="flex-1" onClick={() => setM(false)}>Cancel</Button><Button v="danger" className="flex-1" onClick={() => setM(false)}>End Room</Button></div>
          </Modal>
        )}
      </S>
      <S t="Navigation bars">
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-2xl bg-surface2 p-3"><Logo /><div className="flex gap-2 text-sm font-medium"><span className="rounded-lg bg-primary-soft px-3 py-2 text-primary">Rooms</span><span className="px-3 py-2 text-muted">Create Room</span><span className="px-3 py-2 text-muted">Profile</span></div></div>
          <div className="flex items-center justify-between rounded-2xl bg-surface2 p-3"><Logo /><span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary"><Icon n="lock" className="size-3.5" />You are anonymous</span></div>
        </div>
      </S>
      <S t="Loading, empty and error states">
        <div className="space-y-4"><QSkeleton />
          <div className="flex flex-wrap gap-3">
            <Button v="secondary" onClick={() => go('dashboardEmpty')}>Empty dashboard</Button>
            <Button v="secondary" onClick={() => go('roomLoading')}>Teacher loading</Button>
            <Button v="secondary" onClick={() => go('studentLoading')}>Student loading</Button>
            <Button v="secondary" onClick={() => go('studentEmpty')}>Student empty</Button>
            <Button v="danger" onClick={() => go('joinError')}>Invalid room link</Button>
          </div>
        </div>
      </S>
    </div>
  )
}
