import { Navigate, Route, Routes } from 'react-router-dom'
import { WebLayout } from '@replicas/web/WebLayout'
import { WebPlaceholder } from '@replicas/web/WebPlaceholder'

// Web app starter: the learner web app shell. Duplicate it to start a web app demo, then
// add pages under "web" in place of the placeholder.
export default function WebStarter() {
  return (
    <Routes>
      <Route index element={<Navigate to="web/for-you" replace />} />
      <Route path="web" element={<WebLayout />}>
        <Route index element={<Navigate to="for-you" replace />} />
        <Route path=":page" element={<WebPlaceholder />} />
      </Route>
    </Routes>
  )
}
