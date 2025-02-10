import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { countries } from "../../../../../data/countries"

export default function DestinationPage({
    params: paramsPromise,
  }: { params: Promise<{ country: string; city: string }> }) {
    const params = React.use(paramsPromise)
    const country = countries.find((c) => c.slug === params.country)
    const destination = country?.destinations.find((d) => d.slug === params.city)
    console.log(params);
    if (!country || !destination) {
      notFound()
    }
  
    return (
      <div className="min-h-screen bg-base-100">
        <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <Link
            href={`/travel/${country.slug}`}
            className="inline-flex items-center text-primary hover:text-primary-focus mb-6"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to {country.name}
          </Link>
          <div className="bg-base-200 rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-96">
              <Image
                src={destination.image || "/placeholder.svg"}
                alt={destination.name}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="p-8">
              <h1 className="text-4xl font-bold text-base-content mb-4">{destination.name}</h1>
              <p className="text-base-content/80 mb-6">{destination.description}</p>
              {/* Add more details about the destination here */}
            </div>
          </div>
          <div className="rounded-lg shadow-lg w-xl pt-8">
            <p>Some content here.
            </p>
          </div>
        </main>
      </div>
    )
  }

/* 

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// This would typically come from a database or API
const destinationData = {
  london: {
    name: "London",
    image: "/images/london.jpg",
    description:
      "London, the capital of England and the United Kingdom, is a 21st-century city with history stretching back to Roman times. At its centre stand the imposing Houses of Parliament, the iconic 'Big Ben' clock tower and Westminster Abbey, site of British monarch coronations. Across the Thames River, the London Eye observation wheel provides panoramic views of the South Bank cultural complex, and the entire city.",
    attractions: [
      "Big Ben and Houses of Parliament",
      "Tower of London",
      "Buckingham Palace",
      "British Museum",
      "London Eye",
    ],
  },
  // Add data for other destinations here
}

export default function DestinationPage({ params }: { params: { slug: string } }) {
  const destination = destinationData[params.slug as keyof typeof destinationData]

  if (!destination) {
    return <div>Destination not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to All Destinations
        </Link>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96">
            <Image
              src={destination.image || "/placeholder.svg"}
              alt={destination.name}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{destination.name}</h1>
            <p className="text-gray-600 mb-6">{destination.description}</p>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Attractions</h2>
            <ul className="list-disc list-inside text-gray-600">
              {destination.attractions.map((attraction) => (
                <li key={attraction}>{attraction}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
} */

