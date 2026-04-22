
import { useUser } from '@clerk/clerk-react'
import { Navigate, Route, Routes } from 'react-router'
import { Toaster } from "react-hot-toast";

import HomePage      from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import ProblemsPage  from './pages/ProblemsPage'
import ProblemPage   from './pages/ProblemPage'
import SessionPage   from './pages/SessionPage'

// New marketing pages (public — no auth required)
import FeaturesPage  from './pages/Featurespage'
import PricingPage   from './pages/Pricingpage'
import DocsPage      from './pages/Docspage'
import BlogPage      from './pages/Blogpage'

function App() {
  const { isSignedIn, isLoaded } = useUser()
  if (!isLoaded) return null;

  return (
    <>
      <Routes>
        {/* ── Home ── */}
        <Route path="/" element={!isSignedIn ? <HomePage /> : <Navigate to="/dashboard" />} />

        {/* ── Public marketing pages ── */}
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/pricing"  element={<PricingPage />} />
        <Route path="/docs"     element={<DocsPage />} />
        <Route path="/blog"     element={<BlogPage />} />

        {/* ── Protected app pages ── */}
        <Route path="/dashboard"   element={isSignedIn ? <DashboardPage /> : <Navigate to="/" />} />
        <Route path="/problems"    element={isSignedIn ? <ProblemsPage />  : <Navigate to="/" />} />
        <Route path="/problem/:id" element={isSignedIn ? <ProblemPage />   : <Navigate to="/" />} />
        <Route path="/session/:id" element={isSignedIn ? <SessionPage />   : <Navigate to="/" />} />
      </Routes>

      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  )
}

export default App