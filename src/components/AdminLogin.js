'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, RefreshCw } from 'lucide-react'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [captcha, setCaptcha] = useState('')
  const [captchaQuestion, setCaptchaQuestion] = useState('7 + 3')
  const [captchaAnswer, setCaptchaAnswer] = useState('10')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    setCaptchaQuestion(`${num1} + ${num2}`)
    setCaptchaAnswer((num1 + num2).toString())
    setCaptcha('')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!password) newErrors.password = 'Password is required'
    if (!captcha) newErrors.captcha = 'Please complete the captcha'
    if (captcha && captcha !== captchaAnswer) newErrors.captcha = 'Incorrect captcha answer'
    if (password && password !== 'admin123') newErrors.password = 'Invalid password'

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true)
      setTimeout(() => {
        localStorage.setItem('adminAuth', 'true')
        router.push('/admin')
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-600 mt-2">Please enter your credentials</p>
        </div>

        <div className="card">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-10"
                  placeholder="Enter admin password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
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
              {errors.captcha && <p className="mt-1 text-sm text-red-600">{errors.captcha}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full disabled:opacity-50"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-4 text-xs text-gray-500 text-center">
            Demo credentials: Password is "admin123"
          </div>
        </div>
      </div>
    </div>
  )
}