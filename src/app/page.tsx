"use client"

import Image from "next/image"
import bg from "../../public/background.jpg"
import { useState } from "react"
import { motion } from "motion/react"

export default function Home() {
  const [bgLoaded, setBgLoaded] = useState(false)

  return (
    <motion.div className="min-h-screen flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
      <div className="w-full relative h-[100vh] mr-8">
        {/* Fade the background in when it finishes loading to avoid a sudden change */}
        <motion.div initial={{ scale: 1.04, opacity: 0.75 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.1, ease: 'easeOut' }}>
          <Image
            src={bg}
            alt="background"
            fill
            placeholder="blur"
            className={`object-cover transition-opacity duration-700 ease-out ${bgLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoadingComplete={() => setBgLoaded(true)}
            priority
            style={{ filter: bgLoaded ? 'blur(0px)' : 'blur(8px)', transition: 'filter 700ms ease-out' }}
          />
        </motion.div>

        {/* Left text */}
        <motion.div className="absolute inset-y-0 left- w-50 flex items-center ml-8 p-[200px]" initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.45 }}>
          <div className="text-center z-10">
            <motion.h1 className="text-5xl font-bold text-white mb-4 font-serif" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.6 }}>
              Bono Tang
            </motion.h1>
            <motion.p className="text-xl text-white font-sans tracking-wide" initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.75 }}>
              Portfolio
            </motion.p>
          </div>
          <div className="absolute inset-0 bg-black opacity-30" />
        </motion.div>
        
        {/* Right text */}
        <motion.div className="absolute top-2 right-0 w-1/2 flex items-center justify-center mt-8 pt-8" initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 0.85 }}>
          <div className="text-center z-10">
            <motion.p className="text-2xl text-black font-sans tracking-wider leading-relaxed" initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 1.0 }}>
              The personal blog of a <br/>
              Year-3 CityU CS Student. <br/>
              A record of my youthful times.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}