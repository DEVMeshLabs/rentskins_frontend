'use client'

import usersMock from '@/app/admin/users.mock'
import { useEffect, useState } from 'react'
import PageAdminUsersContent from './PageAdminUsersContent'
import PageAdminUsersForm from './PageAdminUsersForm'

export default function PageAdminUsersTable() {
  const [filters, setFilters] = useState()

  const handleFormSubmit = (data: any) => {
    setFilters({ ...data })
  }

  console.log(filters)

  useEffect(() => console.log(filters), [filters, setFilters])

  return (
    <>
      <div className="flex h-1/6 w-full items-center justify-center gap-4 rounded-lg bg-mesh-color-neutral-700 p-2">
        <PageAdminUsersForm handleFormSubmit={handleFormSubmit} />
      </div>

      <div className="h-full w-full overflow-hidden">
        <PageAdminUsersContent users={usersMock as any} filters={filters} />
      </div>
    </>
  )
}
