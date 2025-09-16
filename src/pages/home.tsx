import { LeadsTable } from '@/components/leads-table'
import { OpportunitiesTable } from '@/components/opportunities-table'
import { Suspense } from 'react'

export function Home() {
  return (
    <div className="container mx-auto p-6">
      <h1 className='text-3xl font-bold text-center mb-10'>Mini Seller Console</h1>

      <div className='mb-6'>
        <h2 className='text-xl font-bold mb-2'>Leads</h2>

        <Suspense fallback={<div>Loading...</div>}>
          <LeadsTable />
        </Suspense>
      </div>

      <div className='mb-6'>
        <h2 className='text-xl font-bold mb-2'>Opportunities</h2>

        <Suspense fallback={<div>Loading...</div>}>
          <OpportunitiesTable />
        </Suspense>
      </div>
    </div>
  )
}