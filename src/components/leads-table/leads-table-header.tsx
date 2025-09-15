import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import type { LeadStatus } from "@/types/lead";
import { useSearchParams } from "react-router-dom";

const statusesOptions: { label: string; value: LeadStatus }[] = [
  {
    label: 'New',
    value: 'new'
  },
  {
    label: 'Contacted',
    value: 'contacted'
  },
  {
    label: 'In Progress',
    value: 'in-progress'
  },
  {
    label: 'Converted',
    value: 'converted'
  }
]

export function LeadsTableHeader() {
  const [searchParams, setSearchParams] = useSearchParams()

  const status = (searchParams.get('status') || '').split(',')
  const query = searchParams.get('q') || ''

  const handleChangeSearchParams = (param: string, value?: string) => {
    if (!value) {
      searchParams.delete(param)
    } else {
      searchParams.set(param, value)
    }

    setSearchParams(searchParams)
  }

  return (
    <div className="flex items-center mb-4 gap-4">
      <Input
        placeholder="Search by name or company"
        value={query}
        onChange={(e) => handleChangeSearchParams('q', e.target.value)}
        className="max-w-sm"
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Status <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {statusesOptions
            .map(({ value, label }) => {
              return (
                <DropdownMenuCheckboxItem key={value}
                  checked={status.includes(value)}
                  onCheckedChange={(checked) => {
                    const newStatus = checked ? [...status, value] : status.filter((status) => status !== value)
                    handleChangeSearchParams('status', newStatus.join(','))
                  }}
                >
                  {label}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}