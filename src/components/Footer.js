import Link from 'next/link'
import { Lock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="py-6 text-sm text-center border-t border-gray-200">
      <div className="flex flex-col items-center space-y-2">
        <div className="flex space-x-8">
        <Link href="/about" className="hover:underline">
        About
        </Link>
        <Link href="/privacy" className="hover:underline">
        Privacy
        </Link>
        <Link href="/admin/login" className="flex items-center space-x-1 hover:underline">
        <Lock size={14} />
        <span>Admin Dashboard</span>
        </Link>
        </div>
        <p>&copy; {new Date().getFullYear()} LinkShortify. All rights reserved.</p>

      </div>
    </footer>
  )
}
