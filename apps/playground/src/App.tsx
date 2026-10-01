import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminLayout } from './replicas/admin/AdminLayout'
import { AdminPlaceholder } from './replicas/admin/AdminPage'
import { WebLayout } from './replicas/web/WebLayout'
import { WebPlaceholder } from './replicas/web/WebPlaceholder'
import { ReplicasIndex } from './pages/ReplicasIndex'
import { PeoplePage } from './pages/admin/PeoplePage'
import { DemoRoute } from './DemoRoute'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<ReplicasIndex />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="people" replace />} />
        <Route path="people" element={<PeoplePage />} />
        <Route path=":page" element={<AdminPlaceholder />} />
      </Route>
      <Route path="/web" element={<WebLayout />}>
        <Route index element={<Navigate to="for-you" replace />} />
        <Route path=":page" element={<WebPlaceholder />} />
      </Route>
      <Route path="/demos/:slug/v/:version/*" element={<DemoRoute />} />
      <Route path="/demos/:slug/*" element={<DemoRoute />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
