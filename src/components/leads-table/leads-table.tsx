import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { getLeads } from '@/lib/api'
import { useSuspenseQuery } from '@tanstack/react-query'
import { LeadsTableHeader } from './leads-table-header'

export function LeadsTable() {
  const { data: leads } = useSuspenseQuery({
    queryKey: ['leads'],
    queryFn: getLeads,
  })

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
            {leads.map((lead) => (
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