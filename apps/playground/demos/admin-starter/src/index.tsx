import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminLayout } from '@replicas/admin/AdminLayout'
import { AdminPlaceholder } from '@replicas/admin/AdminPage'
import { PeoplePage } from '@playground/pages/admin/PeoplePage'

// Admin starter: the Admin replica with the People page and 500 generated people.
// Duplicate it to start an Admin demo, then replace or add pages under "admin".
export default function AdminStarter() {
  return (
    <Routes>
      <Route index element={<Navigate to="admin/people" replace />} />
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="people" replace />} />
        <Route path="people" element={<PeoplePage />} />
        <Route path=":page" element={<AdminPlaceholder />} />
      </Route>
    </Routes>
  )
}
