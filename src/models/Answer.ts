/** The teacher's reply to a question (typed on the live queue or the session summary). */
export interface Answer {
  id: number
  /** One answer per question. */
  questionId: number
  text: string
  /** Optional file attached with "Attach a file". */
  attachmentUrl?: string
  /** False until the teacher presses "Publish answers to students". */
  published: boolean
  answeredAt: Date
}
