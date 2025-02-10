'use client'

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"

interface DestinationCardProps {
  name: string
  image: string
  description: string
  slug: string
  countrySlug: string
}

export default function DestinationCard({ name, image, description, slug, countrySlug }: DestinationCardProps) {
  return (
    <motion.div
      className="bg-base-200 rounded-lg shadow-lg overflow-hidden"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48">
        <Image src={image || "/placeholder.svg"} alt={name} fill style={{ objectFit: "cover" }} />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-base-content mb-2">{name}</h2>
        <p className="text-base-content/70 mb-4">{description}</p>
        <Link
          href={`/travel/${countrySlug}/${slug}`}
          className="btn btn-primary inline-flex items-center justify-center"
        >
          Discover More
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  )
}



