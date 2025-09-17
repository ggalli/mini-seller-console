import type { Lead } from "@/types/lead"
import type { Opportunity } from "@/types/opportunity"
import { faker } from "@faker-js/faker"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const sources = ["linkedin", "website", "referral", "email-campaign"] as const
const statuses = ["new", "contacted", "in-progress", "qualified", "unqualified"] as const
const stages = ["stage 1", "stage 2", "stage 3"] as const

export const generateFakeLeads = (count: number): Lead[] => {
  const fakeLeads: Lead[] = []

  for (let i = 0; i < count; i++) {
    const fakeLead: Lead = {
      id: faker.number.int({ max: 100000 }),
      name: faker.person.fullName(),
      company: faker.company.name(),
      email: faker.internet.email(),
      source: faker.helpers.arrayElement(sources),
      score: faker.number.int({ max: 100 }),
      status: faker.helpers.arrayElement(statuses)
    }

    fakeLeads.push(fakeLead)
  }

  return fakeLeads
}

export const generateFakeOpportunities = (count: number): Opportunity[] => {
  const fakeOpportunities: Opportunity[] = []

  for (let i = 0; i < count; i++) {
    const fakeOpportunity: Opportunity = {
      id: faker.number.int({ max: 100000 }),
      name: faker.person.fullName(),
      stage: faker.helpers.arrayElement(stages),
      amount: faker.number.int({ min: 100, max: 9999 }),
      accountName: faker.company.name()
    }

    fakeOpportunities.push(fakeOpportunity)
  }

  return fakeOpportunities
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}