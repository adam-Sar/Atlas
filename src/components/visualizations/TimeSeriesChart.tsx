import { useState } from 'react'
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine,
} from 'recharts'
import { Download, Sliders, Calendar, TrendingDown, Info } from 'lucide-react'
import { exportToCsv } from '@/lib/exportCsv'

interface TimeSeriesPoint {
  year: number
  primaryValue: number
  secondaryValue: number
  anomaly: number
  uncertaintyLower: number
  uncertaintyUpper: number
}

interface TimeSeriesChartProps {
  title: string
  subtitle?: string
  data: TimeSeriesPoint[]
  primaryName?: string
  primaryUnit?: string
  secondaryName?: string
  secondaryUnit?: string
  anomalyUnit?: string
  className?: string
}

export function TimeSeriesChart({
  title,
  subtitle,
  data,
  primaryName = 'Surface Water Extent',
  primaryUnit = 'km²',
  secondaryName = 'Water Level Elevation',
  secondaryUnit = 'm a.s.l.',
  anomalyUnit = '°C',
  className = '',
}: TimeSeriesChartProps) {
  const [selectedRange, setSelectedRange] = useState<'all' | '2000' | '2010'>('all')
  const [showUncertainty, setShowUncertainty] = useState<boolean>(true)
  const [activeMetric, setActiveMetric] = useState<'both' | 'primary' | 'anomaly'>('both')

  // Filter data according to selected date range
  const filteredData = data.filter((item) => {
    if (selectedRange === '2000') return item.year >= 2000
    if (selectedRange === '2010') return item.year >= 2010
    return true
  })

  // Export CSV
  const handleExport = () => {
    const headers = ['Year', `${primaryName} (${primaryUnit})`, `${secondaryName} (${secondaryUnit})`, `Thermal Anomaly (${anomalyUnit})`, 'Uncertainty Lower', 'Uncertainty Upper']
    const rows = filteredData.map(d => [
      d.year,
      d.primaryValue,
      d.secondaryValue,
      d.anomaly,
      d.uncertaintyLower,
      d.uncertaintyUpper,
    ])
    exportToCsv(`${title.toLowerCase().replace(/\s+/g, '_')}_timeseries`, headers, rows)
  }

  return (
    <div className={`p-6 rounded-xl bg-[#111317] border border-[#222630] space-y-6 shadow-xl ${className}`}>
      
      {/* Chart Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#1C2027]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#00D2B4]" />
            <h3 className="text-base font-bold text-white tracking-wide font-sans">
              {title}
            </h3>
          </div>
          {subtitle && (
            <p className="text-xs text-[#94A3B8] font-mono">
              {subtitle}
            </p>
          )}
        </div>

        {/* Toolbar: Range, Metric, Confidence, CSV Export */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
          
          {/* Time Range Pills */}
          <div className="flex items-center bg-[#090A0C] border border-[#222630] rounded-lg p-0.5">
            <button
              type="button"
              onClick={() => setSelectedRange('all')}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedRange === 'all' ? 'bg-[#222630] text-[#00D2B4] font-semibold' : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              Full (1990–2025)
            </button>
            <button
              type="button"
              onClick={() => setSelectedRange('2000')}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedRange === '2000' ? 'bg-[#222630] text-[#00D2B4] font-semibold' : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              2000–2025
            </button>
            <button
              type="button"
              onClick={() => setSelectedRange('2010')}
              className={`px-2.5 py-1 rounded transition-colors ${
                selectedRange === '2010' ? 'bg-[#222630] text-[#00D2B4] font-semibold' : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              2010–2025
            </button>
          </div>

          {/* Uncertainty Toggle */}
          <button
            type="button"
            onClick={() => setShowUncertainty(!showUncertainty)}
            className={`px-3 py-1.5 rounded-lg border text-xs transition-colors flex items-center gap-1.5 ${
              showUncertainty
                ? 'bg-[#16191F] border-[#00D2B4]/60 text-[#00D2B4]'
                : 'bg-[#090A0C] border-[#222630] text-[#64748B] hover:text-white'
            }`}
          >
            <span>95% CI Ribbon</span>
          </button>

          {/* Export CSV Button */}
          <button
            type="button"
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#16191F] hover:bg-[#222630] border border-[#222630] hover:border-[#2D3340] text-white transition-colors"
            title="Download CSV"
          >
            <Download className="w-3.5 h-3.5 text-[#00D2B4]" />
            <span>Export CSV</span>
          </button>

        </div>
      </div>

      {/* Recharts Chart Frame */}
      <div className="w-full h-80 sm:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={filteredData} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
            <defs>
              {/* Uncertainty Area Gradient */}
              <linearGradient id="uncertaintyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0284C7" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#0284C7" stopOpacity={0.03} />
              </linearGradient>

              {/* Anomaly Bar Gradient */}
              <linearGradient id="anomalyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F97316" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#F97316" stopOpacity={0.2} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#1E222A" vertical={false} />

            {/* X Axis */}
            <XAxis
              dataKey="year"
              stroke="#64748B"
              tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'JetBrains Mono' }}
              tickLine={{ stroke: '#222630' }}
            />

            {/* Left Y Axis: Primary Metric */}
            <YAxis
              yAxisId="left"
              stroke="#64748B"
              tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'JetBrains Mono' }}
              tickLine={{ stroke: '#222630' }}
              tickFormatter={(v) => v.toLocaleString()}
              label={{
                value: `${primaryName} (${primaryUnit})`,
                angle: -90,
                position: 'insideLeft',
                fill: '#94A3B8',
                fontSize: 10,
                fontFamily: 'JetBrains Mono',
                dy: 40,
              }}
            />

            {/* Right Y Axis: Anomaly Metric */}
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#64748B"
              tick={{ fill: '#F97316', fontSize: 11, fontFamily: 'JetBrains Mono' }}
              tickLine={{ stroke: '#222630' }}
              tickFormatter={(v) => `${v > 0 ? '+' : ''}${v}${anomalyUnit}`}
              label={{
                value: `Anomaly (${anomalyUnit})`,
                angle: 90,
                position: 'insideRight',
                fill: '#F97316',
                fontSize: 10,
                fontFamily: 'JetBrains Mono',
                dy: -20,
              }}
            />

            <ReferenceLine yAxisId="right" y={0} stroke="#475569" strokeDasharray="2 2" />

            {/* Custom Tooltip */}
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const pData = payload[0].payload as TimeSeriesPoint
                  return (
                    <div className="bg-[#090A0C]/95 backdrop-blur-md border border-[#222630] rounded-lg p-3 text-xs font-mono shadow-2xl space-y-1.5 min-w-[200px]">
                      <div className="text-white font-bold pb-1 border-b border-[#1E222A] flex justify-between">
                        <span>EPOCH: {label}</span>
                        <span className="text-[#00D2B4]">SYNOPTIC L3</span>
                      </div>
                      <div className="flex justify-between items-center text-[#7DD3FC]">
                        <span>{primaryName}:</span>
                        <strong className="text-white">{pData.primaryValue.toLocaleString()} {primaryUnit}</strong>
                      </div>
                      <div className="flex justify-between items-center text-[#F97316]">
                        <span>Temp Anomaly:</span>
                        <strong className="text-white">{pData.anomaly > 0 ? '+' : ''}{pData.anomaly} {anomalyUnit}</strong>
                      </div>
                      {showUncertainty && (
                        <div className="flex justify-between items-center text-[#64748B] text-[10px] pt-1 border-t border-[#1E222A]">
                          <span>95% CI Range:</span>
                          <span>{pData.uncertaintyLower.toLocaleString()} – {pData.uncertaintyUpper.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  )
                }
                return null
              }}
            />

            {/* 95% Confidence Interval Band (Rendered as upper and lower bounds) */}
            {showUncertainty && (
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="uncertaintyUpper"
                stroke="none"
                fill="url(#uncertaintyGradient)"
                name="Confidence Interval"
              />
            )}

            {/* Primary Metric Line */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="primaryValue"
              stroke="#00D2B4"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#00D2B4', stroke: '#090A0C', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#00D2B4', stroke: '#FFFFFF', strokeWidth: 2 }}
              name={primaryName}
            />

            {/* Anomaly Bar on Right Axis */}
            <Bar
              yAxisId="right"
              dataKey="anomaly"
              fill="url(#anomalyGradient)"
              barSize={12}
              radius={[3, 3, 0, 0]}
              name={`Anomaly (${anomalyUnit})`}
            />

            <Legend
              wrapperStyle={{ paddingTop: '16px', fontSize: '11px', fontFamily: 'JetBrains Mono' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Scientific Footnote */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] font-mono text-[#64748B] pt-2 border-t border-[#1C2027]">
        <span>METHODOLOGY: Calibrated surface area derived via MNDWI index with Otsu thresholding</span>
        <span className="text-[#94A3B8]">UNCERTAINTY: ±1.8% sensor radiometric tolerance</span>
      </div>
    </div>
  )
}
