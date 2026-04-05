"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { resume } from "@/data/resume";

const easeOut = [0.22, 1, 0.36, 1] as const;

const bg = "#1e2329";
const muted = "#a8aebb";

function buildCasualChunks(): string[] {
  const edu = resume.education[0];
  const leeds = resume.education[1];
  const school = resume.education[2];
  const bank = resume.work[0];
  const hkgi = resume.work[1];
  const fed = resume.projects[0];
  const llm = resume.projects[1];
  const grad = edu.date.replace(/^Anticipated\s+/i, "").toLowerCase();

  return [
    `I'm a CS undergrad at CityU — third year, aiming to graduate around ${grad}. I like building things that actually ship and sometimes things that only live in research slides.`,
    `${edu.title}. Dean's list once, and I was lucky enough to get the Bright Future scholarship for engineering.`,
    `I did a semester abroad at ${leeds.school} (${leeds.date.toLowerCase()}) — linear algebra, financial maths, software engineering, and a lot of walking in the rain.`,
    `Before uni I graduated from ${school.school}.`,
    `Most recently I interned at ${bank.company} (${bank.date.toLowerCase()}) doing application work — legacy VB6 systems dragged into VB.NET, encryption and audit-friendly configs, a JSP microsite for the bank's anniversary, and UAT on a paperless receipts rollout.`,
    `The summer before that I was at ${hkgi.company}: dashboards, automated reporting tools, and the usual testing plus docs when something breaks at 5pm.`,
    `Research-wise I'm chipping away at ${fed.name.toLowerCase()} — ${fed.bullets[0]?.toLowerCase() ?? "federated learning and unlearning."}`,
    `${llm.name}. ${llm.context ? `${llm.context}. ` : ""}${llm.bullets.join(" ")}`,
    `Certifications and side quests: ${resume.achievements[0]?.title} (${resume.achievements[0]?.date}). ${resume.achievements[1]?.title} — made semifinals. ${resume.achievements[2]?.title} as a volunteer, leading walks and sorting itineraries.`,
    `Day-to-day I reach for ${resume.skills.programming.split(", ").slice(0, 5).join(", ")}, and the rest of the stack when the problem asks nicely. Cloud-wise: ${resume.skills.cloud.toLowerCase()}.`,
    `${resume.skills.languages}. HKIE student member.`,
    `When I'm not at a keyboard: ${resume.skills.interests.toLowerCase()}.`,
  ];
}

function buildCasualSections() {
  const chunks = buildCasualChunks();
  const lead = chunks[0]!;
  return {
    lead,
    sections: [
      {
        id: "study",
        title: "Study & path",
        paragraphs: chunks.slice(1, 4),
      },
      { id: "work", title: "Work", paragraphs: chunks.slice(4, 6) },
      {
        id: "research",
        title: "Research",
        paragraphs: chunks.slice(6, 8),
      },
      {
        id: "elsewhere",
        title: "Beyond the desk",
        paragraphs: chunks.slice(8),
      },
    ],
  };
}

export default function ResumeSection() {
  const reduceMotion = useReducedMotion();
  const { lead, sections } = buildCasualSections();

  const slow = !reduceMotion;
  const dur = slow ? 1.2 : 0.28;
  const staggerOuter = slow ? 0.62 : 0;
  const staggerInner = slow ? 0.38 : 0;
  const staggerCard = slow ? 0.42 : 0;

  const item = {
    hidden: slow
      ? { opacity: 0, y: 26, filter: "blur(10px)" }
      : { opacity: 0 },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: dur, ease: easeOut },
    },
  };

  const outerHero = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerOuter,
        delayChildren: slow ? 0.06 : 0,
      },
    },
  };

  const innerText = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerInner,
        delayChildren: slow ? 0.04 : 0,
      },
    },
  };

  const cardStagger = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerCard,
        delayChildren: slow ? 0.05 : 0,
      },
    },
  };

  const viewportHero = { once: true, amount: 0.12, margin: "0px 0px -8% 0px" };
  const viewportCard = { once: true, amount: 0.18, margin: "0px 0px -12% 0px" };

  return (
    <section
      className="relative z-[2] mr-8 overflow-hidden pb-28 pt-14 text-[#e6e8ed]"
      style={{ backgroundColor: bg }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-40 h-64 w-64 rounded-full bg-indigo-500/10 blur-[90px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
        {/*
          lg: left column = intro + timeline blocks; right column = snapshot (spans both rows, sticky).
          Mobile: intro → snapshot → timeline (stacked).
        */}
        <div className="mb-8 flex flex-col gap-10 lg:mb-0 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(220px,280px)] lg:gap-x-12 lg:gap-y-16 lg:items-start">
          

          <motion.div
            variants={item}
            initial="hidden"
            whileInView="show"
            viewport={viewportHero}
            className="order-2 mx-auto flex w-full max-w-[280px] flex-col items-center lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:max-w-none lg:self-start lg:justify-self-end lg:sticky lg:top-28"
          >
            <div className="relative w-full">
              <div
                className="absolute -inset-3 rounded-[2rem] opacity-60 blur-xl"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(125,211,252,0.25) 0%, rgba(99,102,241,0.15) 50%, transparent 70%)",
                }}
                aria-hidden
              />
              <div className="relative rotate-[1deg] rounded-2xl border border-white/10 bg-[#252b33] p-3 shadow-2xl shadow-black/40">
                <div className="aspect-[4/5] overflow-hidden rounded-lg bg-[#1a1f26]">
                  <Image
                    src="/profile-placeholder.svg"
                    alt=""
                    width={280}
                    height={350}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p
                  className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.35em]"
                  style={{ color: muted }}
                >
                  snapshot
                </p>
              </div>
            </div>
          </motion.div>

          <div className="order-3 min-w-0 lg:col-start-1 lg:row-start-2">
            <div className="relative pl-0 md:pl-2">
              <div
                className="absolute left-[15px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-cyan-400/35 via-white/12 to-white/5 md:block"
                aria-hidden
              />

              <div className="space-y-14 md:space-y-16">
                {sections.map((sec, si) => (
                  <article key={sec.id} className="relative md:ml-2 md:pl-10">
                    <div
                      className="absolute left-[10px] top-9 z-[1] hidden h-3.5 w-3.5 rounded-full border-[3px] border-[#1e2329] bg-gradient-to-br from-cyan-300/90 to-cyan-600/70 shadow-[0_0_14px_rgba(34,211,238,0.4)] md:block"
                      aria-hidden
                    />

                    <motion.div
                      variants={cardStagger}
                      initial="hidden"
                      whileInView="show"
                      viewport={viewportCard}
                      className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-6 shadow-xl shadow-black/25 backdrop-blur-md sm:p-8"
                    >
                      <motion.div
                        variants={item}
                        className="mb-5 flex flex-wrap items-baseline justify-between gap-2"
                      >
                        <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-[#e6e8ed]">
                          {sec.title}
                        </h3>
                        <span
                          className="font-mono text-[10px] tabular-nums tracking-widest"
                          style={{ color: muted }}
                        >
                          {String(si + 1).padStart(2, "0")}
                        </span>
                      </motion.div>
                      {sec.paragraphs.map((para, pi) => (
                        <motion.p
                          key={`${sec.id}-${pi}`}
                          variants={item}
                          className="mb-5 font-sans text-[1.02rem] leading-relaxed text-[#e6e8ed]/95 last:mb-0"
                        >
                          {para}
                        </motion.p>
                      ))}
                    </motion.div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
