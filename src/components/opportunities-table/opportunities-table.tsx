import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { getOpportunities } from "@/lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

export function OpportunitiesTable() {
  const { data: opportunities } = useSuspenseQuery({
    queryKey: ['opportunities'],
    queryFn: getOpportunities,
  })
  
  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Account Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {opportunities.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center h-[300px]">No opportunities found</TableCell>
            </TableRow>
          )}
          {opportunities.map((opportunity) => (
            <TableRow key={opportunity.id}>
            <TableCell>{opportunity.id}</TableCell>
            <TableCell>{opportunity.name}</TableCell>
            <TableCell>{opportunity.stage}</TableCell>
            <TableCell>{opportunity.amount}</TableCell>
            <TableCell>{opportunity.accountName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}