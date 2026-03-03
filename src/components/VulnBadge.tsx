interface Vulns {
  critical: number
  high: number
  medium: number
  low: number
}

const colors = {
  critical: 'bg-red-500/90 text-white',
  high: 'bg-orange-500/90 text-white',
  medium: 'bg-amber-500/90 text-white',
  low: 'bg-green-500/90 text-white',
}

export default function VulnBadges({ vulns }: { vulns: Vulns }) {
  const items = [
    { key: 'critical' as const, val: vulns.critical },
    { key: 'high' as const, val: vulns.high },
    { key: 'medium' as const, val: vulns.medium },
    { key: 'low' as const, val: vulns.low },
  ].filter((x) => x.val > 0)

  return (
    <div className="flex flex-wrap gap-1">
      {items.map(({ key, val }) => (
        <span key={key} className={`px-2 py-0.5 rounded text-xs font-medium ${colors[key]}`}>
          {val}
        </span>
      ))}
    </div>
  )
}
