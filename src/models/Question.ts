/** Where a question is in the teacher's queue. */
export const QuestionStatus = {
  Pending: 'pending',
  /** Teacher pressed "Answer now". */
  Now: 'now',
  Later: 'later',
  Answered: 'answered',
} as const
export type QuestionStatus = (typeof QuestionStatus)[keyof typeof QuestionStatus]

/**
 * A question asked inside a room.
 *
 * Privacy: `participantId` exists so a student can see which questions are
 * theirs and so upvotes can be de-duplicated, but it must never be returned
 * to the teacher. Teachers only see `text` and the vote count.
 */
export interface Question {
  id: number
  roomId: number
  participantId: number
  text: string
  status: QuestionStatus
  /** Pinned questions sort above the rest of the queue. */
  pinned: boolean
  /** Teacher pressed "Hide". Kept in the database, removed from the queue. */
  hidden: boolean
  /** Cached count of Upvote rows, used for "Most upvoted" sorting. */
  votes: number
  askedAt: Date
}
