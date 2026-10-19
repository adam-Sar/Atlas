export function exportToCsv(filename: string, headers: string[], rows: (string | number)[][]) {
  const csvContent = [
    '# ATLAS Earth Intelligence Platform - Scientific Data Export',
    `# Generated at: ${new Date().toISOString()}`,
    '# License: Creative Commons Attribution 4.0 International (CC BY 4.0)',
    '# Notice: Curated for research and scientific visualization',
    '',
    headers.map(h => `"${h.replace(/"/g, '""')}"`).join(','),
    ...rows.map(row =>
      row.map(cell => (typeof cell === 'string' ? `"${cell.replace(/"/g, '""')}"` : cell)).join(',')
    )
  ].join('\r\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `${filename.toLowerCase().replace(/[^a-z0-9_-]/g, '_')}_${Date.now()}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
