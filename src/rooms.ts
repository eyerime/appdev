export type Room = {
  id: number
  code: string
  title: string
  topic: string
  date: string
  /** number of questions asked so far */
  n: number
  /** number of students in the room */
  students: number
  live: boolean
  /** seeded rooms come pre-filled with the sample questions */
  seeded?: boolean
}

export const seedRooms: Room[] = [
  { id: 1, code: 'HX7-4K2', title: 'Calculus 101 · Derivatives', topic: 'Chain rule, implicit differentiation', date: 'Today, 10:00', n: 38, students: 38, live: true, seeded: true },
  { id: 2, code: 'WH2-9PL', title: 'World History · Industrial Revolution', topic: 'Causes and social impact', date: 'Sep 26, 13:30', n: 52, students: 52, live: false, seeded: true },
  { id: 3, code: 'BI5-7QM', title: 'Intro to Biology · Cell Division', topic: 'Mitosis vs. meiosis', date: 'Sep 24, 09:00', n: 27, students: 27, live: false, seeded: true },
]

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const pick = (n: number) => Array.from({ length: n }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('')

export function makeCode(taken: string[]): string {
  let code = `${pick(3)}-${pick(3)}`
  while (taken.includes(code)) code = `${pick(3)}-${pick(3)}`
  return code
}
