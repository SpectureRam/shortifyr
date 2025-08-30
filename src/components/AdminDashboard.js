'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  LogOut,
  Calendar,
  MousePointer,
  Link as LinkIcon,
  Copy
} from 'lucide-react'

export default function AdminDashboard() {
  const [urls, setUrls] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (!auth) {
      router.push('/admin/login')
    } else {
      setIsAuthenticated(true)

      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/urls`)
        .then(res => res.json())
        .then(data => {
          const formatted = data.map(url => ({
            id: url.id,
            originalUrl: url.originalUrl,
            shortUrl: url.shortCode,
            customSlug: url.customSlug,
            clicks: url.clicks,
            dateCreated: url.createdAt
          }))
          setUrls(formatted)
        })
        .catch(err => console.error("Failed to load URLs:", err))
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    router.push('/')
  }

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    alert("Copied to clipboard ✅")
  }

  const filteredUrls = urls.filter(url =>
    url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
    url.shortUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (url.customSlug && url.customSlug.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const totalPages = Math.ceil(filteredUrls.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedUrls = filteredUrls.slice(startIndex, startIndex + itemsPerPage)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0)

  if (!isAuthenticated) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <LinkIcon className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{urls.length}</p>
                <p className="text-gray-600">Total URLs</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <MousePointer className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">{totalClicks}</p>
                <p className="text-gray-600">Total Clicks</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">
                  {urls.length > 0 ? Math.round(totalClicks / urls.length) : 0}
                </p>
                <p className="text-gray-600">Avg. Clicks</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-6">
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search URLs..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="flex-1 outline-none"
            />
          </div>
        </div>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 text-sm">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Original URL</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Short URL</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Custom Slug</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Clicks</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Date Created</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUrls.map((url, index) => (
                  <tr
                    key={url.id}
                    className={`${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    } hover:bg-gray-100 transition`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2 max-w-xs truncate" title={url.originalUrl}>
                        <span className="truncate">{url.originalUrl}</span>
                        <button onClick={() => handleCopy(url.originalUrl)}>
                          <Copy className="w-4 h-4 text-gray-500 hover:text-gray-800" />
                        </button>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-blue-600">short.ly/{url.shortUrl}</span>
                        <button onClick={() => handleCopy(`short.ly/${url.shortUrl}`)}>
                          <Copy className="w-4 h-4 text-gray-500 hover:text-gray-800" />
                        </button>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      {url.customSlug ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                          {url.customSlug}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>

                    <td className="py-3 px-4 font-semibold">{url.clicks}</td>

                    <td className="py-3 px-4 text-gray-600">{formatDate(url.dateCreated)}</td>

                    <td className="py-3 px-4">
                      <a
                        href={url.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                        title="Open original URL"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 py-3 border-t border-gray-200 space-y-2 md:space-y-0">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredUrls.length)} of {filteredUrls.length} results
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value))
                    setCurrentPage(1)
                  }}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {[10, 25, 50, 100].map(size => (
                    <option key={size} value={size}>{size} per page</option>
                  ))}
                </select>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="btn-secondary disabled:opacity-50 flex items-center space-x-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <span className="px-3">{currentPage} / {totalPages}</span>

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="btn-secondary disabled:opacity-50 flex items-center space-x-1"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}