import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { getLeads } from '@/lib/api'
import { useSuspenseQuery } from '@tanstack/react-query'
import { LeadsTableHeader } from './leads-table-header'
import { useSearchParams } from 'react-router-dom'
import { useMemo } from 'react'

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
              <TableRow key={lead.id}>
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
    </div>
  )
}