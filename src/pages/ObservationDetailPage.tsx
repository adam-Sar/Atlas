import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  OBSERVATIONS, 
  type Observation 
} from '@/data/mockData'
import { ComparisonSlider } from '@/components/visualizations/ComparisonSlider'
import { SpectralBandViewer } from '@/components/visualizations/SpectralBandViewer'
import { TimeSeriesChart } from '@/components/visualizations/TimeSeriesChart'
import { 
  ArrowLeft, 
  Radio, 
  Layers, 
  Compass, 
  Download, 
  Share2, 
  Check, 
  Calendar, 
  MapPin, 
  FileText,
  ChevronRight,
  TrendingDown,
  Info
} from 'lucide-react'
import { exportToCsv } from '@/lib/exportCsv'

export function ObservationDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [copiedCitation, setCopiedCitation] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState(false)

  // Find observation by slug or fallback to Aral Sea
  const observation = OBSERVATIONS.find(o => o.slug === slug) || OBSERVATIONS[0]

  // Related observations
  const relatedObservations = OBSERVATIONS.filter(o => o.id !== observation.id).slice(0, 3)

  // Copy bibtex citation
  const handleCopyCitation = () => {
    const citation = `@article{atlas_${observation.slug}_2026,
  title = {${observation.title}},
  journal = {ATLAS Earth Intelligence Platform},
  author = {ATLAS Remote Sensing Working Group},
  year = {2026},
  doi = {10.5281/zenodo.atlas.${observation.slug}}
}`
    navigator.clipboard.writeText(citation)
    setCopiedCitation(true)
    setTimeout(() => setCopiedCitation(false), 2500)
  }

  // Export full time-series CSV
  const handleExportFullData = () => {
    const headers = [
      'Year',
      'Surface_Water_Area_km2',
      'Water_Level_Elevation_m',
      'Surface_Temp_Anomaly_degC',
      'Uncertainty_Lower_Bound',
      'Uncertainty_Upper_Bound'
    ]
    const rows = observation.timeSeriesData.map(d => [
      d.year,
      d.primaryValue,
      d.secondaryValue,
      d.anomaly,
      d.uncertaintyLower,
      d.uncertaintyUpper
    ])
    exportToCsv(`${observation.slug}_observation_full_timeseries`, headers, rows)
    setDownloadSuccess(true)
    setTimeout(() => setDownloadSuccess(false), 2500)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-16">
      
      {/* ─────────────────────────────────────────────────────────────
          1. BREADCRUMBS & TELEMETRY HEADER
      ───────────────────────────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#64748B]">
          <Link to="/" className="hover:text-white transition-colors">
            Observatory
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to={`/explore?domain=${observation.domain}`} className="hover:text-white transition-colors">
            {observation.domain}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#00D2B4] font-medium truncate">
            {observation.title.split(':')[0]}
          </span>
        </div>

        {/* Title, Subtitle, & Telemetry Stamp */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[#181B22] border border-[#222630] text-xs font-mono text-[#00D2B4] font-semibold uppercase">
              {observation.domain} Case Study
            </span>
            <span className="text-xs font-mono text-[#64748B]">
              COORDINATES: <strong className="text-white">{observation.coordinates}</strong>
            </span>
            <span className="text-xs font-mono text-[#64748B]">
              RESOLUTION: <strong className="text-white">{observation.resolution}</strong>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-white tracking-tight leading-tight">
            {observation.title}
          </h1>

          <p className="text-base text-[#94A3B8] font-sans max-w-3xl leading-relaxed">
            {observation.subtitle}
          </p>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. FLAGSHIP INTERACTIVE BEFORE / AFTER SLIDER
      ───────────────────────────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-[#00D2B4]">
            <Layers className="w-4 h-4" />
            <span className="font-semibold uppercase tracking-wider">Multi-Decadal Satellite Retrospective</span>
          </div>
          <span className="text-[#64748B]">LANDSAT-5 TM (1989) vs LANDSAT-9 OLI-2 (2025)</span>
        </div>

        <ComparisonSlider
          beforeImage={observation.leadImage}
          afterImage={observation.secondaryImage || observation.leadImage}
          beforeLabel="1989 Landsat-5 TM Acquisition"
          afterLabel="2025 Landsat-9 OLI-2 Acquisition"
          beforeSub="Intact Northern & Southern Water Bodies"
          afterSub="Desiccated Basin & Aralkum Salt Sand Bed"
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. KEY ENVIRONMENTAL IMPACT METRICS
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {observation.impactMetrics.map((metric) => (
          <div
            key={metric.label}
            className="p-5 rounded-xl bg-[#111317] border border-[#222630] space-y-1.5"
          >
            <span className="text-xs font-mono text-[#64748B] block">
              {metric.label}
            </span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-white">
              {metric.value}
            </div>
            <div className="text-xs font-mono text-[#F97316]">
              {metric.change}
            </div>
          </div>
        ))}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. TIME-SERIES ENVIRONMENTAL ANOMALY CHART (Recharts)
      ───────────────────────────────────────────────────────────── */}
      <TimeSeriesChart
        title={`${observation.title.split(':')[0]} Anomaly & Surface Extent (1990–2025)`}
        subtitle="Synoptic time-series calibrated via MNDWI multi-spectral thresholding with 95% confidence intervals"
        data={observation.timeSeriesData}
        primaryName="Water Surface Area"
        primaryUnit="km²"
        secondaryName="Water Level Elevation"
        secondaryUnit="m a.s.l."
        anomalyUnit="°C"
      />

      {/* ─────────────────────────────────────────────────────────────
          5. MULTI-SPECTRAL SENSOR COMPOSITE VIEWER
      ───────────────────────────────────────────────────────────── */}
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-serif text-white tracking-tight">
            Multi-Spectral Radiometer Synthesis
          </h2>
          <p className="text-xs text-[#94A3B8] font-mono mt-1">
            Toggle sensor wavelengths to inspect vegetation vigor, surface moisture, mineral crusting, and thermal inertia.
          </p>
        </div>

        <SpectralBandViewer
          baseImage={observation.secondaryImage || observation.leadImage}
          bands={observation.spectralBands}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          6. EDITORIAL NARRATIVE & METHODOLOGY
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-6 border-t border-[#1C2027]">
        
        {/* Main Article Prose */}
        <div className="lg:col-span-8 space-y-10">
          {observation.narrativeSections.map((sec, idx) => (
            <div key={sec.title} className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#00D2B4]">
                <span>0{idx + 1}</span>
                <span>•</span>
                <span className="uppercase tracking-wider">PHYSICAL SYSTEM ANALYSIS</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-white tracking-tight">
                {sec.title}
              </h3>
              <p className="text-sm text-[#CBD5E1] font-sans leading-relaxed">
                {sec.content}
              </p>
            </div>
          ))}

          {/* Peer-Reviewed Methodology Box */}
          <div className="p-6 rounded-xl bg-[#0F1116] border border-[#222630] space-y-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-white font-bold">
              <Info className="w-4 h-4 text-[#00D2B4]" />
              <span>Scientific Remote Sensing Methodology</span>
            </div>
            <p className="text-[#94A3B8] leading-relaxed font-sans">
              Surface water extent was classified utilizing the Modified Normalized Difference Water Index (MNDWI) computed as (Green - SWIR) / (Green + SWIR). 
              Atmospheric correction was applied using the 6S radiative transfer code with aerosol optical depth constraints from AERONET ground stations.
            </p>
          </div>
        </div>

        {/* Sidebar: Citation, Sensor Specs, & Raw Download */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Download Raw Observation CSV Card */}
          <div className="p-5 rounded-xl bg-[#111317] border border-[#222630] space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Download className="w-4 h-4 text-[#00D2B4]" />
              <span>Export Raw Data</span>
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Download the synchronized 35-year tabular observation dataset including surface area, elevation, temperature anomalies, and sensor QA flags.
            </p>
            <button
              type="button"
              onClick={handleExportFullData}
              className="w-full py-2.5 rounded-lg bg-[#00D2B4] hover:bg-[#00E5C5] text-[#090A0C] text-xs font-mono font-bold tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,210,180,0.2)]"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>CSV File Exported!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Full CSV</span>
                </>
              )}
            </button>
          </div>

          {/* Sensor Platform Specifications */}
          <div className="p-5 rounded-xl bg-[#111317] border border-[#222630] space-y-3 text-xs font-mono">
            <span className="text-[#64748B] uppercase tracking-wider block">
              Sensor Constellation
            </span>
            <div className="space-y-2 text-[#CBD5E1]">
              <div className="flex justify-between border-b border-[#1C2027] pb-1.5">
                <span className="text-[#64748B]">Platform:</span>
                <span className="text-white text-right">{observation.platform.split('/')[0]}</span>
              </div>
              <div className="flex justify-between border-b border-[#1C2027] pb-1.5">
                <span className="text-[#64748B]">Sensors:</span>
                <span className="text-white text-right">{observation.sensors[0]}</span>
              </div>
              <div className="flex justify-between border-b border-[#1C2027] pb-1.5">
                <span className="text-[#64748B]">Temporal Span:</span>
                <span className="text-white text-right">{observation.temporalRange.split(' ')[0]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">License:</span>
                <span className="text-[#00D2B4]">CC BY 4.0 Open Data</span>
              </div>
            </div>
          </div>

          {/* Copy Citation */}
          <div className="p-5 rounded-xl bg-[#111317] border border-[#222630] space-y-3 text-xs font-mono">
            <span className="text-[#64748B] uppercase tracking-wider block">
              Academic Citation
            </span>
            <p className="text-[#94A3B8] text-[11px] font-sans">
              Cite this digital observation record in research publications:
            </p>
            <button
              type="button"
              onClick={handleCopyCitation}
              className="w-full py-2 rounded bg-[#161920] hover:bg-[#222630] border border-[#222630] text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              {copiedCitation ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#00D2B4]" />
                  <span className="text-[#00D2B4]">BibTeX Copied!</span>
                </>
              ) : (
                <>
                  <FileText className="w-3.5 h-3.5 text-[#00D2B4]" />
                  <span>Copy BibTeX Citation</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          7. RELATED OBSERVATIONS
      ───────────────────────────────────────────────────────────── */}
      <div className="space-y-6 pt-10 border-t border-[#1C2027]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-serif text-white tracking-tight">
              Related Environmental Observations
            </h2>
            <p className="text-xs text-[#94A3B8] font-mono mt-0.5">
              Explore adjacent planetary phenomena in cryospheric and hydrological systems.
            </p>
          </div>
          <Link
            to="/explore"
            className="text-xs font-mono text-[#00D2B4] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedObservations.map((obs) => (
            <Link
              key={obs.id}
              to={`/observation/${obs.slug}`}
              className="p-4 rounded-xl bg-[#111317] border border-[#222630] hover:border-[#2D3340] group transition-all space-y-3"
            >
              <div className="relative aspect-16/9 rounded-lg overflow-hidden bg-[#090A0C]">
                <img
                  src={obs.leadImage}
                  alt={obs.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#090A0C]/80 backdrop-blur-md text-[10px] font-mono text-[#00D2B4]">
                  {obs.domain}
                </div>
              </div>

              <h3 className="text-sm font-bold text-white group-hover:text-[#00D2B4] transition-colors leading-snug">
                {obs.title}
              </h3>

              <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">
                {obs.subtitle}
              </p>

              <div className="text-[10px] font-mono text-[#64748B] pt-1">
                {obs.coordinates}
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}
