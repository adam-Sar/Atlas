import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Globe, 
  Search, 
  Bookmark, 
  Menu, 
  X, 
  Layers, 
  Compass, 
  LineChart, 
  Sparkles,
  ExternalLink
} from 'lucide-react'
import { getBookmarks } from '@/lib/storage'

export function Navbar() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [bookmarkCount, setBookmarkCount] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const updateBookmarks = () => {
      setBookmarkCount(getBookmarks().length)
    }
    updateBookmarks()
    window.addEventListener('storage', updateBookmarks)
    return () => window.removeEventListener('storage', updateBookmarks)
  }, [location])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const navLinks = [
    { label: 'The Observatory', path: '/', icon: Globe },
    { label: 'Explore Data', path: '/explore', icon: Compass },
    { label: 'Observation Detail', path: '/observation/aral-sea-desiccation', icon: Layers },
    { label: 'Research Workspace', path: '/workspace', icon: LineChart },
  ]

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-[#090A0C]/90 backdrop-blur-md border-b border-[#222630] shadow-2xl shadow-black/40' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & Identity */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="relative w-9 h-9 rounded-lg bg-[#111317] border border-[#222630] flex items-center justify-center group-hover:border-[#00D2B4]/60 transition-all duration-300 shadow-inner">
              {/* Planetary Sensor Icon */}
              <div className="w-5 h-5 rounded-full border border-[#00D2B4]/40 flex items-center justify-center group-hover:scale-105 transition-transform">
                <div className="w-2 h-2 rounded-full bg-[#00D2B4] shadow-[0_0_8px_#00D2B4]" />
              </div>
              <div className="absolute inset-0 rounded-lg bg-radial from-[#00D2B4]/10 to-transparent pointer-events-none" />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg font-bold tracking-widest text-white uppercase group-hover:text-[#00D2B4] transition-colors">
                  ATLAS
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-mono tracking-wider bg-[#16191F] border border-[#222630] text-[#00D2B4] rounded">
                  v2.4
                </span>
              </div>
              <span className="text-[10px] tracking-wider text-[#94A3B8] uppercase font-mono">
                Earth Intelligence Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#111317]/80 p-1.5 rounded-full border border-[#222630] shadow-sm" aria-label="Main Navigation">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#222630] text-white shadow-[0_1px_3px_rgba(0,0,0,0.5)] border border-[#2D3340]'
                      : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#00D2B4]' : 'text-[#64748B]'}`} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Right Action Utilities */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Live Telemetry Pill */}
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#111317] border border-[#222630] text-[11px] font-mono text-[#94A3B8]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D2B4] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D2B4]"></span>
              </span>
              <span>ORBITAL STREAM: <strong className="text-white">ACTIVE</strong></span>
            </div>

            {/* Bookmarks Counter Button */}
            <Link
              to="/explore?filter=saved"
              aria-label="View saved datasets"
              className="relative p-2 rounded-lg bg-[#111317] border border-[#222630] text-[#94A3B8] hover:text-white hover:border-[#2D3340] transition-colors"
              title="Saved Datasets"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#00D2B4] text-[#090A0C] text-[10px] font-bold font-mono flex items-center justify-center">
                  {bookmarkCount}
                </span>
              )}
            </Link>

            {/* Quick Workspace CTA */}
            <Link
              to="/workspace"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#00D2B4] hover:bg-[#00E5C5] text-[#090A0C] text-xs font-semibold tracking-wide transition-all duration-200 shadow-[0_0_15px_rgba(0,210,180,0.25)] hover:shadow-[0_0_20px_rgba(0,210,180,0.4)]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Studio</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/explore?filter=saved"
              className="p-2 rounded-lg bg-[#111317] border border-[#222630] text-[#94A3B8]"
              aria-label="Bookmarks"
            >
              <Bookmark className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#111317] border border-[#222630] text-white hover:border-[#2D3340] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0C0E12] border-b border-[#222630] px-4 pt-3 pb-6 space-y-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#111317] border border-[#222630] text-xs font-mono text-[#94A3B8]">
            <span className="w-2 h-2 rounded-full bg-[#00D2B4] animate-pulse"></span>
            <span>TELEMETRY: SYNCHRONIZED</span>
          </div>

          <div className="space-y-1">
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-[#222630] text-[#00D2B4] font-semibold'
                      : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          <div className="pt-2">
            <Link
              to="/workspace"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#00D2B4] text-[#090A0C] font-semibold text-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Research Workspace</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
