import { LeadsTable } from '@/components/leads-table'
import { Suspense } from 'react'

export function Home() {
  return (
    <div className="container mx-auto px-6">
      <h1 className='text-5xl font-bold text-center my-10'>Mini Seller Console</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <LeadsTable />
      </Suspense>
    </div>
  )
}