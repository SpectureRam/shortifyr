'use client'

import { useState, useEffect } from 'react'
import { Copy, Check, ExternalLink, RefreshCw } from 'lucide-react'

export default function URLShortener() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')

  // Captcha state
  const [captcha, setCaptcha] = useState('')
  const [captchaQuestion, setCaptchaQuestion] = useState('')
  const [captchaAnswer, setCaptchaAnswer] = useState('')
  const [captchaError, setCaptchaError] = useState('')

  useEffect(() => {
    generateCaptcha()
  }, [])

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    setCaptchaQuestion(`${num1} + ${num2}`)
    setCaptchaAnswer((num1 + num2).toString())
    setCaptcha('')
    setCaptchaError('')
  }

  const isValidUrl = (string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  const handleShorten = async () => {
    if (!url.trim()) {
      setError('Please enter a URL')
      return
    }

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL')
      return
    }

    if (!captcha.trim()) {
      setCaptchaError('Please complete the captcha')
      return
    }

    if (captcha !== captchaAnswer) {
      setCaptchaError('Incorrect captcha answer')
      return
    }

    setError('')
    setCaptchaError('')
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const randomId = Math.random().toString(36).substring(7)
      setShortUrl(`https://short.ly/${randomId}`)
      setIsLoading(false)
      generateCaptcha()
    }, 800)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="card">
        <div className="space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
              Enter your long URL
            </label>
            <input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/very-long-url"
              className="input-field"
              onKeyPress={(e) => e.key === 'Enter' && handleShorten()}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>

          <div>
            <label htmlFor="captcha" className="block text-sm font-medium text-gray-700 mb-2">
              Security Check
            </label>
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-gray-100 px-4 py-2 rounded border font-mono text-lg">
                {captchaQuestion} = ?
              </div>
              <button
                type="button"
                onClick={generateCaptcha}
                className="p-2 text-gray-400 hover:text-gray-600"
                title="Generate new captcha"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            <input
              id="captcha"
              type="text"
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
              className="input-field"
              placeholder="Enter the answer"
            />
            {captchaError && <p className="mt-1 text-sm text-red-600">{captchaError}</p>}
          </div>

          <button
            onClick={handleShorten}
            disabled={isLoading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Shortening...' : 'Shorten URL'}
          </button>
        </div>
      </div>

      {shortUrl && (
        <div className="mt-6 card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your shortened URL</h3>
          <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
            <ExternalLink className="w-4 h-4 text-gray-500 flex-shrink-0" />
            <span className="text-blue-600 font-mono flex-1 truncate">{shortUrl}</span>
            <button
              onClick={copyToClipboard}
              className="btn-secondary flex items-center space-x-1"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
