import { Link } from 'react-router-dom'
import { Globe, ShieldCheck, Terminal, Download, ArrowUpRight, Radio } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-[#07080A] border-t border-[#1C2027] text-[#94A3B8] font-sans pt-16 pb-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid: Brand & Vision vs Directory */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-[#1A1D24]">
          
          {/* Brand Manifesto Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#111317] border border-[#222630] flex items-center justify-center">
                <div className="w-4 h-4 rounded-full border border-[#00D2B4]/60 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00D2B4]" />
                </div>
              </div>
              <span className="font-mono text-base font-bold tracking-widest text-white uppercase">
                ATLAS
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#16191F] border border-[#222630] text-[#00D2B4]">
                PLANETARY OBSERVATORY
              </span>
            </div>

            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-md">
              The planet has a physical memory written in ice sheets, sediment deltas, and atmospheric circulation. 
              ATLAS bridges remote sensing telemetry and open research data to make environmental transformation visible and measurable.
            </p>

            {/* Scientific Ground Stations */}
            <div className="pt-2">
              <span className="text-[11px] font-mono tracking-wider uppercase text-[#64748B] block mb-2">
                Connected Ground Stations
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-mono text-[#CBD5E1]">
                <span className="px-2 py-1 rounded bg-[#111317] border border-[#1E222A]">
                  Svalbard SG3 (78°14′N)
                </span>
                <span className="px-2 py-1 rounded bg-[#111317] border border-[#1E222A]">
                  Mauna Loa MLO (19°32′N)
                </span>
                <span className="px-2 py-1 rounded bg-[#111317] border border-[#1E222A]">
                  McMurdo Station (77°51′S)
                </span>
              </div>
            </div>
          </div>

          {/* Directory Links */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Core Observatory */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-white font-semibold">
                Observatory
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    The Observatory
                  </Link>
                </li>
                <li>
                  <Link to="/explore" className="hover:text-white transition-colors">
                    Data Catalog
                  </Link>
                </li>
                <li>
                  <Link to="/observation/aral-sea-desiccation" className="hover:text-white transition-colors">
                    Aral Sea Analysis
                  </Link>
                </li>
                <li>
                  <Link to="/workspace" className="hover:text-white transition-colors">
                    Research Workspace
                  </Link>
                </li>
              </ul>
            </div>

            {/* Earth Domains */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-white font-semibold">
                Physical Domains
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link to="/explore?domain=Hydrosphere" className="hover:text-white transition-colors">
                    Hydrosphere
                  </Link>
                </li>
                <li>
                  <Link to="/explore?domain=Cryosphere" className="hover:text-white transition-colors">
                    Cryosphere & Ice
                  </Link>
                </li>
                <li>
                  <Link to="/explore?domain=Atmosphere" className="hover:text-white transition-colors">
                    Atmospheric Aerosols
                  </Link>
                </li>
                <li>
                  <Link to="/explore?domain=Biosphere" className="hover:text-white transition-colors">
                    Biosphere & Forests
                  </Link>
                </li>
                <li>
                  <Link to="/explore?domain=Geosphere" className="hover:text-white transition-colors">
                    Geosphere & Deserts
                  </Link>
                </li>
              </ul>
            </div>

            {/* Scientific Partners */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-white font-semibold">
                Telemetry Sources
              </h4>
              <ul className="space-y-2.5 text-xs text-[#64748B] font-mono">
                <li className="flex items-center gap-1.5 text-[#94A3B8]">
                  <span>NASA Earth Science</span>
                </li>
                <li className="flex items-center gap-1.5 text-[#94A3B8]">
                  <span>ESA Copernicus / Sentinel</span>
                </li>
                <li className="flex items-center gap-1.5 text-[#94A3B8]">
                  <span>USGS Earth Resources (EROS)</span>
                </li>
                <li className="flex items-center gap-1.5 text-[#94A3B8]">
                  <span>JAXA Earth Observation</span>
                </li>
                <li className="flex items-center gap-1.5 text-[#94A3B8]">
                  <span>NOAA NESDIS Satellite Data</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#64748B]">
          <div className="flex items-center gap-3">
            <span>© {currentYear} ATLAS Earth Intelligence Platform.</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-[#94A3B8]">Open Access Data under CC BY 4.0</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#00D2B4]">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>ORBITAL RECEPTORS: 100% OPERATIONAL</span>
            </span>
            <span className="text-white">UTC: {new Date().toISOString().slice(0, 10)}</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
