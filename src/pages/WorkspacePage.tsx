import { useState, useMemo } from 'react'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ZAxis
} from 'recharts'
import { 
  DATASETS, 
  OBSERVATIONS, 
  type Dataset 
} from '@/data/mockData'
import { 
  Layers, 
  Sliders, 
  Download, 
  Table as TableIcon, 
  BarChart3, 
  ScatterChart as ScatterIcon, 
  RefreshCw, 
  Search, 
  Check, 
  Filter, 
  AlertTriangle, 
  Sparkles,
  Maximize2,
  ChevronDown,
  ChevronRight,
  Database,
  ArrowUpDown
} from 'lucide-react'
import { exportToCsv } from '@/lib/exportCsv'

interface WorkspaceTelemetryRow {
  id: string
  timestamp: string
  satellite: string
  region: string
  co2Ppm: number
  tempAnomaly: number
  iceMassAnomalyGt: number
  seaLevelDeltaMm: number
  ndviIndex: number
  qualityFlag: 'NOMINAL' | 'DEGRADED' | 'CALIBRATING'
}

export function WorkspacePage() {
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>(DATASETS[0].id)
  const [activeVizTab, setActiveVizTab] = useState<'trends' | 'correlation' | 'tabular'>('trends')
  const [searchQuery, setSearchQuery] = useState('')
  const [isSimulatingLiveStream, setIsSimulatingLiveStream] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState(false)
  const [sortField, setSortField] = useState<keyof WorkspaceTelemetryRow>('timestamp')
  const [sortAsc, setSortAsc] = useState(false)
  const [filterQuality, setFilterQuality] = useState<'ALL' | 'NOMINAL' | 'DEGRADED'>('ALL')
  const [currentPage, setCurrentPage] = useState(1)

  const selectedDataset = DATASETS.find(d => d.id === selectedDatasetId) || DATASETS[0]

  // Synthetic high-density observation time-series data
  const rawTableData: WorkspaceTelemetryRow[] = useMemo(() => {
    const satellites = ['Sentinel-2B', 'Landsat-9', 'Terra-MODIS', 'CryoSat-2', 'Aqua-AIRS', 'Suomi-NPP']
    const regions = ['Central Asia (Aral)', 'Greenland (Jakobshavn)', 'Arctic (Laptev)', 'North Atlantic', 'Amazon Basin', 'Arabian Peninsula']

    return Array.from({ length: 48 }, (_, i) => {
      const year = 2021 + Math.floor(i / 12)
      const month = String((i % 12) + 1).padStart(2, '0')
      const day = String((i % 28) + 1).padStart(2, '0')
      const baseCO2 = 415 + (i * 0.28)
      const baseTemp = 0.95 + (i * 0.018) + (Math.sin(i) * 0.25)
      const baseIce = -120 - (i * 2.1) + (Math.cos(i) * 15)
      const seaLevel = 3.2 + (i * 0.08)
      const ndvi = 0.62 + (Math.sin(i * 0.5) * 0.15)

      return {
        id: `OBS-ATL-${1000 + i}`,
        timestamp: `${year}-${month}-${day}T08:30:00Z`,
        satellite: satellites[i % satellites.length],
        region: regions[i % regions.length],
        co2Ppm: parseFloat(baseCO2.toFixed(1)),
        tempAnomaly: parseFloat(baseTemp.toFixed(2)),
        iceMassAnomalyGt: parseFloat(baseIce.toFixed(1)),
        seaLevelDeltaMm: parseFloat(seaLevel.toFixed(2)),
        ndviIndex: parseFloat(ndvi.toFixed(3)),
        qualityFlag: i % 11 === 0 ? 'DEGRADED' : i % 23 === 0 ? 'CALIBRATING' : 'NOMINAL'
      }
    })
  }, [])

  // Filter & Sort table data
  const processedTableData = useMemo(() => {
    let result = rawTableData

    if (filterQuality !== 'ALL') {
      result = result.filter(r => r.qualityFlag === filterQuality)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(r => 
        r.id.toLowerCase().includes(q) ||
        r.satellite.toLowerCase().includes(q) ||
        r.region.toLowerCase().includes(q)
      )
    }

    result = [...result].sort((a, b) => {
      const valA = a[sortField]
      const valB = b[sortField]
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortAsc ? valA - valB : valB - valA
      }
      return sortAsc 
        ? String(valA).localeCompare(String(valB)) 
        : String(valB).localeCompare(String(valA))
    })

    return result
  }, [rawTableData, filterQuality, searchQuery, sortField, sortAsc])

  // Pagination (10 per page)
  const pageSize = 10
  const totalPages = Math.ceil(processedTableData.length / pageSize)
  const paginatedData = processedTableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  // Toggle sorting
  const handleSort = (field: keyof WorkspaceTelemetryRow) => {
    if (sortField === field) {
      setSortAsc(!sortAsc)
    } else {
      setSortField(field)
      setSortAsc(false)
    }
  }

  // Export Table Data to CSV
  const handleExportWorkspaceData = () => {
    const headers = [
      'Record_ID',
      'UTC_Timestamp',
      'Satellite_Platform',
      'Region',
      'CO2_PPM',
      'Temperature_Anomaly_degC',
      'Cryosphere_Mass_Gt',
      'Sea_Level_Trend_mm',
      'NDVI_Vegetation_Index',
      'QA_Sensor_Quality'
    ]
    const rows = processedTableData.map(r => [
      r.id,
      r.timestamp,
      r.satellite,
      r.region,
      r.co2Ppm,
      r.tempAnomaly,
      r.iceMassAnomalyGt,
      r.seaLevelDeltaMm,
      r.ndviIndex,
      r.qualityFlag
    ])
    exportToCsv(`${selectedDataset.slug}_workspace_telemetry`, headers, rows)
    setDownloadSuccess(true)
    setTimeout(() => setDownloadSuccess(false), 2500)
  }

  // Simulated live feed pulse
  const handleTriggerTelemetrySync = () => {
    setIsSimulatingLiveStream(true)
    setTimeout(() => {
      setIsSimulatingLiveStream(false)
    }, 1200)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
      
      {/* ─────────────────────────────────────────────────────────────
          WORKSPACE HEADER & STATUS STRIP
      ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1C2027]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00D2B4]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>RESEARCH STUDIO • MULTI-SENSOR RECEPTOR CANVAS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Scientific Research Workspace
          </h1>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
          <button
            type="button"
            onClick={handleTriggerTelemetrySync}
            disabled={isSimulatingLiveStream}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#111317] border border-[#222630] hover:border-[#2D3340] text-[#CBD5E1] hover:text-white transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#00D2B4] ${isSimulatingLiveStream ? 'animate-spin' : ''}`} />
            <span>{isSimulatingLiveStream ? 'Synchronizing...' : 'Sync Telemetry'}</span>
          </button>

          <button
            type="button"
            onClick={handleExportWorkspaceData}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#00D2B4] hover:bg-[#00E5C5] text-[#090A0C] font-semibold transition-all shadow-[0_0_15px_rgba(0,210,180,0.2)]"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Exported!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Export Workspace CSV</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          MAIN WORKSPACE LAYOUT: SIDEBAR + CANVASES
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Sidebar: Dataset Selector & Layer Properties */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Active Dataset Selector */}
          <div className="p-4 rounded-xl bg-[#111317] border border-[#222630] space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#64748B] block">
              Active Sensor Feed:
            </span>
            <select
              value={selectedDatasetId}
              onChange={(e) => setSelectedDatasetId(e.target.value)}
              className="w-full p-2.5 rounded-lg bg-[#090A0C] border border-[#222630] text-xs font-mono text-white focus:border-[#00D2B4] focus:outline-none"
            >
              {DATASETS.map((ds) => (
                <option key={ds.id} value={ds.id}>
                  [{ds.domain}] {ds.title}
                </option>
              ))}
            </select>

            <div className="space-y-2 pt-2 border-t border-[#1C2027] text-xs font-mono text-[#94A3B8]">
              <div className="flex justify-between">
                <span>Platform:</span>
                <span className="text-white">{selectedDataset.platform}</span>
              </div>
              <div className="flex justify-between">
                <span>Sensor:</span>
                <span className="text-white">{selectedDataset.sensor}</span>
              </div>
              <div className="flex justify-between">
                <span>Resolution:</span>
                <span className="text-[#00D2B4]">{selectedDataset.spatialResolution}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Samples:</span>
                <span className="text-white">{selectedDataset.rowCount}</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="p-4 rounded-xl bg-[#111317] border border-[#222630] space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#64748B] block">
              Core Planetary Sensors:
            </span>
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded bg-[#090A0C] border border-[#1E222A] flex justify-between items-center">
                <span className="text-[#94A3B8]">Mauna Loa CO₂</span>
                <strong className="text-white font-bold">426.8 ppm</strong>
              </div>
              <div className="p-2.5 rounded bg-[#090A0C] border border-[#1E222A] flex justify-between items-center">
                <span className="text-[#94A3B8]">Global Temp Anomaly</span>
                <strong className="text-[#F97316] font-bold">+1.48°C</strong>
              </div>
              <div className="p-2.5 rounded bg-[#090A0C] border border-[#1E222A] flex justify-between items-center">
                <span className="text-[#94A3B8]">Antarctic Deficit</span>
                <strong className="text-[#7DD3FC] font-bold">-148 Gt/yr</strong>
              </div>
            </div>
          </div>

          {/* QA Quality Summary */}
          <div className="p-4 rounded-xl bg-[#111317] border border-[#222630] space-y-2 text-xs font-mono">
            <span className="text-[#64748B] uppercase tracking-wider block">
              Radiometric Validation Flag:
            </span>
            <div className="flex items-center gap-2 text-[#00D2B4]">
              <span className="w-2 h-2 rounded-full bg-[#00D2B4] animate-pulse" />
              <span>COREGISTRATION: 0.24px RMSE</span>
            </div>
            <p className="text-[11px] text-[#94A3B8] leading-relaxed">
              All pixel acquisitions verified against ESA SNAP level-2C surface reflectance specifications.
            </p>
          </div>

        </div>

        {/* Right Main Analytics Canvas */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Analysis View Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-1.5 rounded-xl bg-[#111317] border border-[#222630] text-xs font-mono">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveVizTab('trends')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-colors ${
                  activeVizTab === 'trends' ? 'bg-[#222630] text-[#00D2B4] font-semibold' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Multi-Variable Time-Series</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveVizTab('correlation')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-colors ${
                  activeVizTab === 'correlation' ? 'bg-[#222630] text-[#00D2B4] font-semibold' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                <ScatterIcon className="w-3.5 h-3.5" />
                <span>CO₂ vs Temp Correlation</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveVizTab('tabular')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-colors ${
                  activeVizTab === 'tabular' ? 'bg-[#222630] text-[#00D2B4] font-semibold' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Data Table ({processedTableData.length})</span>
              </button>
            </div>

            <span className="text-[11px] text-[#64748B] hidden sm:inline px-2">
              RECORDS: {rawTableData.length} EPOCHS
            </span>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              VIEW 1: MULTI-VARIABLE TIME-SERIES (Recharts)
          ───────────────────────────────────────────────────────────── */}
          {activeVizTab === 'trends' && (
            <div className="p-6 rounded-xl bg-[#111317] border border-[#222630] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white font-sans">
                    Multi-Sensor Planetary Trajectories (2021–2024)
                  </h3>
                  <p className="text-xs font-mono text-[#94A3B8]">
                    Simultaneous overlay of Atmospheric CO₂ (ppm) and Global Temperature Anomaly (°C)
                  </p>
                </div>
              </div>

              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={rawTableData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="co2Area" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00D2B4" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#00D2B4" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="tempArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#F97316" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E222A" vertical={false} />
                    <XAxis
                      dataKey="timestamp"
                      stroke="#64748B"
                      tick={{ fill: '#94A3B8', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                      tickFormatter={(v) => v.slice(2, 7)}
                    />
                    <YAxis
                      yAxisId="left"
                      stroke="#64748B"
                      domain={['auto', 'auto']}
                      tick={{ fill: '#00D2B4', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                      tickFormatter={(v) => `${v} ppm`}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#64748B"
                      domain={['auto', 'auto']}
                      tick={{ fill: '#F97316', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                      tickFormatter={(v) => `+${v}°C`}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload as WorkspaceTelemetryRow
                          return (
                            <div className="p-3 rounded-lg bg-[#090A0C]/95 border border-[#222630] text-xs font-mono space-y-1 shadow-xl">
                              <div className="text-white font-bold">{data.timestamp.slice(0, 10)}</div>
                              <div className="text-[#00D2B4]">CO₂: {data.co2Ppm} ppm</div>
                              <div className="text-[#F97316]">Temp Anomaly: +{data.tempAnomaly}°C</div>
                              <div className="text-[#7DD3FC]">Cryo Deficit: {data.iceMassAnomalyGt} Gt</div>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="co2Ppm"
                      stroke="#00D2B4"
                      strokeWidth={2}
                      fill="url(#co2Area)"
                      name="CO₂ Concentration (ppm)"
                    />
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="tempAnomaly"
                      stroke="#F97316"
                      strokeWidth={2}
                      fill="url(#tempArea)"
                      name="Temperature Anomaly (°C)"
                    />
                    <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'JetBrains Mono', paddingTop: 10 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              VIEW 2: CORRELATION SCATTER PLOT
          ───────────────────────────────────────────────────────────── */}
          {activeVizTab === 'correlation' && (
            <div className="p-6 rounded-xl bg-[#111317] border border-[#222630] space-y-4">
              <div>
                <h3 className="text-base font-bold text-white font-sans">
                  Bi-Variate Thermodynamic Correlation
                </h3>
                <p className="text-xs font-mono text-[#94A3B8]">
                  Scatter regression analysis: Atmospheric CO₂ concentration (X) vs Surface Temperature Anomaly (Y)
                </p>
              </div>

              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E222A" />
                    <XAxis
                      type="number"
                      dataKey="co2Ppm"
                      name="CO₂ PPM"
                      domain={['dataMin - 2', 'dataMax + 2']}
                      stroke="#64748B"
                      tick={{ fill: '#94A3B8', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                      tickFormatter={(v) => `${v} ppm`}
                    />
                    <YAxis
                      type="number"
                      dataKey="tempAnomaly"
                      name="Temp Anomaly"
                      domain={['dataMin - 0.2', 'dataMax + 0.2']}
                      stroke="#64748B"
                      tick={{ fill: '#F97316', fontSize: 10, fontFamily: 'JetBrains Mono' }}
                      tickFormatter={(v) => `+${v}°C`}
                    />
                    <Tooltip
                      cursor={{ strokeDasharray: '3 3' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload as WorkspaceTelemetryRow
                          return (
                            <div className="p-3 rounded-lg bg-[#090A0C]/95 border border-[#222630] text-xs font-mono space-y-1 shadow-xl">
                              <div className="text-white font-bold">{data.region}</div>
                              <div className="text-[#00D2B4]">CO₂: {data.co2Ppm} ppm</div>
                              <div className="text-[#F97316]">Temp: +{data.tempAnomaly}°C</div>
                              <div className="text-[#94A3B8]">NDVI: {data.ndviIndex}</div>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Scatter
                      name="Observations"
                      data={rawTableData}
                      fill="#00D2B4"
                      shape="circle"
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>

              <div className="p-3 rounded-lg bg-[#090A0C] border border-[#1E222A] flex justify-between text-xs font-mono text-[#94A3B8]">
                <span>PEARSON CORRELATION (r): <strong className="text-white">+0.892</strong></span>
                <span>p-VALUE: <strong className="text-[#00D2B4]">&lt; 0.0001</strong></span>
                <span>CONFIDENCE: <strong className="text-white">99.9%</strong></span>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              VIEW 3: TANSTACK-STYLE RESEARCH DATA TABLE
          ───────────────────────────────────────────────────────────── */}
          {activeVizTab === 'tabular' && (
            <div className="p-6 rounded-xl bg-[#111317] border border-[#222630] space-y-4">
              
              {/* Filter & Search Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#64748B]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setCurrentPage(1)
                    }}
                    placeholder="Filter records..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#090A0C] border border-[#222630] text-xs font-mono text-white placeholder-[#64748B] focus:border-[#00D2B4] focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-[#64748B]">QA Status:</span>
                  <select
                    value={filterQuality}
                    onChange={(e) => {
                      setFilterQuality(e.target.value as any)
                      setCurrentPage(1)
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-[#090A0C] border border-[#222630] text-white focus:outline-none"
                  >
                    <option value="ALL">All Quality</option>
                    <option value="NOMINAL">Nominal Only</option>
                    <option value="DEGRADED">Degraded Only</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="rounded-lg border border-[#222630] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-[#090A0C] text-[#64748B] border-b border-[#1C2027] uppercase">
                      <tr>
                        <th className="py-2.5 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('id')}>
                          <div className="flex items-center gap-1">
                            <span>ID</span>
                            <ArrowUpDown className="w-3 h-3" />
                          </div>
                        </th>
                        <th className="py-2.5 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('timestamp')}>
                          <div className="flex items-center gap-1">
                            <span>UTC Epoch</span>
                            <ArrowUpDown className="w-3 h-3" />
                          </div>
                        </th>
                        <th className="py-2.5 px-3">Satellite</th>
                        <th className="py-2.5 px-3">Region</th>
                        <th className="py-2.5 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('co2Ppm')}>
                          <div className="flex items-center gap-1">
                            <span>CO₂ (ppm)</span>
                            <ArrowUpDown className="w-3 h-3" />
                          </div>
                        </th>
                        <th className="py-2.5 px-3 cursor-pointer hover:text-white" onClick={() => handleSort('tempAnomaly')}>
                          <div className="flex items-center gap-1">
                            <span>Temp (°C)</span>
                            <ArrowUpDown className="w-3 h-3" />
                          </div>
                        </th>
                        <th className="py-2.5 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1C2027]">
                      {paginatedData.map((row) => (
                        <tr key={row.id} className="hover:bg-[#161920] transition-colors">
                          <td className="py-2 px-3 font-bold text-white">{row.id}</td>
                          <td className="py-2 px-3 text-[#CBD5E1]">{row.timestamp.slice(0, 10)}</td>
                          <td className="py-2 px-3 text-[#94A3B8]">{row.satellite}</td>
                          <td className="py-2 px-3 text-[#94A3B8] truncate max-w-[120px]">{row.region}</td>
                          <td className="py-2 px-3 text-[#00D2B4] font-semibold">{row.co2Ppm}</td>
                          <td className="py-2 px-3 text-[#F97316]">+{row.tempAnomaly}</td>
                          <td className="py-2 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] ${
                              row.qualityFlag === 'NOMINAL'
                                ? 'bg-[#00D2B4]/15 text-[#00D2B4] border border-[#00D2B4]/30'
                                : 'bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30'
                            }`}>
                              {row.qualityFlag}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between text-xs font-mono text-[#64748B] pt-2">
                <span>
                  Page {currentPage} of {totalPages || 1} ({processedTableData.length} records)
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="px-3 py-1 rounded bg-[#090A0C] border border-[#222630] disabled:opacity-40 hover:text-white"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className="px-3 py-1 rounded bg-[#090A0C] border border-[#222630] disabled:opacity-40 hover:text-white"
                  >
                    Next
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  )
}
