import { TableCell } from "@/components/ui/table";
import { CheckIcon, PencilIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "@/components/ui/input";

type LeadsTableCellProps = {
  children: string | number
  isEditable?: boolean
}

export function LeadsTableCell({ children, isEditable = false }: LeadsTableCellProps) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [inputValue, setInputValue] = useState(children)

  const toggleEditMode = () => setIsEditMode((prev) => !prev)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsEditMode(false)
  }

  const handleCancelEdit = () => {
    setIsEditMode(false)
    setInputValue(children)
  }

  return (
    <TableCell className={cn(isEditable && "relative group")} onClick={(event) => event.stopPropagation()}>
      <form onSubmit={handleSubmit} className="flex items-center">
        {isEditMode ? (
          <Input type="email" value={inputValue} onChange={handleInputChange} size={1} required autoFocus />
        ) : (
          <span>{inputValue}</span>
        )}

        {isEditable && (
          <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {isEditMode ? (
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="icon" type="submit" className="size-6">
                  <CheckIcon className="text-green-500" />
                </Button>
                <Button variant="secondary" size="icon" onClick={handleCancelEdit} className="size-6">
                  <XIcon className="text-red-500" />
                </Button>
              </div>
            ) : (
              <Button variant="secondary" size="icon" onClick={toggleEditMode} className="size-6">
                <PencilIcon />
              </Button>
            )}
          </div>
        )}
      </form>
    </TableCell>
  )
}