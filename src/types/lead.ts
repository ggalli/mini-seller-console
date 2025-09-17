export type Lead = {
  id: number
  name: string
  company: string
  email: string
  source: LeadSource
  score: number
  status: LeadStatus
}

export type LeadStatus = 'new' | 'contacted' | 'in-progress' | 'qualified' | 'unqualified'

export type LeadSource = 'website' | 'linkedin' | 'referral' | 'email-campaign'