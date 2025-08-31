"use client"
import Link from "next/link"
import { Star } from "lucide-react"
import { useEffect, useState } from "react"

export default function Header() {
  const [stars, setStars] = useState(null)

  useEffect(() => {
    async function fetchStars() {
      try {
        const res = await fetch("https://api.github.com/repos/spectureram/shortifyr")
        const data = await res.json()
        setStars(data.stargazers_count)
      } catch (err) {
        console.error("Failed to fetch stars", err)
      }
    }
    fetchStars()
  }, [])

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-900">
          Shortifyr
        </Link>
        <a
          href="https://github.com/spectureram/SpectureRam"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
        >
          <Star className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-medium text-gray-800">
            {stars !== null ? stars.toLocaleString() : "Star"}
          </span>
        </a>
      </div>
    </header>
  )
}