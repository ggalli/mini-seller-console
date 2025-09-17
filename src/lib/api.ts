import { delay, generateId } from "./utils"
import type { Lead } from "@/types/lead"
import type { Opportunity } from "@/types/opportunity"

const leads: Lead[] = [
  {
    "id": 1,
    "name": "John Doe",
    "company": "TechCorp",
    "email": "john.doe@techcorp.com",
    "source": "linkedin",
    "score": 85,
    "status": "new"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "company": "Innovate Inc",
    "email": "jane.smith@innovateinc.com",
    "source": "website",
    "score": 90,
    "status": "contacted"
  },
  {
    "id": 3,
    "name": "Alice Johnson",
    "company": "Solutions Ltd",
    "email": "alice.johnson@solutionsltd.com",
    "source": "referral",
    "score": 75,
    "status": "in-progress"
  },
  {
    "id": 4,
    "name": "Bob Brown",
    "company": "Enterprise Co",
    "email": "bob.brown@enterpriseco.com",
    "source": "email-campaign",
    "score": 65,
    "status": "in-progress"
  },
  {
    "id": 5,
    "name": "Charlie Davis",
    "company": "Tech Solutions",
    "email": "charlie.davis@techsolutions.com",
    "source": "linkedin",
    "score": 80,
    "status": "new"
  },
  {
    "id": 6,
    "name": "Diana Evans",
    "company": "Creative Works",
    "email": "diana.evans@creativeworks.com",
    "source": "website",
    "score": 95,
    "status": "contacted"
  },
  {
    "id": 7,
    "name": "Ethan Foster",
    "company": "Innovate Inc",
    "email": "ethan.foster@innovateinc.com",
    "source": "referral",
    "score": 70,
    "status": "in-progress"
  },
  {
    "id": 8,
    "name": "Fiona Green",
    "company": "TechCorp",
    "email": "fiona.green@techcorp.com",
    "source": "email-campaign",
    "score": 60,
    "status": "in-progress"
  },
  {
    "id": 9,
    "name": "George Harris",
    "company": "Enterprise Co",
    "email": "george.harris@enterpriseco.com",
    "source": "linkedin",
    "score": 85,
    "status": "new"
  },
  {
    "id": 10,
    "name": "Hannah White",
    "company": "Solutions Ltd",
    "email": "hannah.white@solutionsltd.com",
    "source": "website",
    "score": 90,
    "status": "contacted"
  }
]

const opportunities: Opportunity[] = [
  {
    "id": 1,
    "name": "John Doe",
    "stage": "stage 1",
    "amount": null,
    "accountName": "Account 1"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "stage": "stage 2",
    "amount": 2000,
    "accountName": "Account 2"
  },
]


export const getLeads = async (): Promise<Lead[]> => {
  await delay(2000)
  return leads
}

export const getOpportunities = async (): Promise<Opportunity[]> => {
  await delay(1000)
  return opportunities
}

type CreateOpportunityPayload = {
  leadId: number
  opportunity: Omit<Opportunity, 'id'>
}

export const createOpportunity = async ({leadId, opportunity}: CreateOpportunityPayload): Promise<Opportunity> => {
  await delay(1000)

  leads.splice(leads.findIndex((lead) => lead.id === leadId), 1)

  const newOpportunity = {
    ...opportunity,
    id: generateId()
  }
  
  opportunities.push(newOpportunity)
  
  return newOpportunity
}