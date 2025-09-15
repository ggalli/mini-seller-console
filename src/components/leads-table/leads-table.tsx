import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { getLeads } from '@/lib/api'
import { useSuspenseQuery } from '@tanstack/react-query'
import { LeadsTableHeader } from './leads-table-header'
import { useSearchParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import type { Lead } from '@/types/lead'

export function LeadsTable() {
  const [searchParams] = useSearchParams()

  const status = searchParams.get('status')
  const query = searchParams.get('q')

  const { data: leads } = useSuspenseQuery({
    queryKey: ['leads'],
    queryFn: getLeads,
  })

  const filteredLeads = useMemo(() => {
    let filteredLeads = leads

    if (status) {
      filteredLeads = filteredLeads.filter((lead) => status.includes(lead.status))
    }

    if (query) {
      filteredLeads = filteredLeads.filter(({ name, company }) => name.toLowerCase().includes(query.toLowerCase()) || company.toLowerCase().includes(query.toLowerCase()))
    }

    return filteredLeads
  }, [leads, status, query])

  const sortedLeads = useMemo(() => {
    return [...filteredLeads].sort((a, b) => b.score - a.score)
  }, [filteredLeads])

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const handleRowClick = (lead: Lead) => {
    setSelectedLead(lead)
    setIsSheetOpen(true)
  }

  return (
    <div>
      <LeadsTableHeader />

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedLeads.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-[300px]">No leads found</TableCell>
              </TableRow>
            )}
            {sortedLeads.map((lead) => (
              <TableRow key={lead.id} onClick={() => handleRowClick(lead)} className='cursor-pointer'>
                <TableCell>{lead.id}</TableCell>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.company}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.source}</TableCell>
                <TableCell>{lead.score}</TableCell>
                <TableCell>{lead.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedLead && (
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Lead Details</SheetTitle>
              <SheetDescription>
                Detailed information about the lead.
              </SheetDescription>
            </SheetHeader>
            <div className="px-4 space-y-1">
              <p><strong>ID:</strong> {selectedLead.id}</p>
              <p><strong>Name:</strong> {selectedLead.name}</p>
              <p><strong>Company:</strong> {selectedLead.company}</p>
              <p><strong>Email:</strong> {selectedLead.email}</p>
              <p><strong>Source:</strong> {selectedLead.source}</p>
              <p><strong>Score:</strong> {selectedLead.score}</p>
              <p><strong>Status:</strong> {selectedLead.status}</p>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}