import type { ShareTarget } from '@design-os/components'

const avatar = '/samples/avatar.png'
export const PEOPLE: ShareTarget[] = [
  ['Beth Anderson', 'Software Developer'],
  ['Jacob Patel', 'UX Designer'],
  ['Mia Thompson', 'Data Analyst'],
  ['Manuel Thompson', 'Project Manager'],
  ['Alexander Rodriguez', 'IT Support Specialist'],
  ['Harper Wilson', 'Cybersecurity Engineer'],
  ['Samuel Lee', 'Artificial Intelligence Researcher'],
  ['Chloe Campbell', 'Product Manager'],
].map(([name, detail]) => ({ id: name, name, detail, avatar }))

export const TEAMS: ShareTarget[] = [
  ['Growth Team', 'TM Beth Anderson'],
  ['Sales', 'TM Jacob Patel'],
  ['Product Team', 'TM Mia Thompson'],
  ['Project Management Team', 'No manager'],
  ['Customer Support', 'TM Alexander Rodriguez'],
  ['Engineering', 'TM Harper Wilson'],
  ['HR', 'No manager'],
  ['Marketing', 'TM Chloe Campbell'],
].map(([name, detail]) => ({ id: name, name, detail, avatar }))
