import { useState, useRef, useCallback, useEffect } from 'react'
import { MoveHorizontal, Eye, Sliders, SplitSquareVertical } from 'lucide-react'

interface ComparisonSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
  beforeSub?: string
  afterSub?: string
  className?: string
}

export function ComparisonSlider({
  beforeImage,
  afterImage,
  beforeLabel = '1989 — LANDSAT-5 TM',
  afterLabel = '2025 — LANDSAT-9 OLI-2',
  beforeSub = 'Water Surface: 36,800 km²',
  afterSub = 'Water Surface: 7,100 km²',
  className = '',
}: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [viewMode, setViewMode] = useState<'slider' | 'side-by-side' | 'flip'>('slider')
  const [flipState, setFlipState] = useState<'before' | 'after'>('after')
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPosition(percent)
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return
    handleMove(e.touches[0].clientX)
  }, [isDragging, handleMove])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }, [isDragging, handleMove])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener('touchend', handleMouseUp)
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove])

  // Keyboard navigation for accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition(prev => Math.max(0, prev - 5))
    } else if (e.key === 'ArrowRight') {
      setSliderPosition(prev => Math.min(100, prev + 5))
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-[#64748B] uppercase tracking-wider">Temporal Lens:</span>
          <span className="text-white font-semibold">1989 ↔ 2025 Retrospective</span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-[#111317] border border-[#222630] rounded-lg p-1">
          <button
            type="button"
            onClick={() => setViewMode('slider')}
            className={`px-2.5 py-1 rounded text-xs transition-colors flex items-center gap-1.5 ${
              viewMode === 'slider' ? 'bg-[#222630] text-[#00D2B4] font-medium' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Split</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('side-by-side')}
            className={`px-2.5 py-1 rounded text-xs transition-colors flex items-center gap-1.5 ${
              viewMode === 'side-by-side' ? 'bg-[#222630] text-[#00D2B4] font-medium' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <SplitSquareVertical className="w-3.5 h-3.5" />
            <span>Dual Synoptic</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('flip')}
            className={`px-2.5 py-1 rounded text-xs transition-colors flex items-center gap-1.5 ${
              viewMode === 'flip' ? 'bg-[#222630] text-[#00D2B4] font-medium' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Toggle Flash</span>
          </button>
        </div>
      </div>

      {/* Main Visual Frame */}
      {viewMode === 'slider' && (
        <div
          ref={containerRef}
          role="slider"
          aria-label="Temporal change image slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(sliderPosition)}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
          className="relative w-full aspect-16/9 rounded-xl overflow-hidden cursor-ew-resize select-none border border-[#222630] bg-[#07080A] shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#00D2B4]"
        >
          {/* Base Layer: AFTER (Present) */}
          <img
            src={afterImage}
            alt={afterLabel}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlaid Clipped Layer: BEFORE (Historic) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={beforeImage}
              alt={beforeLabel}
              style={{
                width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                maxWidth: 'none',
              }}
              className="absolute inset-0 h-full object-cover"
            />
          </div>

          {/* Split Line & Handle */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.8)] z-20 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#111317] border-2 border-white shadow-xl flex items-center justify-center text-white">
              <MoveHorizontal className="w-4 h-4 text-[#00D2B4]" />
            </div>
          </div>

          {/* Metadata Badges Overlaid */}
          {/* Left / Before Label */}
          <div className="absolute top-4 left-4 z-10 pointer-events-none bg-[#090A0C]/85 backdrop-blur-md border border-[#222630] rounded-lg px-3 py-2 text-xs font-mono shadow-lg">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
              <span className="text-white font-bold">{beforeLabel}</span>
            </div>
            <div className="text-[11px] text-[#94A3B8] mt-0.5">{beforeSub}</div>
          </div>

          {/* Right / After Label */}
          <div className="absolute top-4 right-4 z-10 pointer-events-none bg-[#090A0C]/85 backdrop-blur-md border border-[#222630] rounded-lg px-3 py-2 text-xs font-mono shadow-lg text-right">
            <div className="flex items-center justify-end gap-2">
              <span className="text-white font-bold">{afterLabel}</span>
              <span className="w-2 h-2 rounded-full bg-[#F97316]" />
            </div>
            <div className="text-[11px] text-[#94A3B8] mt-0.5">{afterSub}</div>
          </div>

          {/* Position Indicator Badge */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none bg-[#090A0C]/80 backdrop-blur-md border border-[#222630] rounded-full px-3 py-1 text-[11px] font-mono text-[#00D2B4]">
            DIVIDER: {Math.round(sliderPosition)}% • DRAG TO REVEAL
          </div>
        </div>
      )}

      {/* Side-by-Side Mode */}
      {viewMode === 'side-by-side' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative aspect-16/9 rounded-xl overflow-hidden border border-[#222630] bg-[#07080A]">
            <img src={beforeImage} alt={beforeLabel} className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3 bg-[#090A0C]/85 backdrop-blur-md border border-[#222630] rounded-lg px-3 py-1.5 text-xs font-mono">
              <div className="text-white font-bold">{beforeLabel}</div>
              <div className="text-[10px] text-[#94A3B8]">{beforeSub}</div>
            </div>
          </div>
          <div className="relative aspect-16/9 rounded-xl overflow-hidden border border-[#222630] bg-[#07080A]">
            <img src={afterImage} alt={afterLabel} className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3 bg-[#090A0C]/85 backdrop-blur-md border border-[#222630] rounded-lg px-3 py-1.5 text-xs font-mono">
              <div className="text-white font-bold">{afterLabel}</div>
              <div className="text-[10px] text-[#94A3B8]">{afterSub}</div>
            </div>
          </div>
        </div>
      )}

      {/* Flip Flash Mode */}
      {viewMode === 'flip' && (
        <div className="relative w-full aspect-16/9 rounded-xl overflow-hidden border border-[#222630] bg-[#07080A]">
          <img
            src={flipState === 'before' ? beforeImage : afterImage}
            alt={flipState === 'before' ? beforeLabel : afterLabel}
            className="w-full h-full object-cover transition-opacity duration-200"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#090A0C]/90 backdrop-blur-md border border-[#222630] rounded-full p-1.5">
            <button
              type="button"
              onClick={() => setFlipState('before')}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                flipState === 'before' ? 'bg-[#0284C7] text-white font-bold' : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              1989 Baseline
            </button>
            <button
              type="button"
              onClick={() => setFlipState('after')}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                flipState === 'after' ? 'bg-[#F97316] text-white font-bold' : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              2025 Present
            </button>
          </div>
        </div>
      )}

      {/* Narrative Subtitle Footnote */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#64748B] font-mono gap-2 pt-1">
        <span>SENSOR: Orthorectified surface reflectance L2C data products</span>
        <span>ACCURACY: ±0.5 pixels coregistration error</span>
      </div>
    </div>
  )
}
