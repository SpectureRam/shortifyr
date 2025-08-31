"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  LogOut,
  Calendar,
  MousePointer,
  Link as LinkIcon,
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [urls, setUrls] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchUrls = () => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/urls`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((url) => ({
          id: url.id,
          originalUrl: url.originalUrl,
          shortUrl: url.shortCode,
          customSlug: url.customSlug,
          clicks: url.clicks,
          dateCreated: url.createdAt,
        }));
        setUrls(formatted);
      })
      .catch((err) => console.error("Failed to load URLs:", err));
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await fetch("/api/logout", { method: "POST" });
      toast.success("Logged out successfully");
      router.push("/admin/login");
    }
  };

  const filteredUrls = urls.filter(
    (url) =>
      url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      url.shortUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (url.customSlug &&
        url.customSlug.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredUrls.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUrls = filteredUrls.slice(startIndex, startIndex + itemsPerPage);
  const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card flex items-center">
            <LinkIcon className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold">{urls.length}</p>
              <p className="text-gray-600">Total URLs</p>
            </div>
          </div>
          <div className="card flex items-center">
            <MousePointer className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold">{totalClicks}</p>
              <p className="text-gray-600">Total Clicks</p>
            </div>
          </div>
          <div className="card flex items-center">
            <Calendar className="w-8 h-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold">
                {urls.length > 0 ? Math.round(totalClicks / urls.length) : 0}
              </p>
              <p className="text-gray-600">Avg. Clicks</p>
            </div>
          </div>
        </div>
        <div className="card mb-6 flex items-center space-x-2">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search URLs..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 outline-none"
          />
        </div>
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50 text-sm">
                  <th className="text-left py-3 px-4">Original URL</th>
                  <th className="text-left py-3 px-4">Short URL</th>
                  <th className="text-left py-3 px-4">Custom Slug</th>
                  <th className="text-left py-3 px-4">Clicks</th>
                  <th className="text-left py-3 px-4">Date Created</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedUrls.map((url, idx) => (
                  <tr key={url.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-3 px-4">{url.originalUrl}</td>
                    <td className="py-3 px-4 text-blue-600 font-mono">
                      short.ly/{url.shortUrl}
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
                    <td className="py-3 px-4">{formatDate(url.dateCreated)}</td>
                    <td className="py-3 px-4">
                      <a
                        href={url.originalUrl}
                        target="_blank"
                        className="text-blue-600 hover:text-blue-800"
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
            <div className="flex justify-between px-4 py-3 border-t">
              <div className="text-sm">
                Showing {startIndex + 1}–{Math.min(startIndex + itemsPerPage, filteredUrls.length)} of{" "}
                {filteredUrls.length}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span>
                  {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
