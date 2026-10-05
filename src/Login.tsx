import { useState } from 'react'
import { ACCOUNTS, useAuth, type Role } from './auth'
import { Button, Field, Icon, Logo, inputCls } from './ui'

const copy = {
  teacher: {
    badge: 'Teacher area',
    title: 'Teacher log in',
    sub: "Manage your rooms and answer your class's questions.",
    icon: 'user' as const,
    otherText: 'Are you a student?',
    otherLabel: 'Student log in',
    otherPath: '/login/student',
  },
  student: {
    badge: 'Student area',
    title: 'Student log in',
    sub: 'Join a room and ask anything. Your questions stay anonymous.',
    icon: 'users' as const,
    otherText: 'Are you a teacher?',
    otherLabel: 'Teacher log in',
    otherPath: '/login/teacher',
  },
}

export default function Login({ role, go }: { role: Role; go: (s: string) => void }) {
  const { login } = useAuth()
  const c = copy[role]
  const demo = ACCOUNTS[role]
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState(false)

  // On success the router sends the user to their destination (see App.tsx).
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!login(role, username, password)) {
      setError(true)
      setPassword('')
    }
  }
  const fill = () => {
    setUsername(demo.username)
    setPassword(demo.password)
    setError(false)
  }

  return (
    <div className="grid min-h-screen place-items-center p-4">
      <div className="w-full max-w-md">
        <button onClick={() => go('/')} className="mb-6 flex w-full cursor-pointer justify-center"><Logo /></button>
        <form onSubmit={submit} className="rounded-3xl border border-line bg-surface p-7 shadow-soft sm:p-9">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
            <Icon n={c.icon} className="size-3.5" />{c.badge}
          </span>
          <h1 className="text-2xl font-semibold">{c.title}</h1>
          <p className="mt-1 text-muted">{c.sub}</p>

          <div className="mt-6 space-y-4">
            <Field label="Username">
              <input className={`${inputCls} ${error ? '!border-bad' : ''}`} value={username} autoComplete="username" autoFocus required aria-invalid={error}
                onChange={(e) => { setUsername(e.target.value); setError(false) }} />
            </Field>
            <Field label="Password">
              <input className={`${inputCls} ${error ? '!border-bad' : ''}`} type={show ? 'text' : 'password'} value={password} autoComplete="current-password" required aria-invalid={error}
                onChange={(e) => { setPassword(e.target.value); setError(false) }} />
            </Field>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-muted">
              <input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} className="size-4 cursor-pointer accent-primary" />
              Show password
            </label>
            {error && (
              <div role="alert" className="flex gap-3 rounded-xl bg-bad-soft p-4 text-bad">
                <Icon n="alert" className="mt-0.5 size-5 shrink-0" />
                <div className="text-sm"><b>Incorrect username or password.</b><br />Check your details and try again.</div>
              </div>
            )}
            <Button type="submit" size="lg" className="w-full">Log in</Button>
          </div>

          <div className="mt-6 rounded-2xl bg-surface2 p-4 text-sm">
            <p className="font-semibold">Demo account</p>
            <p className="mt-1 text-muted">
              Username <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-fg">{demo.username}</code>{' · '}
              Password <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-fg">{demo.password}</code>
            </p>
            <button type="button" onClick={fill} className="mt-2 cursor-pointer font-semibold text-primary hover:underline">Fill in for me</button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          {c.otherText} <a href={`#${c.otherPath}`} className="font-semibold text-primary hover:underline">{c.otherLabel}</a>
        </p>
        <p className="mt-2 text-center text-sm"><a href="#/" className="text-muted hover:text-fg">← Back to home</a></p>
      </div>
    </div>
  )
}
