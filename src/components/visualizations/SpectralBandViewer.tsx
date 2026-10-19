import { useState } from 'react'
import { Layers, Activity, Zap, Info, Sliders } from 'lucide-react'

interface SpectralBand {
  id: string
  name: string
  wavelength: string
  description: string
}

interface SpectralBandViewerProps {
  baseImage: string
  bands: SpectralBand[]
  className?: string
}

export function SpectralBandViewer({
  baseImage,
  bands,
  className = '',
}: SpectralBandViewerProps) {
  const [activeBandId, setActiveBandId] = useState<string>(bands[0]?.id || 'rgb')
  const [contrastBoost, setContrastBoost] = useState<number>(100)
  const [showMetadata, setShowMetadata] = useState<boolean>(true)

  const activeBand = bands.find(b => b.id === activeBandId) || bands[0]

  // Compute CSS filter styling simulating remote sensing channel enhancement
  const getFilterStyle = () => {
    switch (activeBandId) {
      case 'cir': // False Color Infrared: green becomes red, water becomes dark blue
        return {
          filter: `hue-rotate(200deg) saturate(160%) contrast(${contrastBoost}%)`,
        }
      case 'swir': // Shortwave Infrared: mineral differentiation, moisture
        return {
          filter: `sepia(60%) hue-rotate(160deg) contrast(${contrastBoost + 25}%) brightness(95%)`,
        }
      case 'thermal': // Thermal Infrared: heatmap gradient appearance
        return {
          filter: `invert(10%) contrast(${contrastBoost + 40}%) saturate(220%) hue-rotate(320deg)`,
        }
      case 'snow':
      case 'water':
        return {
          filter: `saturate(180%) hue-rotate(180deg) contrast(${contrastBoost + 20}%)`,
        }
      case 'mineral':
        return {
          filter: `sepia(70%) saturate(140%) contrast(${contrastBoost + 15}%)`,
        }
      default: // Natural RGB
        return {
          filter: `contrast(${contrastBoost}%)`,
        }
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Spectral Band Selector Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#00D2B4]" />
          <span className="text-[#94A3B8] uppercase tracking-wider">Multi-Spectral Radiometer Composite:</span>
        </div>

        {/* Contrast Adjuster Control */}
        <div className="flex items-center gap-3 bg-[#111317] border border-[#222630] rounded-lg px-3 py-1.5">
          <Sliders className="w-3.5 h-3.5 text-[#64748B]" />
          <span className="text-[#94A3B8]">Gain: {contrastBoost}%</span>
          <input
            type="range"
            min="80"
            max="150"
            value={contrastBoost}
            onChange={(e) => setContrastBoost(Number(e.target.value))}
            className="w-20 h-1 bg-[#222630] rounded-lg appearance-none cursor-pointer accent-[#00D2B4]"
            aria-label="Radiometric gain slider"
          />
        </div>
      </div>

      {/* Band Mode Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {bands.map((band) => {
          const isSelected = band.id === activeBandId
          return (
            <button
              key={band.id}
              type="button"
              onClick={() => setActiveBandId(band.id)}
              className={`text-left p-3 rounded-lg border transition-all duration-200 ${
                isSelected
                  ? 'bg-[#16191F] border-[#00D2B4] shadow-[0_0_15px_rgba(0,210,180,0.15)] ring-1 ring-[#00D2B4]'
                  : 'bg-[#111317] border-[#222630] hover:border-[#2D3340] hover:bg-[#14171D]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-mono font-bold ${isSelected ? 'text-[#00D2B4]' : 'text-white'}`}>
                  {band.name}
                </span>
                <span className="text-[10px] font-mono text-[#64748B]">
                  {band.wavelength}
                </span>
              </div>
              <p className="text-[11px] text-[#94A3B8] line-clamp-2 leading-relaxed">
                {band.description}
              </p>
            </button>
          )
        })}
      </div>

      {/* Main Image Frame with Spectral Emulation */}
      <div className="relative w-full aspect-16/9 rounded-xl overflow-hidden border border-[#222630] bg-[#07080A] shadow-2xl">
        <img
          src={baseImage}
          alt={activeBand.name}
          style={getFilterStyle()}
          className="w-full h-full object-cover transition-all duration-300"
        />

        {/* Live Channel HUD Overlay */}
        <div className="absolute top-4 left-4 bg-[#090A0C]/85 backdrop-blur-md border border-[#222630] rounded-lg p-3 text-xs font-mono shadow-xl max-w-sm">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-3.5 h-3.5 text-[#00D2B4]" />
            <span className="text-white font-bold tracking-wide uppercase">
              {activeBand.name}
            </span>
          </div>
          <div className="text-[11px] text-[#00D2B4] mb-1.5">
            WAVELENGTH: {activeBand.wavelength}
          </div>
          <p className="text-[11px] text-[#94A3B8] leading-relaxed">
            {activeBand.description}
          </p>
        </div>

        {/* Synthetic Calibration Grid Lines */}
        <div className="absolute inset-0 pointer-events-none bg-grid-subtle opacity-40" />

        {/* Sensor Coordinate Stamp Bottom */}
        <div className="absolute bottom-4 right-4 bg-[#090A0C]/80 backdrop-blur-md border border-[#222630] rounded-lg px-2.5 py-1 text-[10px] font-mono text-[#94A3B8]">
          CALIBRATED • BOA REFLECTANCE L2A
        </div>
      </div>
    </div>
  )
}
