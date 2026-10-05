import { Button, Illustration } from './ui'

export default function NotFound({ go }: { go: (s: string) => void }) {
  return (
    <div className="grid min-h-screen place-items-center p-6 text-center">
      <div className="flex flex-col items-center">
        <Illustration />
        <h1 className="mt-6 text-3xl font-semibold">Page not found</h1>
        <p className="mt-2 max-w-sm text-muted">That page doesn't exist, or the room may have been removed.</p>
        <Button className="mt-6" size="lg" onClick={() => go('/')}>Back to home</Button>
      </div>
    </div>
  )
}
