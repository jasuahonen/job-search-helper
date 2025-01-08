export interface Job {
    id: string
    title: string
    company: string
    description: string
    due_date: string
    status: "Not Applied" | "Applied"
    created_at: string
    link: string
    location: string
  }

export type NewJob = Omit<Job, 'id' | 'created_at'>

