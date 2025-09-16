import { delay } from "./utils"
import leads from "@/leads.json"
import type { Lead } from "@/types/lead"
import opportunities from "@/opportunities.json"
import type { Opportunity } from "@/types/opportunity"

export const getLeads = async (): Promise<Lead[]> => {
  await delay(2000)
  return leads as Lead[]
}

export const getOpportunities = async (): Promise<Opportunity[]> => {
  await delay(1000)
  return opportunities as Opportunity[]
}