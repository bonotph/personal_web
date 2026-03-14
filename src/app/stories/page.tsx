'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import Image from 'next/image'

// ─── Photo data ───────────────────────────────────────────────────────────────

type Orientation = 'landscape' | 'portrait' | 'square'

interface Photo {
  id: number
  src: string
  alt: string
  title: string
  description: string
  location: string
  year: string
  orientation: Orientation
  tilt: number   // degrees, slight random tilt like a real hanging frame
  thread: number // thread length in px
}

const photos: Photo[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80',
    alt: 'Starry mountain night',
    title: 'Above the Clouds',
    description: 'There is a particular silence that only exists above 3,000 metres. The kind that presses against your ears and makes you feel like the last person alive.',
    location: 'Swiss Alps',
    year: '2025',
    orientation: 'landscape',
    tilt: -1.5,
    thread: 48,
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1554478731-4de7b3f17cfe?w=800&q=80',
    alt: 'Narrow street lanterns',
    title: 'Paper Lantern Alley',
    description: 'Every lantern was once blank paper. Someone chose the colour, lit the candle, and let it go. I found this street on a night when I was also a little lost.',
    location: 'Kyoto, Japan',
    year: '2024',
    orientation: 'portrait',
    tilt: 2.2,
    thread: 52,
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=1200&q=80',
    alt: 'Misty mountain valley',
    title: 'The Valley Breathes',
    description: 'The mist moves in the morning like something living. You stop walking and just watch it rearrange itself around the trees.',
    location: 'Zhangjiajie, China',
    year: '2024',
    orientation: 'landscape',
    tilt: 1.0,
    thread: 40,
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&q=80',
    alt: 'Old town colourful facades',
    title: 'Painted Histories',
    description: 'Each coat of paint hides the last one. Peel back enough and you find the whole century underneath. These walls have been repainted by every generation that walked past.',
    location: 'Lisbon, Portugal',
    year: '2025',
    orientation: 'portrait',
    tilt: -2.8,
    thread: 44,
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1000&q=80',
    alt: 'Lone lighthouse coast',
    title: 'Fixed Point',
    description: 'The lighthouse does not chase the ships. It stays exactly where it is and trusts that the light is enough. I think about that sometimes.',
    location: 'Cape Wrath, Scotland',
    year: '2025',
    orientation: 'square',
    tilt: 0.8,
    thread: 50,
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80',
    alt: 'Fjord reflections',
    title: 'Mirror Water',
    description: 'The surface was so still that up and down became suggestions rather than facts. I sat on the dock for an hour and stopped being able to tell which way the mountains went.',
    location: 'Nærøyfjord, Norway',
    year: '2024',
    orientation: 'landscape',
    tilt: -1.2,
    thread: 58,
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
    alt: 'City fog at dawn',
    title: 'Before the City Wakes',
    description: 'At 5am a city is still deciding whether to be itself. The scaffolding shows. The delivery trucks come and go. Something honest is briefly visible before the performance begins.',
    location: 'Hong Kong',
    year: '2026',
    orientation: 'portrait',
    tilt: 1.8,
    thread: 46,
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1000&q=80',
    alt: 'Field of poppies',
    title: 'Ordinary Red',
    description: 'The most extraordinary things insist on being common. Poppies grow in fields, unmaintained, without permission. They make no argument for their beauty. They simply are.',
    location: 'Provence, France',
    year: '2023',
    orientation: 'square',
    tilt: -0.5,
    thread: 42,
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1200&q=80',
    alt: 'Wildflower meadow',
    title: 'End of Summer',
    description: 'August has a specific quality of light — golden and slightly anxious, as if it knows September is close. Every wildflower meadow I have ever stood in felt like the last day of something.',
    location: 'Dolomites, Italy',
    year: '2023',
    orientation: 'landscape',
    tilt: 2.5,
    thread: 54,
  },
]

// ─── Dimensions by orientation ────────────────────────────────────────────────

const frameDims: Record<Orientation, { w: number; h: number; imgH: number }> = {
  landscape: { w: 300, h: 230, imgH: 180 },
  portrait:  { w: 195, h: 290, imgH: 240 },
  square:    { w: 240, h: 260, imgH: 210 },
}

// ─── Rope / thread SVG ────────────────────────────────────────────────────────

function Thread({ length, tilt }: { length: number; tilt: number }) {
  const sway = Math.abs(tilt) * 2
  return (
    <svg
      width="40"
      height={length}
      className="absolute left-1/2 -translate-x-1/2"
      style={{ top: -length }}
      viewBox={`0 0 40 ${length}`}
      fill="none"
    >
      <path
        d={`M 20 0 Q ${20 + sway} ${length / 2} 20 ${length}`}
        stroke="rgba(210,195,170,0.55)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Nail head */}
      <circle cx="20" cy="3" r="3" fill="rgba(180,165,140,0.7)" />
    </svg>
  )
}

// ─── Frame component ──────────────────────────────────────────────────────────

function Frame({ photo, onClick, index }: { photo: Photo; onClick: () => void; index: number }) {
  const dims = frameDims[photo.orientation]
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      className="relative cursor-pointer select-none"
      style={{
        width: dims.w,
        height: dims.h + photo.thread,
        paddingTop: photo.thread,
        rotate: photo.tilt,
      }}
      initial={{ opacity: 0, y: -60, rotate: photo.tilt - 3 }}
      animate={visible ? { opacity: 1, y: 0, rotate: photo.tilt } : {}}
      transition={{
        type: 'spring',
        stiffness: 80,
        damping: 14,
        delay: index * 0.08,
      }}
      whileHover={{
        rotate: photo.tilt * 0.3,
        scale: 1.04,
        zIndex: 10,
        transition: { type: 'spring', stiffness: 250, damping: 20 },
      }}
      onClick={onClick}
    >
      {/* Thread */}
      <Thread length={photo.thread} tilt={photo.tilt} />

      {/* Frame border */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: dims.h,
          background: 'linear-gradient(145deg, #2e2618, #1a150e)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.7), inset 0 0 0 3px rgba(255,240,200,0.08), 0 2px 8px rgba(0,0,0,0.5)',
          borderRadius: 2,
          padding: 10,
        }}
      >
        {/* Mat */}
        <div
          className="w-full h-full relative overflow-hidden"
          style={{
            background: '#f5f0e8',
            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.12)',
            padding: 6,
          }}
        >
          {/* Photo */}
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="320px"
              unoptimized
            />
            {/* Subtle vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.35) 100%)',
              }}
            />
          </div>
        </div>

        {/* Frame corner ornaments */}
        {(['tl','tr','bl','br'] as const).map(pos => (
          <div
            key={pos}
            className="absolute w-4 h-4 pointer-events-none"
            style={{
              top: pos.startsWith('t') ? 4 : 'auto',
              bottom: pos.startsWith('b') ? 4 : 'auto',
              left: pos.endsWith('l') ? 4 : 'auto',
              right: pos.endsWith('r') ? 4 : 'auto',
              borderTop: pos.startsWith('t') ? '1.5px solid rgba(255,240,180,0.25)' : 'none',
              borderBottom: pos.startsWith('b') ? '1.5px solid rgba(255,240,180,0.25)' : 'none',
              borderLeft: pos.endsWith('l') ? '1.5px solid rgba(255,240,180,0.25)' : 'none',
              borderRight: pos.endsWith('r') ? '1.5px solid rgba(255,240,180,0.25)' : 'none',
            }}
          />
        ))}

        {/* Hover shimmer */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Caption below frame */}
      <motion.p
        className="text-center font-mono text-[9px] tracking-[0.2em] uppercase mt-2 opacity-0 group-hover:opacity-100"
        style={{ color: 'rgba(200,185,160,0.5)', width: dims.w }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {photo.location}
      </motion.p>
    </motion.div>
  )
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({ photo, onClose }: { photo: Photo | null; onClose: () => void }) {
  useEffect(() => {
    if (!photo) return
    document.body.style.overflow = 'hidden'
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handler)
    }
  }, [photo, onClose])

  return (
    <AnimatePresence>
      {photo && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[200]"
            style={{ backgroundColor: 'rgba(5,4,3,0.97)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onClose}
          />

          {/* Content */}
          <motion.div
            className="fixed inset-0 z-[201] flex flex-col items-center justify-center px-6 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* Expanding frame */}
            <motion.div
              className="relative pointer-events-auto"
              style={{
                background: 'linear-gradient(145deg, #2e2618, #1a150e)',
                padding: 16,
                boxShadow: '0 40px 120px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,240,200,0.06)',
                borderRadius: 3,
                maxWidth: 'min(90vw, 860px)',
                width: '100%',
              }}
              initial={{ scale: 0.15, opacity: 0, rotate: photo.tilt * 2 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.15, opacity: 0, rotate: photo.tilt * 2 }}
              transition={{ type: 'spring', stiffness: 160, damping: 26 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Mat */}
              <div style={{ background: '#f5f0e8', padding: 10, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)' }}>
                {/* Image */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{
                    aspectRatio:
                      photo.orientation === 'portrait' ? '3/4' :
                      photo.orientation === 'square'   ? '1/1' : '4/3',
                    maxHeight: '60vh',
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="860px"
                    unoptimized
                    priority
                  />
                  {/* Vignette */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.3) 100%)' }}
                  />
                </div>
              </div>

              {/* Corner ornaments */}
              {(['tl','tr','bl','br'] as const).map(pos => (
                <div
                  key={pos}
                  className="absolute w-6 h-6 pointer-events-none"
                  style={{
                    top: pos.startsWith('t') ? 6 : 'auto',
                    bottom: pos.startsWith('b') ? 6 : 'auto',
                    left: pos.endsWith('l') ? 6 : 'auto',
                    right: pos.endsWith('r') ? 6 : 'auto',
                    borderTop: pos.startsWith('t') ? '2px solid rgba(255,240,180,0.3)' : 'none',
                    borderBottom: pos.startsWith('b') ? '2px solid rgba(255,240,180,0.3)' : 'none',
                    borderLeft: pos.endsWith('l') ? '2px solid rgba(255,240,180,0.3)' : 'none',
                    borderRight: pos.endsWith('r') ? '2px solid rgba(255,240,180,0.3)' : 'none',
                  }}
                />
              ))}
            </motion.div>

            {/* Caption block */}
            <motion.div
              className="pointer-events-auto mt-8 text-center max-w-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-px w-12" style={{ background: 'rgba(200,185,160,0.3)' }} />
                <span className="font-mono text-[10px] tracking-[0.35em] uppercase" style={{ color: 'rgba(200,185,160,0.5)' }}>
                  {photo.location} · {photo.year}
                </span>
                <div className="h-px w-12" style={{ background: 'rgba(200,185,160,0.3)' }} />
              </div>

              <h2
                className="text-2xl md:text-3xl font-serif mb-4 leading-tight"
                style={{ color: '#e8dcc8' }}
              >
                {photo.title}
              </h2>

              <p
                className="text-sm leading-relaxed"
                style={{ color: 'rgba(200,185,160,0.65)', fontFamily: 'Georgia, serif' }}
              >
                {photo.description}
              </p>

              <motion.button
                className="mt-8 font-mono text-[10px] tracking-[0.3em] uppercase"
                style={{ color: 'rgba(200,185,160,0.35)' }}
                whileHover={{ color: 'rgba(200,185,160,0.8)', letterSpacing: '0.4em' }}
                transition={{ duration: 0.2 }}
                onClick={onClose}
              >
                ✕ &nbsp; Close
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Wall texture + ambient dust ─────────────────────────────────────────────

function WallDust() {
  const dots = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: `${(i * 41 + 13) % 98}%`,
    y: `${(i * 67 + 5) % 96}%`,
    size: (i % 4) * 0.5 + 0.5,
    delay: (i % 7) * 0.4,
  }))
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {dots.map(d => (
        <motion.div
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: d.x, top: d.y,
            width: d.size, height: d.size,
            backgroundColor: 'rgba(220,200,170,0.15)',
          }}
          animate={{ opacity: [0.2, 0.6, 0.2], y: [0, -8, 0] }}
          transition={{ duration: 5 + d.delay, repeat: Infinity, delay: d.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StoriesPage() {
  const [active, setActive] = useState<Photo | null>(null)
  const wallRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: wallRef })
  const dustOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 0.8, 0.4])

  // Layout: two rows with organic placement
  const row1 = photos.slice(0, 5)
  const row2 = photos.slice(5)

  // Per-row vertical offsets to give an organic hanging feel
  const row1Offsets = [20, 60, 10, 80, 40]
  const row2Offsets = [50, 15, 70, 30, 55]

  return (
    <div
      ref={wallRef}
      className="relative min-h-screen overflow-x-hidden"
      style={{
        // Rich dark wall — warm almost-black with subtle texture
        background: 'radial-gradient(ellipse at 30% 40%, #1a1410 0%, #0e0c09 60%, #080604 100%)',
      }}
    >
      {/* Wall grain texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px',
          opacity: 0.6,
        }}
      />

      {/* Subtle warm vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* Ambient dust */}
      <WallDust />

      {/* Wall spotlight — warm single source from top */}
      <motion.div
        className="fixed pointer-events-none z-0"
        style={{
          top: -200,
          left: '35%',
          width: 800,
          height: 800,
          background: 'radial-gradient(circle, rgba(255,220,140,0.07) 0%, transparent 70%)',
          opacity: dustOpacity,
        }}
      />

      

      {/* ── Gallery wall ── */}
      <div className="relative z-10 px-10 md:px-16 pb-32 space-y-0">

        {/* Wainscoting rail line */}
        <motion.div
          className="w-full h-px mb-2"
          style={{ background: 'linear-gradient(to right, transparent, rgba(200,180,140,0.12), transparent)' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
        />

        {/* Row 1 */}
        <div className="flex items-start justify-center gap-8 md:gap-14 flex-wrap pt-16">
          {row1.map((photo, i) => (
            <div
              key={photo.id}
              style={{ marginTop: row1Offsets[i] ?? 0 }}
            >
              <Frame photo={photo} index={i} onClick={() => setActive(photo)} />
            </div>
          ))}
        </div>

        {/* Subtle divider rail between rows */}
        <motion.div
          className="w-full h-px my-6"
          style={{ background: 'linear-gradient(to right, transparent, rgba(200,180,140,0.07), transparent)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        {/* Row 2 */}
        <div className="flex items-start justify-center gap-8 md:gap-14 flex-wrap pt-8">
          {row2.map((photo, i) => (
            <div
              key={photo.id}
              style={{ marginTop: row2Offsets[i] ?? 0 }}
            >
              <Frame photo={photo} index={i + 5} onClick={() => setActive(photo)} />
            </div>
          ))}
        </div>

        {/* Floor shadow */}
        <div
          className="w-full mt-24 h-16 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))',
          }}
        />
      </div>

      {/* ── Lightbox ── */}
      <Lightbox photo={active} onClose={() => setActive(null)} />
    </div>
  )
}