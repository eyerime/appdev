import { Button, Logo } from './ui'

const pages: Record<string, { title: string; body: string[] }> = {
  privacy: {
    title: 'Privacy',
    body: [
      'SpeakUp is built so students can ask questions without being singled out. Questions are never linked to a name, and teachers only see the question text and its votes.',
      'This demo has no server or database. Your questions stay in your browser, and the only things saved locally are your sign-in session and your theme preference.',
    ],
  },
  terms: {
    title: 'Terms',
    body: [
      'SpeakUp is a classroom project. Please keep questions respectful and on topic.',
      'Teachers may hide or remove any question that breaks classroom rules.',
    ],
  },
  contact: {
    title: 'Contact',
    body: [
      'Found a bug or have an idea for SpeakUp? Open an issue on the project repository, or talk to your teacher.',
    ],
  },
}

export default function Info({ page, go }: { page: string; go: (s: string) => void }) {
  const p = pages[page]
  return (
    <div>
      <header className="mx-auto flex max-w-3xl items-center justify-between px-5 py-5">
        <button onClick={() => go('/')} className="cursor-pointer"><Logo /></button>
        <Button v="ghost" size="sm" onClick={() => go('/')}>Back to home</Button>
      </header>
      <main className="mx-auto max-w-3xl px-5 pb-20 pt-6">
        <h1 className="text-4xl font-bold">{p.title}</h1>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
          {p.body.map((t) => <p key={t}>{t}</p>)}
        </div>
      </main>
    </div>
  )
}

export const infoPages = Object.keys(pages)
