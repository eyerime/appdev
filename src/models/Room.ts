/** Lifecycle of a room. Students can only join while it is `Live`. */
export const RoomStatus = {
  Live: 'live',
  Ended: 'ended',
} as const
export type RoomStatus = (typeof RoomStatus)[keyof typeof RoomStatus]

/** The three toggles on the "Create room" form. */
export interface RoomSettings {
  allowAnonymous: boolean
  enableUpvoting: boolean
  closeAfterMeeting: boolean
}

export const defaultRoomSettings: RoomSettings = {
  allowAnonymous: true,
  enableUpvoting: true,
  closeAfterMeeting: false,
}

/** One Q&A session created by a teacher, e.g. "Calculus 101 · Derivatives". */
export interface Room {
  id: number
  /** Teacher (User with role "teacher") who created the room. */
  teacherId: number
  /** Join code shown to students, format `XXX-XXX` (e.g. HX7-4K2). Unique. */
  code: string
  title: string
  topic: string
  /** Optional date/time picked on the create form; defaults to creation time. */
  scheduledAt: Date
  status: RoomStatus
  settings: RoomSettings
  createdAt: Date
  endedAt?: Date
}
