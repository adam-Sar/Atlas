import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { 
  Search, 
  Filter, 
  LayoutGrid, 
  Table as TableIcon, 
  Bookmark, 
  Download, 
  ArrowUpRight, 
  Sparkles, 
  Layers, 
  FileText, 
  Database,
  Calendar,
  Tag,
  Check,
  Eye,
  SlidersHorizontal,
  X
} from 'lucide-react'
import { DATASETS, type Dataset } from '@/data/mockData'
import { getBookmarks, toggleBookmark } from '@/lib/storage'
import { exportToCsv } from '@/lib/exportCsv'

export function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialDomain = searchParams.get('domain') || 'All'
  const filterParam = searchParams.get('filter')

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDomain, setSelectedDomain] = useState<string>(initialDomain)
  const [selectedFormat, setSelectedFormat] = useState<string>('All')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(getBookmarks())
  const [activeDatasetPreview, setActiveDatasetPreview] = useState<Dataset | null>(null)
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null)

  // Listen to bookmark changes
  const handleToggleBookmark = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    const updated = toggleBookmark(id)
    setBookmarkedIds([...updated])
  }

  // Handle Export sample CSV for a dataset
  const handleExportDatasetSample = (ds: Dataset, e?: React.MouseEvent) => {
    e?.stopPropagation()
    const headers = ['Timestamp', 'Observation_ID', 'Latitude', 'Longitude', 'Spectral_Gain', ds.primaryMetric.name, 'Sensor_Quality_Flag']
    const sampleRows = Array.from({ length: 15 }, (_, i) => [
      `2025-${String((i % 12) + 1).padStart(2, '0')}-15T10:30:00Z`,
      `ATLAS_${ds.id.toUpperCase()}_${1000 + i}`,
      (45.1234 + i * 0.05).toFixed(4),
      (59.5678 + i * 0.05).toFixed(4),
      '1.024',
      (parseFloat(ds.primaryMetric.latestValue.replace(/[^0-9.]/g, '')) * (0.95 + (i * 0.01))).toFixed(2),
      'PASSED_QA_LEVEL_3'
    ])
    exportToCsv(`${ds.slug}_sample_export`, headers, sampleRows)
    setDownloadSuccessId(ds.id)
    setTimeout(() => setDownloadSuccessId(null), 2500)
  }

  const domains = ['All', 'Hydrosphere', 'Cryosphere', 'Atmosphere', 'Biosphere', 'Geosphere', 'Anthroposphere']

  // Filter datasets
  const filteredDatasets = useMemo(() => {
    return DATASETS.filter((ds) => {
      // Domain filter
      if (selectedDomain !== 'All' && ds.domain !== selectedDomain) return false

      // Saved only filter
      if (filterParam === 'saved' && !bookmarkedIds.includes(ds.id)) return false

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchTitle = ds.title.toLowerCase().includes(query)
        const matchSummary = ds.summary.toLowerCase().includes(query)
        const matchPlatform = ds.platform.toLowerCase().includes(query)
        const matchTag = ds.tags.some(t => t.toLowerCase().includes(query))
        if (!matchTitle && !matchSummary && !matchPlatform && !matchTag) return false
      }

      return true
    })
  }, [selectedDomain, filterParam, bookmarkedIds, searchQuery])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
      
      {/* Page Header */}
      <div className="border-b border-[#1C2027] pb-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#00D2B4]">
          <Database className="w-4 h-4" />
          <span>DATA CATALOG & OPEN REGISTRY • KAGGLE-COMPLIANT METADATA SCHEMA</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
              Planetary Observation Datasets
            </h1>
            <p className="text-sm text-[#94A3B8] max-w-2xl mt-2 leading-relaxed">
              Standardized satellite telemetry products, reanalysis grids, and geophysical time-series 
              curated for environmental intelligence and computational climate research.
            </p>
          </div>

          {/* View Mode & Filter Summary */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-[#111317] border border-[#222630] rounded-lg p-1 text-xs font-mono">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded flex items-center gap-1.5 transition-colors ${
                  viewMode === 'grid' ? 'bg-[#222630] text-[#00D2B4]' : 'text-[#94A3B8] hover:text-white'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-2 rounded flex items-center gap-1.5 transition-colors ${
                  viewMode === 'table' ? 'bg-[#222630] text-[#00D2B4]' : 'text-[#94A3B8] hover:text-white'
                }`}
                title="Table View"
              >
                <TableIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Table</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Domain Filter Toolbar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search datasets, satellites, spectral bands, or tags..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#111317] border border-[#222630] focus:border-[#00D2B4] focus:ring-1 focus:ring-[#00D2B4] text-xs font-mono text-white placeholder-[#64748B] focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filter: Saved Items Pill */}
          <div className="flex items-center gap-2 self-start md:self-auto text-xs font-mono">
            <button
              type="button"
              onClick={() => {
                if (filterParam === 'saved') {
                  searchParams.delete('filter')
                } else {
                  searchParams.set('filter', 'saved')
                }
                setSearchParams(searchParams)
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-colors ${
                filterParam === 'saved'
                  ? 'bg-[#181B22] border-[#00D2B4] text-[#00D2B4]'
                  : 'bg-[#111317] border-[#222630] text-[#94A3B8] hover:text-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved Datasets ({bookmarkedIds.length})</span>
            </button>
          </div>

        </div>

        {/* Domain Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs font-mono">
          {domains.map((dom) => {
            const isSelected = selectedDomain === dom
            return (
              <button
                key={dom}
                type="button"
                onClick={() => {
                  setSelectedDomain(dom)
                  if (dom === 'All') {
                    searchParams.delete('domain')
                  } else {
                    searchParams.set('domain', dom)
                  }
                  setSearchParams(searchParams)
                }}
                className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#00D2B4] text-[#090A0C] font-semibold shadow-[0_0_12px_rgba(0,210,180,0.25)]'
                    : 'bg-[#111317] text-[#94A3B8] border border-[#222630] hover:text-white hover:border-[#2D3340]'
                }`}
              >
                {dom}
              </button>
            )
          })}
        </div>
      </div>

      {/* Dataset Result Count Indicator */}
      <div className="flex items-center justify-between text-xs font-mono text-[#64748B]">
        <span>Showing {filteredDatasets.length} of {DATASETS.length} datasets</span>
        {filterParam === 'saved' && (
          <span className="text-[#00D2B4]">Filtered to local bookmarks</span>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          GRID VIEW
      ───────────────────────────────────────────────────────────── */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDatasets.map((ds) => {
            const isBookmarked = bookmarkedIds.includes(ds.id)
            return (
              <div
                key={ds.id}
                onClick={() => setActiveDatasetPreview(ds)}
                className="p-5 rounded-xl bg-[#111317] border border-[#222630] hover:border-[#2D3340] hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 group cursor-pointer"
              >
                <div className="space-y-3">
                  
                  {/* Top Bar: Domain Badge & Bookmark Action */}
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-[#181B22] border border-[#222630] text-[#00D2B4] font-semibold">
                      {ds.domain}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleToggleBookmark(ds.id, e)}
                      className={`p-1.5 rounded hover:bg-[#222630] transition-colors ${
                        isBookmarked ? 'text-[#00D2B4]' : 'text-[#64748B] hover:text-white'
                      }`}
                      title={isBookmarked ? 'Remove bookmark' : 'Bookmark dataset'}
                    >
                      <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  {/* Thumbnail Image */}
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
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#090A0C]/80 backdrop-blur-md text-[10px] font-mono text-[#94A3B8]">
                      {ds.spatialResolution}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-white group-hover:text-[#00D2B4] transition-colors leading-snug">
                    {ds.title}
                  </h3>

                  <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed">
                    {ds.summary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {ds.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#161920] text-[#94A3B8] border border-[#1E222A]">
                        #{tag}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Footer Metadata & Actions */}
                <div className="pt-3 border-t border-[#1C2027] space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#64748B]">
                    <span>{ds.rowCount}</span>
                    <span>{ds.fileSize}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={(e) => handleExportDatasetSample(ds, e)}
                      className="flex-1 py-1.5 px-3 rounded bg-[#161920] hover:bg-[#222630] border border-[#222630] text-xs font-mono text-[#CBD5E1] hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                    >
                      {downloadSuccessId === ds.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#00D2B4]" />
                          <span className="text-[#00D2B4]">Downloaded!</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5 text-[#00D2B4]" />
                          <span>Sample CSV</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveDatasetPreview(ds)}
                      className="p-1.5 rounded bg-[#161920] hover:bg-[#222630] border border-[#222630] text-[#94A3B8] hover:text-white"
                      title="Quick Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            )
          })}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TABLE VIEW (Dense Research Grid)
      ───────────────────────────────────────────────────────────── */}
      {viewMode === 'table' && (
        <div className="rounded-xl border border-[#222630] bg-[#111317] overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#0D0F14] text-[#64748B] border-b border-[#1C2027] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Dataset Name</th>
                  <th className="py-3 px-4">Domain</th>
                  <th className="py-3 px-4">Sensor Platform</th>
                  <th className="py-3 px-4">Resolution</th>
                  <th className="py-3 px-4">Cadence</th>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Format</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C2027]">
                {filteredDatasets.map((ds) => {
                  const isBookmarked = bookmarkedIds.includes(ds.id)
                  return (
                    <tr 
                      key={ds.id} 
                      onClick={() => setActiveDatasetPreview(ds)}
                      className="hover:bg-[#161920] transition-colors cursor-pointer"
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-white hover:text-[#00D2B4] transition-colors">
                          {ds.title}
                        </div>
                        <div className="text-[10px] text-[#64748B] truncate max-w-xs">
                          {ds.summary}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-[#181B22] text-[#00D2B4] border border-[#222630]">
                          {ds.domain}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[#CBD5E1]">
                        {ds.platform}
                      </td>
                      <td className="py-3 px-4 text-[#94A3B8]">
                        {ds.spatialResolution}
                      </td>
                      <td className="py-3 px-4 text-[#94A3B8]">
                        {ds.updateCadence}
                      </td>
                      <td className="py-3 px-4 text-[#94A3B8]">
                        {ds.fileSize}
                      </td>
                      <td className="py-3 px-4 text-[#64748B]">
                        {ds.fileFormat.split(',')[0]}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={(e) => handleToggleBookmark(ds.id, e)}
                            className={`p-1.5 rounded hover:bg-[#222630] ${isBookmarked ? 'text-[#00D2B4]' : 'text-[#64748B]'}`}
                            title="Bookmark"
                          >
                            <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleExportDatasetSample(ds, e)}
                            className="p-1.5 rounded hover:bg-[#222630] text-[#00D2B4]"
                            title="Export Sample CSV"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty Search State */}
      {filteredDatasets.length === 0 && (
        <div className="py-16 text-center space-y-3 rounded-xl bg-[#111317] border border-[#222630]">
          <Database className="w-10 h-10 text-[#64748B] mx-auto" />
          <h3 className="text-base font-bold text-white">No Datasets Found</h3>
          <p className="text-xs font-mono text-[#94A3B8] max-w-sm mx-auto">
            No datasets matched your query "{searchQuery}". Try selecting "All" domains or resetting search parameters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('')
              setSelectedDomain('All')
              searchParams.delete('filter')
              setSearchParams(searchParams)
            }}
            className="px-4 py-2 rounded-lg bg-[#222630] text-xs font-mono text-[#00D2B4] hover:bg-[#2D3340]"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          DATASET PREVIEW MODAL / DRAWER
      ───────────────────────────────────────────────────────────── */}
      {activeDatasetPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#111317] border border-[#222630] p-6 sm:p-8 space-y-6 shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#181B22] text-[#00D2B4] border border-[#222630]">
                  {activeDatasetPreview.domain} • {activeDatasetPreview.platform}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {activeDatasetPreview.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveDatasetPreview(null)}
                className="p-1.5 rounded-lg bg-[#161920] border border-[#222630] text-[#94A3B8] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Preview */}
            <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-[#090A0C] border border-[#222630]">
              <img
                src={activeDatasetPreview.image}
                alt={activeDatasetPreview.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090A0C]/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-xs font-mono text-white">
                {activeDatasetPreview.spatialResolution} • {activeDatasetPreview.sensor}
              </div>
            </div>

            <p className="text-sm text-[#CBD5E1] leading-relaxed">
              {activeDatasetPreview.summary}
            </p>

            {/* Metadata Grid (Kaggle-style specs) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-[#090A0C] border border-[#1E222A]">
                <span className="text-[#64748B] block text-[10px]">COVERAGE</span>
                <span className="text-white mt-1 block truncate">{activeDatasetPreview.temporalCoverage.split(' to ')[0]}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#090A0C] border border-[#1E222A]">
                <span className="text-[#64748B] block text-[10px]">CADENCE</span>
                <span className="text-white mt-1 block">{activeDatasetPreview.updateCadence}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#090A0C] border border-[#1E222A]">
                <span className="text-[#64748B] block text-[10px]">SIZE / ROWS</span>
                <span className="text-white mt-1 block">{activeDatasetPreview.fileSize}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#090A0C] border border-[#1E222A]">
                <span className="text-[#64748B] block text-[10px]">LICENSE</span>
                <span className="text-white mt-1 block">{activeDatasetPreview.license.split(' ')[0]}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#1C2027]">
              <button
                type="button"
                onClick={(e) => handleToggleBookmark(activeDatasetPreview.id, e)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#161920] border border-[#222630] text-xs font-mono text-white hover:border-[#2D3340]"
              >
                <Bookmark className="w-4 h-4 text-[#00D2B4]" fill={bookmarkedIds.includes(activeDatasetPreview.id) ? 'currentColor' : 'none'} />
                <span>{bookmarkedIds.includes(activeDatasetPreview.id) ? 'Bookmarked' : 'Save for Later'}</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={(e) => handleExportDatasetSample(activeDatasetPreview, e)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#00D2B4] hover:bg-[#00E5C5] text-[#090A0C] text-xs font-mono font-bold tracking-wider"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Sample CSV (15 Rows)</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
