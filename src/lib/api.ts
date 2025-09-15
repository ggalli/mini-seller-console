import { delay } from "./utils"
import leads from "@/leads.json"

export const getLeads = async () => {
  await delay(2000)
  return leads
}