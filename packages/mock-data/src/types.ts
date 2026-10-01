// The shapes every demo uses. Dates are ISO strings (yyyy-mm-dd) so the data survives JSON.

export type EmployeeStatus = 'Registered' | 'Invited' | 'Deactivated'

/** Where someone sits in the org: the general manager, a department head, a team manager or staff. */
export type EmployeeLevel = 'General manager' | 'Head' | 'Manager' | 'Staff'

export interface Employee {
  id: string
  firstName: string
  lastName: string
  name: string
  email: string
  /** Two letters, for when there's no photo. */
  initials: string
  /** A photo path such as /avatars/a3.jpg; most people have none. */
  avatar?: string
  department: string
  team: string
  role: string
  level: EmployeeLevel
  /** The manager's id; null for the general manager. */
  managerId: string | null
  region: string
  location: string
  startDate: string
  status: EmployeeStatus
  /** Set when status is Deactivated. */
  deactivatedOn?: string
}

export interface Department {
  name: string
  teams: string[]
}

export type CourseCategory =
  | 'Compliance'
  | 'Health & Safety'
  | 'Guest Experience'
  | 'Food & Beverage'
  | 'Leadership'
  | 'Finance'
  | 'Onboarding'
  | 'Wellbeing'

export interface Course {
  id: string
  title: string
  category: CourseCategory
  lessons: number
  durationMinutes: number
  /** Assigned to everyone. */
  mandatory: boolean
  /** Assigned to these departments as well as anyone it's mandatory for. Empty means everyone. */
  departments: string[]
}

export type EnrolmentStatus = 'Not started' | 'In progress' | 'Completed' | 'Overdue' | 'Failed' | 'Retaking'

export const ENROLMENT_STATUSES: EnrolmentStatus[] = ['Not started', 'In progress', 'Completed', 'Overdue', 'Failed', 'Retaking']

export interface Enrolment {
  id: string
  employeeId: string
  courseId: string
  status: EnrolmentStatus
  assignedOn: string
  dueOn: string
  completedOn: string | null
  /** 0 to 100. */
  progress: number
  /** The last assessment score, 0 to 100, once there is one. */
  score: number | null
  attempts: number
}

export interface Org {
  name: string
  /** The "today" the data was generated against. */
  today: string
  departments: Department[]
  employees: Employee[]
  courses: Course[]
  enrolments: Enrolment[]
}
