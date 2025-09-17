import { LeadsTable, LeadsTableLoading, LeadsTableError } from '@/components/leads-table'
import { OpportunitiesTable, OpportunitiesTableLoading, OpportunitiesTableError } from '@/components/opportunities-table'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export function Home() {
  return (
    <div className="container mx-auto p-6">
      <h1 className='text-3xl font-bold text-center mb-10'>Mini Seller Console</h1>

      <div className='mb-6'>
        <h2 className='text-xl font-bold mb-2'>Leads</h2>

        <ErrorBoundary fallbackRender={LeadsTableError}>
          <Suspense fallback={<LeadsTableLoading />}>
            <LeadsTable />
          </Suspense>
        </ErrorBoundary>
      </div>

      <div className='mb-6'>
        <h2 className='text-xl font-bold mb-2'>Opportunities</h2>

        <ErrorBoundary fallbackRender={OpportunitiesTableError}>
          <Suspense fallback={<OpportunitiesTableLoading />}>
            <OpportunitiesTable />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  )
}