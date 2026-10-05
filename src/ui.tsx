import { useState, type ButtonHTMLAttributes, type ReactNode } from 'react'

export type Q = {
  id: number
  text: string
  votes: number
  time: string
  status: 'pending' | 'now' | 'answered' | 'later'
  pinned?: boolean
  mine?: boolean
  voted?: boolean
  answer?: string
}

export const seedQuestions: Q[] = [
  { id: 1, text: "Why does the chain rule multiply the derivatives instead of adding them?", votes: 24, time: '4 min ago', status: 'pending' },
  { id: 2, text: "Could you go over the difference between a limit and a value at a point once more?", votes: 17, time: '9 min ago', status: 'pending', mine: true, voted: true },
  { id: 3, text: "Will the midterm include implicit differentiation?", votes: 13, time: '12 min ago', status: 'pending', pinned: true },
  { id: 4, text: "Is there a trick for remembering the derivatives of trig functions?", votes: 8, time: '18 min ago', status: 'pending' },
  { id: 5, text: "What does 'differentiable' actually guarantee about a function?", votes: 6, time: '25 min ago', status: 'answered', answer: 'Differentiable implies continuous, but not the other way round. |x| is the classic counterexample.' },
  { id: 6, text: "Can we get the practice set solutions posted?", votes: 3, time: '31 min ago', status: 'answered', answer: 'Posted to the course page this afternoon.' },
]

const I = (d: string, cls = 'size-5') => (
  <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
)
export const icons = {
  up: 'M12 19V5M5 12l7-7 7 7',
  copy: 'M9 9h11v11H9zM5 15H4V4h11v1',
  check: 'M5 12l5 5 9-9',
  pin: 'M12 17v5M9 3h6l-1 7 3 3H7l3-3z',
  eye: 'M3 3l18 18M10.6 6.1A9 9 0 0121 12a13 13 0 01-2.3 3M6.6 6.6A13 13 0 003 12s3.5 7 9 7c1.5 0 2.9-.4 4.1-1',
  clock: 'M12 7v5l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  users: 'M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM22 21v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8',
  plus: 'M12 5v14M5 12h14',
  lock: 'M6 11V8a6 6 0 1112 0v3M5 11h14v10H5z',
  send: 'M22 2L11 13M22 2l-7 20-4-9-9-4z',
  x: 'M6 6l12 12M18 6L6 18',
  link: 'M10 14a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1M14 10a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7z',
  list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  home: 'M3 11l9-8 9 8v10H3z',
  user: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z',
  moon: 'M21 13A9 9 0 1111 3a7 7 0 0010 10z',
  sun: 'M12 16a4 4 0 100-8 4 4 0 000 8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  pdf: 'M14 3H6v18h12V7zM14 3v4h4',
  alert: 'M12 9v4M12 17h.01M10.3 3.9L2 18a2 2 0 001.7 3h16.6a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z',
  flag: 'M5 21V4M5 4h12l-2 4 2 4H5',
}
export const Icon = ({ n, className }: { n: keyof typeof icons; className?: string }) => I(icons[n], className)

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 font-display text-lg font-semibold ${className}`}>
      <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-fg">
        <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden><path d="M4 5a3 3 0 013-3h10a3 3 0 013 3v8a3 3 0 01-3 3h-5l-5 4v-4a3 3 0 01-3-3z" /></svg>
      </span>
      SpeakUp
    </span>
  )
}

type BV = 'primary' | 'secondary' | 'ghost' | 'danger'
const bv: Record<BV, string> = {
  primary: 'bg-primary text-primary-fg hover:bg-primary-hover shadow-soft',
  secondary: 'bg-surface text-fg border border-line hover:bg-surface2',
  ghost: 'text-fg hover:bg-surface2',
  danger: 'bg-bad-soft text-bad border border-bad/30 hover:bg-bad hover:text-white',
}
export function Button({ v = 'primary', size = 'md', className = '', ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { v?: BV; size?: 'sm' | 'md' | 'lg' }) {
  const s = size === 'sm' ? 'min-h-10 px-3.5 text-sm' : size === 'lg' ? 'min-h-14 px-7 text-base' : 'min-h-12 px-5 text-[15px]'
  return (
    <button {...p} className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition disabled:opacity-50 disabled:pointer-events-none cursor-pointer active:scale-[0.98] ${s} ${bv[v]} ${className}`} />
  )
}

const bs = {
  live: 'bg-ok-soft text-ok',
  ended: 'bg-surface2 text-muted',
  pending: 'bg-surface2 text-muted',
  now: 'bg-primary-soft text-primary',
  answered: 'bg-ok-soft text-ok',
  later: 'bg-up-soft text-up-fg',
  top: 'bg-up text-[#3b2a00]',
}
export function Badge({ k, children }: { k: keyof typeof bs; children?: ReactNode }) {
  const label = { live: 'Live', ended: 'Ended', pending: 'Pending', now: 'Answering now', answered: 'Answered', later: 'Answer later', top: 'Top priority' }[k]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${bs[k]}`}>
      {k === 'live' && <span className="size-2 animate-pulse rounded-full bg-current" />}
      {children ?? label}
    </span>
  )
}

export function Toggle({ on, onChange, label, hint }: { on: boolean; onChange: (b: boolean) => void; label: string; hint?: string }) {
  return (
    <label className="flex min-h-14 cursor-pointer items-center justify-between gap-4 rounded-xl py-2">
      <span>
        <span className="block text-[15px] font-medium">{label}</span>
        {hint && <span className="block text-sm text-muted">{hint}</span>}
      </span>
      <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={() => onChange(!on)}
        className={`relative h-8 w-14 shrink-0 rounded-full transition ${on ? 'bg-primary' : 'bg-line'}`}>
        <span className={`absolute top-1 grid size-6 place-items-center rounded-full bg-white shadow transition-all ${on ? 'left-7' : 'left-1'}`}>
          {on && <Icon n="check" className="size-3.5 text-primary" />}
        </span>
      </button>
    </label>
  )
}

export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-sm text-muted">{hint}</span>}
    </label>
  )
}
export const inputCls = 'w-full min-h-12 rounded-xl border border-line bg-surface px-4 text-[15px] placeholder:text-muted/80 transition hover:border-muted focus:border-primary'

export function Upvote({ count, active, onClick, disabled }: { count: number; active?: boolean; onClick?: () => void; disabled?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled} aria-pressed={active} aria-label={`Upvote, ${count} votes`}
      className={`flex min-h-14 w-14 shrink-0 cursor-pointer flex-col items-center justify-center rounded-2xl border transition active:scale-95 disabled:opacity-60 ${
        active ? 'border-up bg-up text-[#3b2a00]' : 'border-line bg-surface2 text-fg hover:border-up hover:bg-up-soft'
      }`}>
      <Icon n="up" className="size-5" />
      <span className="text-sm font-bold tabular-nums">{count}</span>
    </button>
  )
}

export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`skeleton ${className}`} />
}
export const QSkeleton = () => (
  <div className="flex gap-4 rounded-2xl border border-line bg-surface p-5">
    <Skeleton className="size-14 !rounded-2xl" />
    <div className="flex-1 space-y-3"><Skeleton className="h-4 w-11/12" /><Skeleton className="h-4 w-2/3" /><Skeleton className="h-3 w-1/4" /></div>
  </div>
)

export function Toast({ msg, kind = 'ok' }: { msg: string; kind?: 'ok' | 'error' }) {
  return (
    <div role="status" className="rise pointer-events-auto flex items-center gap-3 rounded-2xl bg-fg px-4 py-3 text-sm font-medium text-bg shadow-soft">
      <span className={`grid size-6 place-items-center rounded-full ${kind === 'ok' ? 'bg-ok text-white' : 'bg-bad text-white'}`}>
        <Icon n={kind === 'ok' ? 'check' : 'alert'} className="size-3.5" />
      </span>
      {msg}
    </div>
  )
}

export function Modal({ children, onClose, title }: { children: ReactNode; onClose: () => void; title: string }) {
  return (
    <div className="fixed inset-0 z-40 grid place-items-center overflow-y-auto bg-[#0f0f1a]/60 p-4 backdrop-blur-sm" onClick={onClose}>
      <div role="dialog" aria-modal aria-label={title} onClick={(e) => e.stopPropagation()} className="rise w-full max-w-lg rounded-3xl border border-line bg-surface p-6 shadow-soft sm:p-8">
        {children}
      </div>
    </div>
  )
}

export function QR({ size = 132 }: { size?: number }) {
  const n = 21
  const cells: ReactNode[] = []
  const finder = (x: number, y: number) => (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13)
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      const inF = finder(x, y)
      let on = ((x * 7 + y * 13 + x * y) % 5 < 2) && !inF
      if (inF) {
        const lx = x % 7 > 6 ? x - 14 : x > 13 ? x - 14 : x
        const ly = y > 13 ? y - 14 : y
        const edge = lx === 0 || lx === 6 || ly === 0 || ly === 6
        const core = lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4
        on = edge || core
      }
      if (on) cells.push(<rect key={`${x}${y}`} x={x} y={y} width="1" height="1" />)
    }
  return (
    <div className="rounded-2xl bg-white p-3" style={{ width: size }}>
      <svg viewBox={`0 0 ${n} ${n}`} width="100%" fill="#1b1b2f" shapeRendering="crispEdges" role="img" aria-label="QR code for room link">{cells}</svg>
    </div>
  )
}

export function Illustration() {
  return (
    <svg viewBox="0 0 200 150" className="w-52" fill="none" aria-hidden>
      <ellipse cx="100" cy="132" rx="70" ry="9" fill="var(--surface-2)" />
      <rect x="28" y="28" width="104" height="70" rx="16" fill="var(--primary-soft)" stroke="var(--primary)" strokeWidth="3" />
      <path d="M52 98v20l24-20" fill="var(--primary-soft)" stroke="var(--primary)" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="58" cy="63" r="6" fill="var(--primary)" /><circle cx="80" cy="63" r="6" fill="var(--primary)" /><circle cx="102" cy="63" r="6" fill="var(--primary)" />
      <rect x="112" y="60" width="64" height="46" rx="14" fill="var(--up)" />
      <path d="M170 106v14l-16-14" fill="var(--up)" />
      <path d="M134 84l8 8 14-16" stroke="#3b2a00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function QuestionCard({ q, onVote, actions, variant = 'teacher', selected }: {
  q: Q; onVote?: () => void; actions?: ReactNode; variant?: 'teacher' | 'student'; selected?: boolean; top?: boolean
}) {
  const ring = selected ? 'border-primary ring-2 ring-primary/30' : q.pinned ? 'border-primary/50' : 'border-line'
  return (
    <article className={`rise rounded-2xl border bg-surface p-5 shadow-soft transition ${ring} ${q.status === 'answered' ? 'opacity-85' : ''}`}>
      <div className="flex gap-4">
        <Upvote count={q.votes} active={q.voted} onClick={onVote} disabled={q.status === 'answered'} />
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {q.pinned && <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary"><Icon n="pin" className="size-3.5" />Pinned</span>}
            {variant === 'student' && <Badge k={q.status} />}
            {q.mine && <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary">You asked this</span>}
          </div>
          <p className="text-base leading-relaxed">{q.text}</p>
          <div className="mt-2 flex items-center gap-3 text-sm text-muted">
            <span className="inline-flex items-center gap-1"><Icon n="lock" className="size-3.5" />Anonymous</span>
            <span>·</span><span>{q.time}</span>
          </div>
          {q.answer && <p className="mt-3 rounded-xl bg-ok-soft p-3 text-sm text-ok"><b>Answer:</b> {q.answer}</p>}
          {actions && <div className="mt-4 flex flex-wrap gap-2">{actions}</div>}
        </div>
      </div>
    </article>
  )
}

export function useToast() {
  const [t, set] = useState<{ msg: string; kind?: 'ok' | 'error' } | null>(null)
  const show = (msg: string, kind: 'ok' | 'error' = 'ok') => {
    set({ msg, kind })
    setTimeout(() => set(null), 2600)
  }
  const node = t ? (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"><Toast msg={t.msg} kind={t.kind} /></div>
  ) : null
  return { show, node }
}
