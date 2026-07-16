const PHRASES = [
  'Music is not content',
  'Scenes, not algorithms',
  'Taste is infrastructure',
  'Artists get paid directly',
  'Community over engagement',
]

export default function Marquee({ reverse = false }: { reverse?: boolean }) {
  // Track holds two copies of the phrase list; the CSS animation slides it
  // -50% for a seamless loop.
  const row = (
    <>
      {PHRASES.map((p, i) => (
        <span key={i} className="flex items-center">
          <span className="whitespace-nowrap font-display text-2xl font-bold uppercase tracking-tight text-white/90 md:text-4xl">
            {p}
          </span>
          <span className="mx-6 text-white/30 md:mx-10" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </>
  )

  return (
    <div
      className="relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-5 md:py-7"
      aria-hidden="true"
    >
      <div className={`marquee-track ${reverse ? 'marquee-track-reverse' : ''}`}>
        <div className="flex">{row}</div>
        <div className="flex">{row}</div>
      </div>
    </div>
  )
}
