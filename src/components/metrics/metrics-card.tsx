import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type MetricsCardProps = ComponentProps<typeof Card> & {
  title: string
  value: number
  icon: React.ReactNode
}

export function MetricsCard({ title, value, icon, ...props }: MetricsCardProps) {
  return (
    <Card className={cn("border-0 shadow-md", props.className)} {...props}>
      <CardContent>
        <p className="text-slate-600 text-sm font-medium">{title}</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-4xl font-bold text-slate-900">{value}</p>
          </div>
          {icon}
        </div>
      </CardContent>
    </Card>
  )
}