import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { getLeads, updateLead } from '@/lib/api'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { LeadsTableHeader } from './leads-table-header'
import { useSearchParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import type { Lead, LeadStatus } from '@/types/lead'
import { LeadsTableCell } from './leads-table-cell'
import { Button } from '@/components/ui/button'
import { NewOpportunityFormDialog } from '@/components/new-opportunity-form-dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Badge } from '@/components/ui/badge'

// Helper functions for status badges and score visualization
const getStatusBadgeColor = (status: LeadStatus) => {
  switch (status) {
    case 'new': return 'bg-blue-500'
    case 'contacted': return 'bg-yellow-500'
    case 'in-progress': return 'bg-slate-400'
    case 'qualified': return 'bg-green-500'
    case 'unqualified': return 'bg-red-500'
    default: return 'bg-slate-400'
  }
}

const getStatusLabel = (status: LeadStatus) => {
  switch (status) {
    case 'new': return 'New'
    case 'contacted': return 'Contacted'
    case 'in-progress': return 'In Progress'
    case 'qualified': return 'Qualified'
    case 'unqualified': return 'Unqualified'
    default: return status
  }
}

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-yellow-600'
  return 'text-red-600'
}

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
  const [isNewOpportunityDialogOpen, setIsNewOpportunityDialogOpen] = useState(false)

  const { mutate: updateLeadMutation } = useMutation({
    mutationFn: updateLead,
  })

  const handleRowClick = (lead: Lead) => {
    setSelectedLead(lead)
    setIsSheetOpen(true)
  }

  const handleConvertLeadClick = (lead: Lead) => {
    setSelectedLead(lead)
    setIsNewOpportunityDialogOpen(true)
  }

  const handleEditLead = (lead: Lead) => {
    updateLeadMutation(lead)
  }

  return (
    <div>
      <LeadsTableHeader />

      <div className="rounded-md border flex flex-col h-[400px] overflow-y-auto">
        <Table>
          <TableHeader className="shadow-sm">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[150px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedLeads.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-[300px]">No leads found</TableCell>
              </TableRow>
            )}
            {sortedLeads.map((lead) => (
              <TableRow
                key={lead.id}
                onClick={() => handleRowClick(lead)}
                className='cursor-pointer'
              >
                <TableCell>{lead.id}</TableCell>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.company}</TableCell>
                <LeadsTableCell isEditable onEdit={(value) => handleEditLead({ ...lead, email: value as string })}>
                  {lead.email}
                </LeadsTableCell>
                <TableCell>{lead.source}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`font-bold ${getScoreColor(lead.score)}`}>
                      {lead.score}
                    </div>
                    <div className="w-16 bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${lead.score >= 80 ? 'bg-green-500' :
                          lead.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                        style={{ width: `${lead.score}%` }}
                      />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusBadgeColor(lead.status)}>
                    {getStatusLabel(lead.status)}
                  </Badge>
                  <Select
                    onValueChange={(value) => handleEditLead({ ...lead, status: value as LeadStatus })}
                    defaultValue={lead.status}
                  >
                    <SelectTrigger size='sm' onClick={(e) => e.stopPropagation()} className="w-0 h-0 opacity-0 absolute">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent onClick={(e) => e.stopPropagation()}>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="unqualified">Unqualified</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={(e) => {
                      e.stopPropagation()
                      handleConvertLeadClick(lead)
                    }}
                    className="text-xs"
                  >
                    Convert
                  </Button>
                </TableCell>
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

      {selectedLead && (
        <NewOpportunityFormDialog open={isNewOpportunityDialogOpen} onOpenChange={setIsNewOpportunityDialogOpen} leadId={selectedLead.id} />
      )}
    </div>
  )
}