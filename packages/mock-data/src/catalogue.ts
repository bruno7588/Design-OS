import type { CourseCategory } from './types.ts'

// The raw material: a hotel group like 5Mins' hospitality customers, with sites in four
// regions, seven departments, and a course catalogue with deliberately long names.

export const ORG_NAME = 'Meridian Hotels'

export interface TeamSpec {
  name: string
  manager: string
  roles: string[]
}

export interface DepartmentSpec {
  name: string
  head: string
  /** Share of the staff, relative to the other departments. */
  weight: number
  teams: TeamSpec[]
}

export const DEPARTMENTS: DepartmentSpec[] = [
  {
    name: 'Front of House',
    head: 'Front Office Director',
    weight: 22,
    teams: [
      { name: 'Reception', manager: 'Front Office Manager', roles: ['Receptionist', 'Senior Receptionist', 'Night Auditor', 'Reservations Agent'] },
      { name: 'Concierge', manager: 'Head Concierge', roles: ['Concierge', 'Porter', 'Doorperson'] },
      { name: 'Guest Relations', manager: 'Guest Relations Manager', roles: ['Guest Relations Agent', 'Guest Experience Host'] },
    ],
  },
  {
    name: 'Food & Beverage',
    head: 'Director of Food and Beverage',
    weight: 26,
    teams: [
      { name: 'Restaurant', manager: 'Restaurant Manager', roles: ['Waiter', 'Head Waiter', 'Host', 'Sommelier'] },
      { name: 'Bar', manager: 'Bar Manager', roles: ['Bartender', 'Barback', 'Mixologist'] },
      { name: 'Kitchen', manager: 'Executive Chef', roles: ['Sous Chef', 'Chef de Partie', 'Commis Chef', 'Kitchen Porter', 'Pastry Chef'] },
    ],
  },
  {
    name: 'Housekeeping',
    head: 'Executive Housekeeper',
    weight: 22,
    teams: [
      { name: 'Rooms', manager: 'Housekeeping Manager', roles: ['Room Attendant', 'Housekeeping Supervisor', 'Public Area Attendant'] },
      { name: 'Laundry', manager: 'Laundry Manager', roles: ['Laundry Attendant', 'Linen Porter'] },
    ],
  },
  {
    name: 'Finance',
    head: 'Finance Director',
    weight: 7,
    teams: [
      { name: 'Accounts', manager: 'Financial Controller', roles: ['Accounts Assistant', 'Accounts Payable Clerk', 'Financial Analyst'] },
      { name: 'Payroll', manager: 'Payroll Manager', roles: ['Payroll Officer', 'Payroll Administrator'] },
    ],
  },
  {
    name: 'People',
    head: 'People Director',
    weight: 6,
    teams: [
      { name: 'Recruitment', manager: 'Talent Acquisition Manager', roles: ['Recruiter', 'Recruitment Coordinator'] },
      { name: 'Learning & Development', manager: 'L&D Manager', roles: ['L&D Coordinator', 'Learning Designer', 'People Partner'] },
    ],
  },
  {
    name: 'Compliance',
    head: 'Head of Risk and Compliance',
    weight: 5,
    teams: [
      { name: 'Health & Safety', manager: 'Health and Safety Manager', roles: ['Health and Safety Officer', 'Fire Safety Officer'] },
      { name: 'Data Protection', manager: 'Data Protection Officer', roles: ['Compliance Analyst', 'Privacy Analyst'] },
    ],
  },
  {
    name: 'Sales',
    head: 'Director of Sales and Marketing',
    weight: 12,
    teams: [
      { name: 'Events', manager: 'Events Manager', roles: ['Events Coordinator', 'Banqueting Supervisor'] },
      { name: 'Corporate Sales', manager: 'Corporate Sales Manager', roles: ['Sales Executive', 'Account Manager'] },
      { name: 'Revenue', manager: 'Revenue Manager', roles: ['Revenue Analyst', 'Distribution Executive'] },
    ],
  },
]

export const SITES: { region: string; location: string; weight: number }[] = [
  { region: 'UK & Ireland', location: 'London Riverside', weight: 20 },
  { region: 'UK & Ireland', location: 'Manchester Central', weight: 10 },
  { region: 'UK & Ireland', location: 'Dublin Harbour', weight: 8 },
  { region: 'Iberia', location: 'Lisbon Avenida', weight: 14 },
  { region: 'Iberia', location: 'Porto Ribeira', weight: 10 },
  { region: 'Iberia', location: 'Madrid Gran Vía', weight: 10 },
  { region: 'Middle East', location: 'Dubai Marina', weight: 14 },
  { region: 'Southeast Asia', location: 'Singapore Bayfront', weight: 14 },
]

export const FIRST_NAMES = [
  'Amelia', 'Oliver', 'Isla', 'George', 'Ava', 'Harry', 'Mia', 'Noah', 'Grace', 'Jack',
  'Sofia', 'Leo', 'Freya', 'Arthur', 'Chloe', 'Oscar', 'Ella', 'Theo', 'Lily', 'Finn',
  'Beatriz', 'João', 'Inês', 'Tiago', 'Mariana', 'Duarte', 'Leonor', 'Rodrigo', 'Carolina', 'Afonso',
  'Lucía', 'Pablo', 'Carmen', 'Javier', 'Elena', 'Álvaro', 'Paula', 'Diego',
  'Aisha', 'Omar', 'Fatima', 'Yusuf', 'Layla', 'Hamza', 'Noor', 'Karim',
  'Priya', 'Arjun', 'Ananya', 'Rohan', 'Meera', 'Vikram',
  'Wei', 'Mei', 'Jun', 'Hui Min', 'Kenji', 'Yuki', 'Min-jun', 'Seo-yeon',
  'Siobhán', 'Ciarán', 'Aoife', 'Niamh', 'Chiamaka', 'Tunde', 'Amara', 'Kwame', 'Zara', 'Mateus',
]

export const LAST_NAMES = [
  'Smith', 'Jones', 'Taylor', 'Brown', 'Williams', 'Wilson', 'Davies', 'Evans', 'Thomas', 'Roberts',
  'Walker', 'Wright', 'Thompson', 'White', 'Hughes', 'Edwards', 'Green', 'Hall', 'Wood', 'Clarke',
  'Silva', 'Santos', 'Ferreira', 'Pereira', 'Oliveira', 'Costa', 'Rodrigues', 'Martins', 'Sousa', 'Fernandes',
  'García', 'Martínez', 'López', 'Sánchez', 'Romero', 'Navarro', 'Torres',
  'Khan', 'Rahman', 'Haddad', 'Al-Sayed', 'Hussain', 'Malik',
  'Patel', 'Sharma', 'Iyer', 'Reddy', 'Nair',
  'Tan', 'Lim', 'Ng', 'Wong', 'Watanabe', 'Kim', 'Park',
  "O'Brien", 'Murphy', 'Byrne', 'Kelly', 'Okafor', 'Adeyemi', 'Mensah', 'Van der Berg', 'Fitzgerald-Hughes',
]

/** The prototype's sample photos (playground/public/avatars), copied into apps that need them. */
export const PHOTOS = ['/avatars/a1.jpg', '/avatars/a2.jpg', '/avatars/a3.jpg', '/avatars/a4.jpg', '/avatars/a5.jpg', '/avatars/a6.jpg', '/avatars/a7.jpg']

export interface CourseSpec {
  title: string
  category: CourseCategory
  lessons: number
  mandatory?: boolean
  departments?: string[]
}

export const COURSES: CourseSpec[] = [
  { title: 'Welcome to Meridian', category: 'Onboarding', lessons: 4, mandatory: true },
  { title: 'Fire Safety Awareness', category: 'Health & Safety', lessons: 5, mandatory: true },
  { title: 'Data Protection and GDPR Essentials for Everyone Who Handles Guest or Colleague Information', category: 'Compliance', lessons: 8, mandatory: true },
  { title: 'Anti-Bribery and Corruption', category: 'Compliance', lessons: 6, mandatory: true },
  { title: 'Equality, Diversity and Inclusion at Work', category: 'Compliance', lessons: 7, mandatory: true },
  { title: 'Manual Handling', category: 'Health & Safety', lessons: 3, departments: ['Housekeeping', 'Food & Beverage', 'Front of House'] },
  { title: 'Food Safety Level 2: Allergen Management, Cross-Contamination and Safe Storage in Commercial Kitchens', category: 'Food & Beverage', lessons: 12, departments: ['Food & Beverage'] },
  { title: 'Responsible Service of Alcohol', category: 'Food & Beverage', lessons: 5, departments: ['Food & Beverage'] },
  { title: 'Wine Pairing Basics', category: 'Food & Beverage', lessons: 6, departments: ['Food & Beverage'] },
  { title: 'Cocktail Fundamentals', category: 'Food & Beverage', lessons: 8, departments: ['Food & Beverage'] },
  { title: 'COSHH: Working Safely with Cleaning Chemicals', category: 'Health & Safety', lessons: 4, departments: ['Housekeeping'] },
  { title: 'Room Inspection Standards', category: 'Guest Experience', lessons: 5, departments: ['Housekeeping'] },
  { title: 'Handling Guest Complaints with Empathy', category: 'Guest Experience', lessons: 6, departments: ['Front of House', 'Food & Beverage'] },
  { title: 'Check-in and Check-out Excellence', category: 'Guest Experience', lessons: 5, departments: ['Front of House'] },
  { title: 'Upselling Rooms and Experiences at the Front Desk Without Being Pushy', category: 'Guest Experience', lessons: 7, departments: ['Front of House', 'Sales'] },
  { title: 'Anti-Money Laundering and Counter-Terrorist Financing Awareness for Front-Line Hospitality Staff (2026 Update)', category: 'Compliance', lessons: 9, departments: ['Front of House', 'Finance'] },
  { title: 'Payment Card Security (PCI DSS)', category: 'Compliance', lessons: 4, departments: ['Front of House', 'Finance', 'Food & Beverage'] },
  { title: 'Month-end Close', category: 'Finance', lessons: 6, departments: ['Finance'] },
  { title: 'Understanding Hotel P&L Statements, Forecasting and Cost Control for Non-Finance Managers', category: 'Finance', lessons: 10, departments: ['Finance'] },
  { title: 'Fair Recruitment and Right to Work Checks', category: 'Compliance', lessons: 5, departments: ['People'] },
  { title: 'Designing Microlearning', category: 'Leadership', lessons: 6, departments: ['People'] },
  { title: 'Risk Assessments in Practice', category: 'Health & Safety', lessons: 6, departments: ['Compliance'] },
  { title: 'Incident Reporting and Investigation', category: 'Health & Safety', lessons: 5, departments: ['Compliance'] },
  { title: 'Negotiating Corporate Rates', category: 'Leadership', lessons: 5, departments: ['Sales'] },
  { title: 'Planning Flawless Events: From First Enquiry to Final Invoice, Including Supplier Management', category: 'Guest Experience', lessons: 11, departments: ['Sales'] },
  { title: 'Revenue Management Basics', category: 'Finance', lessons: 7, departments: ['Sales'] },
  { title: 'First-time Manager Essentials', category: 'Leadership', lessons: 8 },
  { title: 'Giving Feedback That Lands', category: 'Leadership', lessons: 4 },
  { title: 'Running Effective Shift Briefings', category: 'Leadership', lessons: 3 },
  { title: 'Managing Stress and Building Resilience', category: 'Wellbeing', lessons: 5 },
  { title: 'Sleep, Shifts and Staying Well', category: 'Wellbeing', lessons: 4 },
  { title: 'Mental Health First Aid Awareness', category: 'Wellbeing', lessons: 6 },
]
