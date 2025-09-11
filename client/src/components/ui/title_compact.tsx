interface TitleCompactProps {
  title?: string
  subtitle?: string
}

export default function TitleCompact({ title, subtitle }: TitleCompactProps) {
  return (
    <div className="text-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-1">{title}</h2>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  )
}
