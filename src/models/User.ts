/** The two kinds of account in SpeakUp. Each login screen only accepts its own role. */
export const Role = {
  Teacher: 'teacher',
  Student: 'student',
} as const
export type Role = (typeof Role)[keyof typeof Role]

/**
 * A person who can log in. Teachers own rooms; students join them.
 * `passwordHash` is never sent to the client once a backend exists.
 */
export interface User {
  id: number
  username: string
  passwordHash: string
  role: Role
  /** Display name, e.g. "Ms. Rivera". */
  name: string
  email?: string
  createdAt: Date
}
