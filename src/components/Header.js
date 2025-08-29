import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <Link href="/" className="text-xl font-bold text-gray-900">
          LinkShort
        </Link>
      </div>
    </header>
  )
}