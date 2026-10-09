/**
 * One participant upvoting one question. The pair (questionId, participantId)
 * must be unique so nobody can vote twice. Un-voting deletes the row.
 */
export interface Upvote {
  id: number
  questionId: number
  participantId: number
  createdAt: Date
}
