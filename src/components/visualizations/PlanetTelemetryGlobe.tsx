import { useState } from 'react'
import { Link } from 'react-router-dom'
import { OBSERVATIONS, type Observation } from '@/data/mockData'
import { Radio, Crosshair, ArrowRight, Compass, ShieldAlert, Sparkles } from 'lucide-react'

export function PlanetTelemetryGlobe() {
  const [selectedObs, setSelectedObs] = useState<Observation>(OBSERVATIONS[0])
  const [activeLayer, setActiveLayer] = useState<'optical' | 'thermal' | 'altimetry'>('optical')

  return (
    <div className="relative rounded-2xl bg-[#090A0C] border border-[#222630] overflow-hidden shadow-2xl p-6 sm:p-8">
      {/* Background orbital grid */}
      <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

      {/* Header telemetry strip */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1C2027]">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs font-mono text-[#00D2B4]">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>GLOBAL SYNOPTIC MONITORING • SUN-SYNCHRONOUS ORBIT 705 KM</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Planetary Sensor Constellation
          </h2>
        </div>

        {/* Layer Mode Switcher */}
        <div className="flex items-center gap-1 bg-[#111317] border border-[#222630] rounded-lg p-1 text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveLayer('optical')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeLayer === 'optical' ? 'bg-[#222630] text-[#00D2B4] font-semibold' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            Optical Multi-Spectral
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer('thermal')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeLayer === 'thermal' ? 'bg-[#222630] text-[#F97316] font-semibold' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            Thermal Radiance
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer('altimetry')}
            className={`px-3 py-1.5 rounded transition-colors ${
              activeLayer === 'altimetry' ? 'bg-[#222630] text-[#7DD3FC] font-semibold' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            Radar Altimetry
          </button>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-center">
        
        {/* Left: Planetary Graphic & Observation Hotspots */}
        <div className="lg:col-span-7 relative flex items-center justify-center p-4">
          
          {/* Stylized Orbital Globe Display */}
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-[#222630] bg-radial from-[#11141A] via-[#090A0C] to-[#040507] shadow-[0_0_80px_rgba(0,210,180,0.08)] flex items-center justify-center">
            
            {/* Orbital Rings */}
            <div className="absolute inset-2 rounded-full border border-[#222630]/60 border-dashed animate-[spin_120s_linear_infinite]" />
            <div className="absolute -inset-4 rounded-full border border-[#00D2B4]/15 transform -rotate-45" />
            <div className="absolute -inset-10 rounded-full border border-[#0284C7]/10 transform rotate-12" />

            {/* Center Planet Image with Smooth Fade */}
            <div className="relative w-64 h-64 sm:w-84 sm:h-84 rounded-full overflow-hidden shadow-inner border border-[#222630]">
              <img
                src={selectedObs.leadImage}
                alt={selectedObs.title}
                className="w-full h-full object-cover scale-110 transition-transform duration-700 hover:scale-125"
              />
              <div className="absolute inset-0 bg-radial from-transparent via-[#090A0C]/40 to-[#090A0C]/90 pointer-events-none" />
              <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />
            </div>

            {/* Target Reticle Crosshair */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 pointer-events-none border border-[#00D2B4]/40 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#00D2B4] shadow-[0_0_10px_#00D2B4]" />
            </div>

            {/* Floating Latitude / Longitude HUD */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#090A0C]/90 backdrop-blur-md border border-[#222630] rounded-full px-4 py-1 text-xs font-mono text-white flex items-center gap-2">
              <Crosshair className="w-3.5 h-3.5 text-[#00D2B4]" />
              <span>{selectedObs.coordinates}</span>
            </div>

          </div>

        </div>

        {/* Right: Selected Target Telemetry Card & Hotspot Switcher */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Target Observation Card */}
          <div className="p-6 rounded-xl bg-[#111317] border border-[#222630] space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold tracking-wider uppercase bg-[#181B22] text-[#00D2B4] border border-[#222630]">
                {selectedObs.domain}
              </span>
              <span className="text-xs font-mono text-[#64748B]">
                PLATFORM: {selectedObs.platform.split('/')[0]}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                {selectedObs.title}
              </h3>
              <p className="text-xs text-[#94A3B8] mt-1 font-mono">
                {selectedObs.region}
              </p>
            </div>

            <p className="text-xs text-[#CBD5E1] leading-relaxed line-clamp-3">
              {selectedObs.summary}
            </p>

            {/* Key Impact Stats */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {selectedObs.impactMetrics.slice(0, 2).map((m) => (
                <div key={m.label} className="p-2.5 rounded-lg bg-[#090A0C] border border-[#1E222A]">
                  <span className="text-[10px] font-mono text-[#64748B] block">{m.label}</span>
                  <span className="text-sm font-mono font-bold text-white mt-0.5 block">{m.value}</span>
                  <span className="text-[10px] font-mono text-[#F97316]">{m.change}</span>
                </div>
              ))}
            </div>

            {/* Detailed CTA */}
            <Link
              to={`/observation/${selectedObs.slug}`}
              className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#00D2B4] hover:bg-[#00E5C5] text-[#090A0C] font-semibold text-xs tracking-wider transition-all shadow-[0_0_15px_rgba(0,210,180,0.2)]"
            >
              <span>Examine Scientific Case Study</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Hotspot Target Switcher Pills */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] block">
              Active Focus Target Switcher:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {OBSERVATIONS.map((obs) => {
                const isCurrent = obs.id === selectedObs.id
                return (
                  <button
                    key={obs.id}
                    type="button"
                    onClick={() => setSelectedObs(obs)}
                    className={`text-left px-3 py-2 rounded-lg border text-xs font-mono transition-all ${
                      isCurrent
                        ? 'bg-[#181B22] border-[#00D2B4] text-white shadow-[0_0_10px_rgba(0,210,180,0.1)]'
                        : 'bg-[#111317] border-[#222630] text-[#94A3B8] hover:text-white hover:border-[#2D3340]'
                    }`}
                  >
                    <div className="font-semibold truncate">{obs.title.split(':')[0]}</div>
                    <div className="text-[10px] text-[#64748B] truncate">{obs.domain} • {obs.coordinates}</div>
                  </button>
                )
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
