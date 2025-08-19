export function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h2>
      {subtitle && <p className="text-gray-600 mt-3 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}
