import { Users, Target, TrendingUp, DollarSign } from 'lucide-react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { getLeads, getOpportunities } from '@/lib/api'
import { useMemo } from 'react'
import { MetricsCard } from './metrics-card'

export function Metrics() {
  const { data: leads } = useSuspenseQuery({
    queryKey: ['leads'],
    queryFn: getLeads,
  })

  const { data: opportunities } = useSuspenseQuery({
    queryKey: ['opportunities'],
    queryFn: getOpportunities,
  })

  const metrics = useMemo(() => {
    const totalLeads = leads.length
    const qualifiedLeads = leads.filter(lead => lead.status === 'qualified').length
    const totalOpportunities = opportunities.length
    const pipelineValue = opportunities.reduce((sum, opp) => sum + (opp.amount || 0), 0)

    return {
      totalLeads,
      qualifiedLeads,
      totalOpportunities,
      pipelineValue
    }
  }, [leads, opportunities])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricsCard title='Total Leads' value={metrics.totalLeads} icon={<Users className="h-10 w-10 text-blue-600" />} className='bg-gradient-to-r from-blue-50 to-blue-100' />
      <MetricsCard title='Qualified Leads' value={metrics.qualifiedLeads} icon={<Target className="h-10 w-10 text-green-600" />} className='bg-gradient-to-r from-green-50 to-green-100' />
      <MetricsCard title='Total Opportunities' value={metrics.totalOpportunities} icon={<TrendingUp className="h-10 w-10 text-purple-600" />} className='bg-gradient-to-r from-purple-50 to-purple-100' />
      <MetricsCard title='Pipeline Value' value={metrics.pipelineValue} icon={<DollarSign className="h-10 w-10 text-orange-600" />} className='bg-gradient-to-r from-orange-50 to-orange-100' />

      {/* <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-blue-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Leads</p>
              <p className="text-2xl font-bold text-blue-900">{metrics.totalLeads}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </CardContent>
      </Card> */}

      {/* <Card className="border-0 shadow-md bg-gradient-to-r from-green-50 to-green-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Qualified Leads</p>
              <p className="text-2xl font-bold text-green-900">{metrics.qualifiedLeads}</p>
            </div>
            <Target className="h-8 w-8 text-green-600" />
          </div>
        </CardContent>
      </Card> */}

      {/* <Card className="border-0 shadow-md bg-gradient-to-r from-purple-50 to-purple-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Opportunities</p>
              <p className="text-2xl font-bold text-purple-900">{metrics.totalOpportunities}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
        </CardContent>
      </Card> */}

      {/* <Card className="border-0 shadow-md bg-gradient-to-r from-orange-50 to-orange-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">Pipeline Value</p>
              <p className="text-2xl font-bold text-orange-900">
                ${metrics.pipelineValue.toLocaleString()}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-orange-600" />
          </div>
        </CardContent>
      </Card> */}
    </div>
  )
}