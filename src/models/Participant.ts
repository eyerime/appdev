/**
 * A student's membership in one room. This is what makes a student
 * "anonymous": questions and upvotes point at the participant, not at the
 * User, and the optional nickname is all other people ever see.
 */
export interface Participant {
  id: number
  roomId: number
  studentId: number
  /** Optional, e.g. "Curious Otter". */
  nickname?: string
  joinedAt: Date
}
