import { delay } from "./utils"
import leads from "@/leads.json"
import type { Lead } from "@/types/lead"

export const getLeads = async (): Promise<Lead[]> => {
  await delay(2000)
  return leads as Lead[]
}