import Link from "next/link"
import Image from "next/image"
import { countries } from "../../../data/countries"

export default function Travel() {
  return (
    <div className="min-h-screen bg-base-100">
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-base-content mb-12">My Travel Destinations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {countries.map((country) => (
            <Link key={country.slug} href={`/travel/${country.slug}`} className="group">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={country.backgroundImage || "/placeholder.svg"}
                  alt={country.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl font-bold text-white mb-2">{country.name}</h2>
                  <p className="text-sm text-white line-clamp-2">{country.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
