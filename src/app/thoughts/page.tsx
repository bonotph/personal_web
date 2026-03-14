'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react'

// ─── Data ────────────────────────────────────────────────────────────────────

const posts = [
  {
    id: 1,
    date: 'Feb 2026',
    tag: 'on learning',
    title: 'The Art of Being Confused',
    excerpt:
      'Confusion is not a sign of failure. It is the exact sensation of your brain rewiring itself — a necessary growing pain that most people mistake for incompetence.',
    body: `I used to apologize for not understanding things immediately. A professor would explain something and I'd nod along, pretending the fog had cleared when it hadn't. I thought clarity was supposed to arrive like a light switch. It doesn't. It seeps in — first at the edges, then slowly flooding the middle.

The best things I've ever learned came wrapped in weeks of genuine bewilderment. Algorithms that felt like magic until suddenly they felt like breathing. Mathematics that seemed like a foreign language until I caught myself dreaming in its notation.

Sit with confusion. Let it be uncomfortable. That discomfort is the sound of growth.`,
    color: '#c9b8a8',
    accent: '#8b7355',
  },
  {
    id: 2,
    date: 'Jan 2026',
    tag: 'on time',
    title: 'Third Year Moves Like Water',
    excerpt:
      'Somewhere between the deadlines and the late-night debugging sessions, I forgot to notice how fast it was all going. Time in university does not walk — it sprints.',
    body: `First year felt eternal. Every lecture was new, every friendship was being invented, every late night felt like a scene from a coming-of-age film. Then something shifted.

Third year arrives not with fanfare but with a quiet, relentless acceleration. Suddenly the assignments are heavier but somehow faster. The friendships are deeper but the hangouts are rarer. You start doing the math — semesters left, months left — and the numbers are smaller than you expected.

I am trying to be more present. To notice the unremarkable Tuesday evenings that will one day feel irreplaceable.`,
    color: '#b8c4c8',
    accent: '#4a6fa5',
  },
  {
    id: 3,
    date: 'Dec 2025',
    tag: 'on building',
    title: 'Why I Build Things Nobody Asked For',
    excerpt:
      'Every side project starts as a question: what if? It rarely ends with something useful. But the useless ones teach the most.',
    body: `I have built a CLI tool that generates haikus from git commit messages. A browser extension that replaces every corporate buzzword with a confused emoji. A script that texts me the weather using only Victorian-era vocabulary.

None of these have users. None of them ever will. But each one taught me something real — about APIs, about parsing, about the strange joy of making a computer do something slightly ridiculous.

The best reason to build something is because the idea amuses you. The market can wait.`,
    color: '#c8b8c4',
    accent: '#7a4a6f',
  },
  {
    id: 4,
    date: 'Nov 2025',
    tag: 'on cities',
    title: 'Hong Kong at 2am Is a Different City',
    excerpt:
      'The best version of any city only reveals itself to those willing to stay up past its performance.',
    body: `Daytime Hong Kong is efficient, vertical, relentless. Everyone is going somewhere with purpose. The trams run, the escalators climb, the neon competes.

But at 2am the performance ends. The streets belong to the delivery riders and the stray cats and the people who could not sleep. The harbour reflects the city back at itself and the whole thing feels suddenly quiet, like a question mark instead of an exclamation.

I have done my best thinking at 2am on the waterfront with a convenience store coffee going cold in my hand.`,
    color: '#b8c8b8',
    accent: '#3d6b4a',
  },
  {
    id: 5,
    date: 'Oct 2025',
    tag: 'on reading',
    title: 'Books I Pretended to Finish',
    excerpt:
      'There is an entire genre of books I have "read" in the sense that I own them, started them, and can confidently discuss the first forty pages.',
    body: `My bookshelf is an archaeological site. The books at the front are recent, optimistic. The ones in the back are covered in a fine layer of ambition.

Infinite Jest. Ulysses. The Brothers Karamazov. Godel, Escher, Bach. All started. All bookmarked somewhere around page sixty. All capable of making me feel vaguely ashamed when I see them.

But here is what I have decided: there is no shame in finding out a book is not for you right now. Timing matters. Some books require a version of yourself that does not exist yet. Go back to them later. Or do not. The important thing is to keep reading something.`,
    color: '#c8c4b8',
    accent: '#7a6b3d',
  },
]

// ─── Floating particle ───────────────────────────────────────────────────────

function Particle({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, backgroundColor: 'rgba(168,174,187,0.12)' }}
      animate={{ y: [0, -30, 0], opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

// ─── Typewriter hook ─────────────────────────────────────────────────────────

function useTypewriter(text: string, speed = 45) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) { clearInterval(interval); setDone(true) }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])
  return { displayed, done }
}

// ─── Post card ───────────────────────────────────────────────────────────────

function PostCard({ post, index, onClick }: { post: typeof posts[0]; index: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -60 : 60, y: 20 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative cursor-pointer"
      onClick={onClick}
    >
      {/* Index number — decorative */}
      <motion.span
        className="absolute -top-6 font-mono text-[10px] tracking-[0.3em] select-none"
        style={{ color: post.accent, left: isEven ? 0 : 'auto', right: isEven ? 'auto' : 0 }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.6 } : {}}
        transition={{ delay: 0.4 }}
      >
        0{index + 1}
      </motion.span>

      <motion.div
        className="relative overflow-hidden border"
        style={{
          borderColor: 'rgba(168,174,187,0.1)',
          backgroundColor: 'rgba(255,255,255,0.015)',
        }}
        whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: post.accent + '40' }}
        transition={{ duration: 0.3 }}
      >
        {/* Hover glow line */}
        <motion.div
          className="absolute top-0 left-0 h-[2px] w-full origin-left"
          style={{ backgroundColor: post.accent }}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.4 }}
        />

        <div className="p-8 md:p-10">
          <div className="flex items-start justify-between gap-4 mb-6">
            <span
              className="text-[10px] tracking-[0.25em] uppercase font-mono px-3 py-1 rounded-full border"
              style={{ color: post.accent, borderColor: post.accent + '40', backgroundColor: post.accent + '10' }}
            >
              {post.tag}
            </span>
            <span className="text-[11px] font-mono tracking-widest" style={{ color: 'rgba(168,174,187,0.4)' }}>
              {post.date}
            </span>
          </div>

          <motion.h2
            className="text-2xl md:text-3xl font-serif leading-tight mb-4"
            style={{ color: post.color }}
            whileHover={{ color: '#e6e8ed' }}
            transition={{ duration: 0.2 }}
          >
            {post.title}
          </motion.h2>

          <p className="text-sm leading-relaxed" style={{ color: 'rgba(168,174,187,0.65)', fontFamily: 'Georgia, serif' }}>
            {post.excerpt}
          </p>

          <motion.div
            className="flex items-center gap-2 mt-6 text-[11px] tracking-[0.15em] uppercase font-mono"
            style={{ color: post.accent }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <span>Read</span>
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}>
              →
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Post modal ──────────────────────────────────────────────────────────────

function PostModal({ post, onClose }: { post: typeof posts[0] | null; onClose: () => void }) {
  const { displayed, done } = useTypewriter(post?.title ?? '', 35)

  useEffect(() => {
    if (post) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [post])

  return (
    <AnimatePresence>
      {post && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100]"
            style={{ backgroundColor: 'rgba(10,12,15,0.88)', backdropFilter: 'blur(12px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Slide-in panel */}
          <motion.div
            className="fixed inset-y-0 right-0 z-[101] w-full max-w-2xl overflow-y-auto"
            style={{ backgroundColor: '#0c0f14', borderLeft: `1px solid ${post.accent}35` }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
          >
            {/* Top accent bar */}
            <motion.div
              className="h-[3px] w-full"
              style={{ backgroundColor: post.accent }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />

            <div className="px-10 py-12">
              {/* Close */}
              <motion.button
                className="mb-10 flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase font-mono"
                style={{ color: 'rgba(168,174,187,0.4)' }}
                whileHover={{ color: '#e6e8ed', x: -4 }}
                transition={{ duration: 0.2 }}
                onClick={onClose}
              >
                ← Close
              </motion.button>

              {/* Tag + date */}
              <div className="flex items-center gap-4 mb-8">
                <span
                  className="text-[10px] tracking-[0.25em] uppercase font-mono px-3 py-1 rounded-full border"
                  style={{ color: post.accent, borderColor: post.accent + '40', backgroundColor: post.accent + '10' }}
                >
                  {post.tag}
                </span>
                <span className="text-[11px] font-mono tracking-widest" style={{ color: 'rgba(168,174,187,0.35)' }}>
                  {post.date}
                </span>
              </div>

              {/* Typewriter title */}
              <h1 className="text-3xl md:text-4xl font-serif leading-tight mb-2" style={{ color: post.color, minHeight: '3rem' }}>
                {displayed}
                {!done && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                    style={{ color: post.accent }}
                  >
                    |
                  </motion.span>
                )}
              </h1>

              {/* Divider */}
              <motion.div
                className="h-px my-8"
                style={{ backgroundColor: post.accent + '30' }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />

              {/* Body paragraphs */}
              <div className="space-y-6">
                {post.body.split('\n\n').map((para, i) => (
                  <motion.p
                    key={i}
                    className="text-base leading-[1.9]"
                    style={{ color: 'rgba(168,174,187,0.8)', fontFamily: 'Georgia, serif' }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

              {/* Bottom signature */}
              <motion.div
                className="mt-16 pt-8 border-t flex items-center justify-between"
                style={{ borderColor: post.accent + '20' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <span className="font-mono text-[11px] tracking-widest" style={{ color: post.accent + 'aa' }}>
                  — Bono Tang
                </span>
                <span className="font-mono text-[11px] tracking-widest" style={{ color: 'rgba(168,174,187,0.25)' }}>
                  {post.date}
                </span>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Hero heading removed (title/description removed per request)

// ─── Page ─────────────────────────────────────────────────────────────────────

const particles = Array.from({ length: 18 }, (_, i) => ({
  x: `${(i * 37 + 11) % 97}%`,
  y: `${(i * 53 + 7) % 95}%`,
  size: (i % 3) + 2,
  delay: (i % 5) * 0.8,
  id: i,
}))

export default function ThoughtsPage() {
  const [activePost, setActivePost] = useState<typeof posts[0] | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const scrollBar = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })


  return (
    <div ref={containerRef} className="relative min-h-screen" style={{ backgroundColor: '#0d1017' }}>

      {/* Reading progress bar */}
      <motion.div
        className="fixed top-[84px] left-0 right-0 h-[2px] z-[90] origin-left"
        style={{ scaleX: scrollBar, backgroundColor: '#a8aebb33' }}
      />
      <motion.div
        className="fixed top-[84px] left-0 h-[2px] z-[91] origin-left"
        style={{ scaleX: scrollBar, backgroundColor: '#a8aebb' }}
      />

      {/* Ambient particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map(p => <Particle key={p.id} x={p.x} y={p.y} size={p.size} delay={p.delay} />)}
      </div>

      {/* Subtle dot grid */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(168,174,187,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />


      {/* ── Posts ── */}
      <section className="relative z-10 px-8 md:px-20 pb-32">
        <div className="max-w-2xl space-y-16">
          {posts.map((post, i) => (
            <div
              key={post.id}
              style={{ marginLeft: i % 2 === 0 ? '0%' : '6%' }}
            >
              <PostCard
                post={post}
                index={i}
                onClick={() => setActivePost(post)}
              />
            </div>
          ))}
        </div>

        {/* End marker */}
        <motion.div
          className="flex items-center gap-4 max-w-2xl mt-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, rgba(168,174,187,0.15))' }} />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(168,174,187,0.2)' }}>
            end of entries
          </span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, transparent, rgba(168,174,187,0.15))' }} />
        </motion.div>
      </section>

      {/* ── Modal ── */}
      <PostModal post={activePost} onClose={() => setActivePost(null)} />
    </div>
  )
}