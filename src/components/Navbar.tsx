'use client'

import Link from 'next/link'
import { useState } from 'react'

const navItems = [
  { label: 'Applications', href: '/applications' },
  { label: 'Stories', href: '/stories' },
  { label: 'Thoughts', href: '/thoughts' },
]

const textColor = '#a8aebb'
const hoverColor = '#e6e8ed'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <nav className="w-full fixed top-0 left-0 z-50" style={{ backgroundColor: '#1e2329', height: '88px' }}>
      <div className="w-full px-12 flex items-center justify-between" style={{ height: '84px' }}>

        {/* Left — Home icon */}
        <Link
          href="/"
          aria-label="Home"
          onMouseEnter={() => setHovered('home')}
          onMouseLeave={() => setHovered(null)}
          className="transition-all duration-500 ease-in-out hover:scale-105 cursor-pointer translate-y-1"
          style={{ color: hovered === 'home' ? hoverColor : textColor }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </Link>

        {/* Centre — Desktop nav */}
        <ul className="hidden lg:flex items-center gap-40 absolute left-[48%] -translate-x-1/2 translate-y-1">
          {navItems.map((item) => (
            <li key={item.label} className="relative flex items-center justify-center">
              {/* Invisible semibold copy at hover size — locks the li width so neighbours never shift */}
              <span
                className="invisible font-semibold select-none pointer-events-none"
                aria-hidden="true"
                style={{ fontSize: '1rem' }}
              >
                {item.label}
              </span>
              {/* Visible link — font-size transition gives a natural swell in place */}
              <Link
                href={item.href}
                onMouseEnter={() => setHovered(item.label)}
                onMouseLeave={() => setHovered(null)}
                className="absolute inset-0 flex items-center justify-center tracking-wide cursor-pointer translate-y-1"
                style={{
                  color: hovered === item.label ? hoverColor : textColor,
                  fontWeight: hovered === item.label ? 500 : 400,
                  fontSize: hovered === item.label ? '0.9rem' : '0.875rem',
                  transition: 'font-size 200ms ease, color 200ms ease, font-weight 200ms ease',
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right — GitHub */}
        <a
          href="https://github.com/bonotph"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          onMouseEnter={() => setHovered('github')}
          onMouseLeave={() => setHovered(null)}
          className="hidden lg:block transition-all duration-500 ease-in-out hover:scale-105 cursor-pointer"
          style={{ color: hovered === 'github' ? hoverColor : textColor }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={"block h-0.5 w-5 transition-all duration-300 " + (mobileOpen ? 'rotate-45 translate-y-2' : '')} style={{ backgroundColor: textColor }} />
          <span className={"block h-0.5 w-5 transition-all duration-300 " + (mobileOpen ? 'opacity-0' : '')} style={{ backgroundColor: textColor }} />
          <span className={"block h-0.5 w-5 transition-all duration-300 " + (mobileOpen ? '-rotate-45 -translate-y-2' : '')} style={{ backgroundColor: textColor }} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={"lg:hidden overflow-hidden transition-all duration-300 ease-in-out " + (mobileOpen ? 'max-h-screen' : 'max-h-0')}>
        <ul className="px-12 py-3 flex flex-col gap-0.5" style={{ backgroundColor: '#1e2329', borderTop: '1px solid #2d333b' }}>
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="block py-2 text-sm transition-colors duration-200"
                style={{ color: textColor }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
