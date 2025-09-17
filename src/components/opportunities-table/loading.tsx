import { Loader2 } from "lucide-react";

export function OpportunitiesTableLoading() {
  return (
    <div className="rounded-md border flex justify-center items-center h-[200px]">
      <Loader2 className="animate-spin" size={40} />
    </div>
  )
}