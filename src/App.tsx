import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from '@/components/navigation/Navbar'
import { Footer } from '@/components/navigation/Footer'
import { ScrollToTop } from '@/components/navigation/ScrollToTop'
import { ObservatoryPage } from '@/pages/ObservatoryPage'
import { ExplorePage } from '@/pages/ExplorePage'
import { ObservationDetailPage } from '@/pages/ObservationDetailPage'
import { WorkspacePage } from '@/pages/WorkspacePage'

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#090A0C] text-[#F3F4F6] selection:bg-[#00D2B4]/30 selection:text-[#00D2B4]">
        <Navbar />
        
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<ObservatoryPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/observation/:slug" element={<ObservationDetailPage />} />
            <Route path="/workspace" element={<WorkspacePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
