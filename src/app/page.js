import Header from '../components/Header'
import Footer from '../components/Footer'
import URLShortener from '../components/URLShortener'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Shorten Your URLs
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create short, memorable links from long URLs. Perfect for social media, 
            emails, and anywhere you need clean, professional links.
          </p>
        </div>
        
        <URLShortener />
        
      </main>
      
      <Footer />
    </div>
  )
}