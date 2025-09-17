import { LeadsTable, LeadsTableLoading, LeadsTableError } from '@/components/leads-table'
import { OpportunitiesTable, OpportunitiesTableLoading, OpportunitiesTableError } from '@/components/opportunities-table'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Metrics } from '@/components/metrics'

export function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className='text-3xl font-bold text-slate-900'>Mini Seller Console</h1>
            <p className="text-slate-600 text-sm">Manage your leads and opportunities</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-medium">
              U
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 space-y-8">
        <Suspense fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="border-0">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
                      <div className="h-8 w-12 bg-slate-200 rounded animate-pulse" />
                    </div>
                    <div className="h-10 w-10 bg-slate-200 rounded animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        }>
          <Metrics />
        </Suspense>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900">Leads Management</CardTitle>
          </CardHeader>
          <CardContent>
            <ErrorBoundary fallbackRender={LeadsTableError}>
              <Suspense fallback={<LeadsTableLoading />}>
                <LeadsTable />
              </Suspense>
            </ErrorBoundary>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900">Opportunities Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ErrorBoundary fallbackRender={OpportunitiesTableError}>
              <Suspense fallback={<OpportunitiesTableLoading />}>
                <OpportunitiesTable />
              </Suspense>
            </ErrorBoundary>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}