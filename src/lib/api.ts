import { delay, generateFakeOpportunities } from "./utils"
import type { Lead } from "@/types/lead"
import type { Opportunity } from "@/types/opportunity"
import { faker } from "@faker-js/faker"
import { generateFakeLeads } from "./utils"

const leads = generateFakeLeads(100)

const opportunities = generateFakeOpportunities(2)

export const getLeads = async (): Promise<Lead[]> => {
  await delay(2000)
  // throw new Error("Error on loading leads");
  return leads
}

export const updateLead = async (lead: Lead): Promise<Lead> => {
  await delay(1000)

  const leadIndex = leads.findIndex((l) => l.id === lead.id)
  leads[leadIndex] = lead

  return lead
}

export const getOpportunities = async (): Promise<Opportunity[]> => {
  await delay(1000)
  // throw new Error("Error on loading opportunities");
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
    id: faker.number.int({ max: 100000 })
  }
  
  opportunities.push(newOpportunity)
  
  return newOpportunity
}