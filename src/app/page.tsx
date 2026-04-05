"use client";

import Image from "next/image";
import bg from "../../public/background.jpg";
import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import ResumeSection from "@/components/home/ResumeSection";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [imageReady, setImageReady] = useState(false);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  /* Extra-tall sticky zone + gradual wash: light overlay for a long stretch, then full blend */
  const scrollWashOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.45, 0.72, 1],
    [0, 0.04, 0.18, 0.62, 1],
  );

  const imageTransition = reduceMotion
    ? { duration: 0.35 }
    : { duration: 1.35, ease: easeOut };

  const textStagger = reduceMotion ? 0 : 0.14;
  const textDelay = reduceMotion ? 0 : 0.25;

  return (
    <div className="flex min-h-screen flex-col">
      {/* Tall track = scroll “friction” before the hero unpins; skip when reduced motion */}
      <div
        ref={heroRef}
        className={`relative mr-8 w-full ${reduceMotion ? "" : "min-h-[380vh]"}`}
      >
        <div
          className={
            reduceMotion
              ? "relative h-[100vh] w-full overflow-hidden"
              : "sticky top-[84px] z-0 flex h-[calc(100dvh-84px)] min-h-[calc(100dvh-84px)] w-full overflow-hidden"
          }
        >
        {/* Pedestal: visible immediately so there is no hard white flash */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-neutral-900"
          aria-hidden
        />

        {/* Background image: smooth reveal once decoded */}
        <motion.div
          className="absolute inset-0"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.07 }}
          animate={
            imageReady
              ? { opacity: 1, scale: 1 }
              : reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 1.07 }
          }
          transition={imageTransition}
        >
          <Image
            src={bg}
            alt=""
            fill
            placeholder="blur"
            priority
            sizes="100vw"
            className="object-cover"
            onLoadingComplete={() => setImageReady(true)}
          />
        </motion.div>

        {/* Gentle vignette that eases in with the photo */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-black/25"
          initial={{ opacity: 0 }}
          animate={{ opacity: imageReady ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0.2 : 0.9, ease: easeOut, delay: reduceMotion ? 0 : 0.15 }}
          aria-hidden
        />

        {/* Scroll: warm wash blends hero into resume (above hero copy) */}
        {!reduceMotion && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-[11] bg-[#1e2329]"
            style={{ opacity: scrollWashOpacity }}
            aria-hidden
          />
        )}

        {/* Left text — layout matches pre–smooth-load version */}
        <motion.div
          className="absolute inset-y-0 flex w-50 items-center p-[200px] ml-8"
          initial="hidden"
          animate={imageReady ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: textStagger,
                delayChildren: textDelay,
              },
            },
          }}
        >
          <div className="relative z-10 text-center">
            <motion.h1
              className="mb-4 font-serif text-5xl font-bold text-white"
              variants={{
                hidden: reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: reduceMotion
                    ? { duration: 0.3 }
                    : { duration: 0.95, ease: easeOut },
                },
              }}
            >
              Bono Tang
            </motion.h1>
            <motion.p
              className="font-sans text-xl tracking-wide text-white"
              variants={{
                hidden: reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 14 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: reduceMotion
                    ? { duration: 0.3 }
                    : { duration: 0.9, ease: easeOut },
                },
              }}
            >
              Portfolio
            </motion.p>
          </div>
          <div className="absolute inset-0 z-0 bg-black opacity-30" aria-hidden />
        </motion.div>

        {/* Right text */}
        <motion.div
          className="absolute right-0 top-2 mt-8 flex w-1/2 items-center justify-center pt-8"
          initial="hidden"
          animate={imageReady ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: textStagger,
                delayChildren: textDelay + (reduceMotion ? 0 : 0.12),
              },
            },
          }}
        >
          <div className="relative z-10 text-center">
          <motion.p
            className="font-sans text-2xl leading-relaxed tracking-wider text-black"
            variants={{
              hidden: reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 22 },
              visible: {
                opacity: 1,
                y: 0,
                transition: reduceMotion
                  ? { duration: 0.3 }
                  : { duration: 1, ease: easeOut },
              },
            }}
          >
            The personal blog of a <br />
            Year-3 CityU CS Student. <br />
            A record of my youthful times.
          </motion.p>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="pointer-events-none absolute bottom-8 left-1/2 z-[12] hidden -translate-x-1/2 sm:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: imageReady ? 0.55 : 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          aria-hidden
        >
          <motion.div
            animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-1 text-white/80"
          >
            <span className="text-center font-sans text-[10px] uppercase tracking-[0.25em]">
              Scroll
            </span>
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </motion.div>
        </div>
      </div>

      <ResumeSection />
    </div>
  );
}
