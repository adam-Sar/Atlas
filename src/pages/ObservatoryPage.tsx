import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  Globe, 
  Radio, 
  Layers, 
  Sparkles, 
  Database, 
  TrendingDown, 
  TrendingUp, 
  ShieldCheck, 
  Compass, 
  ExternalLink,
  ChevronRight,
  Activity,
  Calendar
} from 'lucide-react'
import { OBSERVATIONS, DATASETS, CLIMATE_SYSTEM_INDICATORS, RESEARCH_METRICS } from '@/data/mockData'
import { PlanetTelemetryGlobe } from '@/components/visualizations/PlanetTelemetryGlobe'
import { ComparisonSlider } from '@/components/visualizations/ComparisonSlider'

export function ObservatoryPage() {
  const [activeTab, setActiveTab] = useState<'hydrosphere' | 'cryosphere' | 'atmosphere'>('hydrosphere')

  const featuredObs = OBSERVATIONS.find(o => o.slug === 'aral-sea-desiccation') || OBSERVATIONS[0]
  const arcticObs = OBSERVATIONS.find(o => o.slug === 'lena-river-delta') || OBSERVATIONS[1]

  return (
    <div className="w-full flex flex-col space-y-24 sm:space-y-32">
      
      {/* ─────────────────────────────────────────────────────────────
          HERO SECTION — The Monumental Editorial Opening
      ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col justify-between pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Background ambient light */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-radial from-[#00D2B4]/10 via-[#0284C7]/5 to-transparent blur-3xl pointer-events-none" />

        {/* Top Telemetry Ticker */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1C2027] pb-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#00D2B4]">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>ORBITAL RECEPTOR ARRAY: ONLINE</span>
            </span>
            <span className="text-[#64748B]">•</span>
            <span className="text-[#94A3B8]">SENTINEL / LANDSAT / MODIS / GEDI</span>
          </div>
          <div className="flex items-center gap-4 text-[#94A3B8]">
            <span>CO₂: <strong className="text-white">426.8 PPM</strong></span>
            <span>TEMP ANOMALY: <strong className="text-[#F97316]">+1.48°C</strong></span>
            <span>EPOCH: <strong className="text-white">{new Date().toISOString().slice(0, 10)}</strong></span>
          </div>
        </div>

        {/* Monumental Headline & Narrative Opening */}
        <div className="my-auto py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111317] border border-[#222630] text-xs font-mono text-[#00D2B4]">
              <Sparkles className="w-3 h-3" />
              <span>PLANETARY EARTH OBSERVATION & ANALYTICS</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif tracking-tight text-white leading-[1.05]">
              The planet has a memory.
              <span className="block italic text-[#00D2B4] font-normal">
                We make it measurable.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl font-sans leading-relaxed">
              ATLAS synthesizes raw multispectral satellite telemetry, microwave altimetry, and cryospheric surveys 
              into high-fidelity scientific storytelling and analytical research workspaces for a rapidly shifting biosphere.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/explore"
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#00D2B4] hover:bg-[#00E5C5] text-[#090A0C] font-semibold text-sm tracking-wide transition-all shadow-[0_0_25px_rgba(0,210,180,0.3)] hover:shadow-[0_0_35px_rgba(0,210,180,0.5)]"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Open Datasets</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/observation/aral-sea-desiccation"
                className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#111317] hover:bg-[#161920] border border-[#222630] hover:border-[#2D3340] text-white font-medium text-sm transition-all"
              >
                <Layers className="w-4 h-4 text-[#00D2B4]" />
                <span>View Flagship Observation</span>
              </Link>
            </div>
          </div>

          {/* Right Hero Image Card: Lena Delta Arctic Channels */}
          <div className="lg:col-span-4 relative group">
            <div className="relative rounded-2xl overflow-hidden border border-[#222630] bg-[#111317] shadow-2xl transition-all duration-500 group-hover:border-[#00D2B4]/40">
              <img
                src="/assets/images/hero-delta.jpg"
                alt="Lena River Delta Permafrost Hydrology"
                className="w-full aspect-4/5 object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C] via-[#090A0C]/20 to-transparent" />
              
              {/* Bottom Stamp */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#090A0C]/85 backdrop-blur-md border border-[#222630] space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#00D2B4]">
                  <span>FEATURED SATELLITE ACQUISITION</span>
                  <span>72°29′N 126°50′E</span>
                </div>
                <div className="text-sm font-bold text-white font-sans">
                  Lena River Delta Fractal Permafrost
                </div>
                <div className="text-xs text-[#94A3B8] font-mono">
                  Laptev Sea, Arctic Ocean • 10m Multi-spectral
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Global Planetary Vital Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-6 border-t border-[#1C2027]">
          {CLIMATE_SYSTEM_INDICATORS.map((indicator) => (
            <div key={indicator.name} className="p-3 rounded-xl bg-[#111317]/60 border border-[#1C2027] space-y-1">
              <div className="text-[10px] font-mono text-[#64748B] truncate uppercase">
                {indicator.name}
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold font-mono text-white">
                  {indicator.value}
                </span>
                <span className="text-[10px] font-mono text-[#94A3B8]">
                  {indicator.unit.split(' ')[0]}
                </span>
              </div>
              <div className="text-[10px] font-mono text-[#F97316] flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>{indicator.deltaYear}</span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION: Interactive Global Hotspot Constellation
      ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <PlanetTelemetryGlobe />
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION: The Temporal Lens (Interactive Before / After Showcase)
      ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-8">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00D2B4] uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>Temporal Change Detection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
            Thirty-Five Years of Planetary Metamorphosis
          </h2>
          <p className="text-sm text-[#94A3B8] leading-relaxed">
            Drag the temporal divider to inspect the physical desiccation of the Aral Sea basin. 
            Over 59,000 km² of freshwater transformed into the hypersaline Aralkum desert.
          </p>
        </div>

        {/* Live Interactive Split Slider */}
        <ComparisonSlider
          beforeImage="/assets/images/aral-1990.jpg"
          afterImage="/assets/images/aral-present.jpg"
          beforeLabel="1989 Baseline (Landsat-5 TM)"
          afterLabel="2025 Present (Landsat-9 OLI-2)"
          beforeSub="Water Extent: 36,800 km² • Salinity 10 g/L"
          afterSub="Water Extent: 7,100 km² • Salinity >110 g/L"
        />

        <div className="pt-2 flex justify-end">
          <Link
            to="/observation/aral-sea-desiccation"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#00D2B4] hover:text-[#00E5C5] transition-colors"
          >
            <span>Read Complete 35-Year Aral Sea Telemetry Report</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION: Editorial Contrast Transition (Warm Paper Science Archive)
          Intentional contrast between light editorial and dark observatory
      ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#FAF8F5] text-[#191B1F] py-20 px-4 sm:px-6 lg:px-8 border-y border-[#E5E2D9]">
        <div className="max-w-7xl mx-auto space-y-14">
          
          {/* Editorial Section Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-[#E6E2D8] pb-8">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-mono tracking-widest uppercase text-[#0284C7] font-semibold">
                Section II • The Scientific Journal
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif tracking-tight text-[#111317]">
                Documenting physical tipping points with empirical remote sensing.
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm text-[#475569] leading-relaxed">
                Earth observation is no longer merely cartography. It is a real-time diagnostic system 
                measuring ice shelf calving, active taiga thermal plumes, and oceanic primary productivity.
              </p>
            </div>
          </div>

          {/* Three Editorial Story Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Story 1: Greenland Glacial Acceleration */}
            <div className="space-y-4 group">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-[#ECE8E0] border border-[#E0DCD3]">
                <img
                  src="/assets/images/glacier-fiord.jpg"
                  alt="Jakobshavn Glacial Discharge"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono font-bold text-[#0284C7]">
                  CRYOSPHERE • 69°10′N
                </div>
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-mono text-[#64748B]">Case Study 04</span>
                <h3 className="text-lg font-serif font-bold text-[#111317] group-hover:text-[#0284C7] transition-colors">
                  Jakobshavn Isbræ: Terminal Icefjord Disintegration
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Deep oceanic warm water intrusions destabilize the West Greenland grounding line, driving discharge rates past 38 gigatons annually.
                </p>
              </div>
              <Link
                to="/explore?domain=Cryosphere"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#0284C7]"
              >
                <span>Inspect Cryosphere Data</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Story 2: North Atlantic Chlorophyll Vortex */}
            <div className="space-y-4 group">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-[#ECE8E0] border border-[#E0DCD3]">
                <img
                  src="/assets/images/ocean-bloom.jpg"
                  alt="North Atlantic Chlorophyll Bloom"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono font-bold text-[#059669]">
                  HYDROSPHERE • 59°12′N
                </div>
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-mono text-[#64748B]">Case Study 05</span>
                <h3 className="text-lg font-serif font-bold text-[#111317] group-hover:text-[#059669] transition-colors">
                  Vernal Phytoplankton & Carbon Subduction
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Mesoscale ocean eddies trap and pump microscopic algae blooms into the deep marine carbon sink across thousands of nautical miles.
                </p>
              </div>
              <Link
                to="/explore?domain=Hydrosphere"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#059669]"
              >
                <span>Explore Marine Optics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Story 3: Boreal Taiga PyroCb */}
            <div className="space-y-4 group">
              <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-[#ECE8E0] border border-[#E0DCD3]">
                <img
                  src="/assets/images/wildfire-smoke.jpg"
                  alt="Western Boreal Pyrocumulonimbus"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono font-bold text-[#EA580C]">
                  ATMOSPHERE • 62°27′N
                </div>
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-mono text-[#64748B]">Case Study 06</span>
                <h3 className="text-lg font-serif font-bold text-[#111317] group-hover:text-[#EA580C] transition-colors">
                  Taiga Wildfires & Stratospheric Injections
                </h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Extreme convective updrafts loft black carbon past the tropopause, altering global radiation reflectivity and polar albedo balance.
                </p>
              </div>
              <Link
                to="/explore?domain=Atmosphere"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#EA580C]"
              >
                <span>Analyze Aerosol Datasets</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

          {/* Research Metrics Strip */}
          <div className="p-8 rounded-2xl bg-[#F0EDE5] border border-[#E2DED5] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <span className="text-3xl font-serif font-bold text-[#111317] block">
                {RESEARCH_METRICS.activeSatellitesTracked}
              </span>
              <span className="text-xs font-mono text-[#64748B] mt-1 block uppercase">
                Active Sensors Synchronized
              </span>
            </div>
            <div>
              <span className="text-3xl font-serif font-bold text-[#111317] block">
                {RESEARCH_METRICS.terabytesProcessedDaily} TB
              </span>
              <span className="text-xs font-mono text-[#64748B] mt-1 block uppercase">
                Daily Telemetry Processed
              </span>
            </div>
            <div>
              <span className="text-3xl font-serif font-bold text-[#111317] block">
                {RESEARCH_METRICS.curatedObservations}+
              </span>
              <span className="text-xs font-mono text-[#64748B] mt-1 block uppercase">
                Curated Physical Case Studies
              </span>
            </div>
            <div>
              <span className="text-3xl font-serif font-bold text-[#111317] block">
                100%
              </span>
              <span className="text-xs font-mono text-[#64748B] mt-1 block uppercase">
                Open Access Research Data
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION: Curated Open Data Showcase (Kaggle Meets Journal)
      ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-wider text-[#00D2B4] uppercase flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" />
              <span>Catalog Preview</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
              Featured Planetary Datasets
            </h2>
            <p className="text-sm text-[#94A3B8] max-w-xl">
              Ready-for-analysis satellite data products with standardized coordinates, temporal intervals, and open citations.
            </p>
          </div>

          <Link
            to="/explore"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#111317] border border-[#222630] hover:border-[#2D3340] text-xs font-mono text-white transition-colors"
          >
            <span>View All {DATASETS.length} Available Datasets</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#00D2B4]" />
          </Link>
        </div>

        {/* Dataset Grid Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DATASETS.slice(0, 6).map((ds) => (
            <div
              key={ds.id}
              className="p-5 rounded-xl bg-[#111317] border border-[#222630] hover:border-[#2D3340] transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-[#161920] border border-[#222630] text-[#00D2B4]">
                    {ds.domain}
                  </span>
                  <span className="text-[#64748B]">
                    {ds.spatialResolution}
                  </span>
                </div>

                <div className="relative aspect-16/9 rounded-lg overflow-hidden bg-[#090A0C]">
                  <img
                    src={ds.image}
                    alt={ds.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 text-[10px] font-mono text-[#CBD5E1]">
                    {ds.platform}
                  </div>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#00D2B4] transition-colors leading-snug">
                  {ds.title}
                </h3>

                <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">
                  {ds.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1C2027] flex items-center justify-between text-xs font-mono">
                <div className="text-[#64748B]">
                  {ds.rowCount}
                </div>
                <Link
                  to={`/explore?dataset=${ds.slug}`}
                  className="text-[#00D2B4] hover:underline flex items-center gap-1"
                >
                  <span>Inspect Data</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION: Call To Action & Research Workspace Invite
      ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative rounded-2xl bg-gradient-to-br from-[#111317] via-[#14171E] to-[#0D0F14] border border-[#222630] p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-[#00D2B4]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00D2B4] font-bold">
              Research Acceleration Studio
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
              Ready to analyze planetary datasets with native statistical tools?
            </h2>
            <p className="text-sm text-[#94A3B8] leading-relaxed">
              Open the ATLAS Research Workspace to construct multi-sensor charts, filter tabular observation records, 
              calculate thermal anomalies, and export research-ready CSV datasets directly to your local pipeline.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/workspace"
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#00D2B4] hover:bg-[#00E5C5] text-[#090A0C] font-semibold text-xs font-mono tracking-wider transition-all shadow-[0_0_20px_rgba(0,210,180,0.3)]"
              >
                <span>Launch Interactive Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/explore"
                className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#181B22] border border-[#222630] hover:border-[#2D3340] text-xs font-mono text-white transition-colors"
              >
                <span>Browse Metadata Catalog</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
