import { CircleXIcon } from "lucide-react";

export function LeadsTableError({error}: {error: Error}) {
  return (
    <div className="rounded-md border flex flex-col justify-center items-center h-[400px] gap-2">
      <CircleXIcon className="text-red-500" size={40} />
      <p className="text-red-500">{error.message}</p>
    </div>
  )
}