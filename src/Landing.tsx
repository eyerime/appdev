import { Button, Icon, Logo, Badge, Upvote, icons } from './ui'

export default function Landing({ go }: { go: (s: string) => void }) {
  const feats: [keyof typeof icons, string, string][] = [
    ['lock', 'Anonymous asking', 'No names attached. Ever. Not even for your teacher.'],
    ['up', 'Upvoting', 'The whole class signals what they also want answered.'],
    ['bolt', 'Live queue', 'Questions re-rank in real time as votes come in.'],
    ['link', 'Shareable link', 'One link or QR code. No accounts for students.'],
  ]
  const steps = [
    ['Create a room', 'Name your topic and set a few options. Takes under a minute.'],
    ['Share the link', 'Drop the link or QR code in chat or on the slide.'],
    ['Answer top questions', 'Work down the queue. Mark answered, or reply after class.'],
  ]
  return (
    <div>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted sm:flex">
          <a href="#how" className="hover:text-fg">How it works</a>
          <a href="#features" className="hover:text-fg">Features</a>
        </nav>
        <Button v="ghost" size="sm" onClick={() => go('dashboard')}>Teacher log in</Button>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-10 lg:grid-cols-[1.1fr_1fr] lg:pt-20">
        <div>
          <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-sm font-semibold text-primary">
            <Icon n="lock" className="size-4" /> Built for nervous hands-up moments
          </span>
          <h1 className="text-5xl font-bold leading-[1.05] sm:text-6xl">
            Ask anything. <span className="text-primary">Stay anonymous.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            SpeakUp gives every student a safe way to ask the question they are afraid to raise a hand for, and gives teachers a live queue of what the class most needs answered.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button size="lg" onClick={() => go('create')}><Icon n="plus" />Create a Room</Button>
            <Button size="lg" v="secondary" onClick={() => go('join')}>Join a Room</Button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-primary-soft blur-2xl" />
          <div className="rounded-3xl border border-line bg-surface p-5 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <div><p className="font-display font-semibold">Calculus 101 · Derivatives</p><p className="text-sm text-muted">38 students in the room</p></div>
              <Badge k="live" />
            </div>
            {[['Why does the chain rule multiply derivatives?', 24, true], ['Will the midterm cover implicit differentiation?', 13, false], ['Trick for remembering trig derivatives?', 8, false]].map(([t, v, a], i) => (
              <div key={i} className={`mb-3 flex items-center gap-3 rounded-2xl border p-3 ${i === 0 ? 'border-up bg-up-soft/50' : 'border-line'}`}>
                <Upvote count={v as number} active={i === 0} />
                <div>
                  {i === 0 && <Badge k="top" />}
                  <p className="mt-1 text-[15px] leading-snug">{t as string}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="bg-surface py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl font-semibold">How it works</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map(([t, d], i) => (
              <div key={t} className="rounded-3xl bg-bg p-7">
                <span className="grid size-12 place-items-center rounded-2xl bg-primary font-display text-xl font-semibold text-primary-fg">{i + 1}</span>
                <h3 className="mt-5 text-xl font-semibold">{t}</h3>
                <p className="mt-2 text-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="max-w-md text-3xl font-semibold">Quiet for students. Clear for teachers.</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {feats.map(([ic, t, d]) => (
            <div key={t} className="rounded-2xl border border-line bg-surface p-6 shadow-soft">
              <span className="grid size-11 place-items-center rounded-xl bg-up-soft text-up-fg"><Icon n={ic} /></span>
              <h3 className="mt-4 font-semibold">{t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-muted">
          <Logo />
          <p>Questions are never linked to a name. © 2026 SpeakUp</p>
          <div className="flex gap-6"><a href="#" className="hover:text-fg">Privacy</a><a href="#" className="hover:text-fg">Terms</a><a href="#" className="hover:text-fg">Contact</a></div>
        </div>
      </footer>
    </div>
  )
}
