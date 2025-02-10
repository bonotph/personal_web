import React from "react"
import DestinationCard from "@/components/DestinationCard"
import { notFound } from "next/navigation"
import { countries } from "../../../../data/countries"

export default function CountryPage({ params: paramsPromise }: { params: Promise<{ country: string }> }) {
  const params = React.use(paramsPromise)
  const country = countries.find((c) => c.slug === params.country)

  if (!country) {
    notFound()
  }

  return (
    <div className="w-full min-h-screen bg-base-100 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
        backgroundImage: "url('/uk.JPG')",
          opacity: 0.35,
        }}
      />
      <div className="relative z-10 pt-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-base-content mb-4">{`Places I've been in `}{country.name}</h1>
          <p className="text-xl text-base-content/80 max-w-3xl mx-auto">{country.description}</p>
        </div>
        <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {country.destinations.map((destination) => (
              <DestinationCard key={destination.slug} {...destination} countrySlug={country.slug} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}


/*     <div className="w-full relative h-[110vh]">
      <div 
        className="absolute inset-0 bg-cover z-0 "
        style={{ 
          backgroundImage: "url('/uk.JPG')",
          opacity: 0.35
        }}
      />
      <div className="relative z-10">
        <div className="text-center mb-12">
          <br/><br/>
          <h1 className="text-4xl font-bold text-foreground mb-4">Places I've been in the UK</h1>
          <p className="text-xl text-foreground max-w-3xl mx-auto">
            Home of my exchange university. A nice blend of picturesque landscapes and cozy towns.
          </p>
        </div>
        <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <DestinationCard key={destination.slug} {...destination} />
            ))}
          </div>
        </main>
      </div>
    </div> */