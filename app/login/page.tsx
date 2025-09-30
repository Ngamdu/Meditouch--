'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { Shield, Fingerprint, User, Lock, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState<'password' | 'fingerprint'>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (error: any) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleFingerprintLogin = () => {
    setError('Fingerprint authentication will be available in the mobile app');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-blue-900">MediTouch</h1>
          </div>
          <p className="text-blue-700 text-lg">Secure Healthcare Access</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Secure Sign In</h2>
          
          {/* Login Method Toggle */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setLoginMethod('password')}
              className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                loginMethod === 'password'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 text-gray-600 hover:border-blue-300'
              }`}
            >
              <User className="w-5 h-5 mx-auto mb-1" />
              <span className="text-sm">ID & Password</span>
            </button>
            <button
              onClick={() => setLoginMethod('fingerprint')}
              className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                loginMethod === 'fingerprint'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 text-gray-600 hover:border-blue-300'
              }`}
            >
              <Fingerprint className="w-5 h-5 mx-auto mb-1" />
              <span className="text-sm">Fingerprint</span>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          {/* Login Form */}
          {loginMethod === 'password' ? (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email or User ID
                </label>
                <div className="relative">
                  <User className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email or ID"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          ) : (
            /* Fingerprint Login */
            <div className="text-center py-8">
              <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Fingerprint className="w-10 h-10 text-blue-600" />
              </div>
              <p className="text-gray-600 mb-4">Place your finger on the scanner</p>
              <button 
                onClick={handleFingerprintLogin}
                className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Start Fingerprint Scan
              </button>
              <p className="text-gray-500 text-sm mt-4">
                Fingerprint authentication requires mobile device support
              </p>
            </div>
          )}

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                Create one here
              </a>
            </p>
          </div>

          {/* Emergency Access */}
          <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <p className="text-red-800 text-sm text-center font-medium">
              Emergency Access Available at Healthcare Facilities
            </p>
          </div>
        </div>

        {/* Security Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            HIPAA Compliant • Encrypted • Secure
          </p>
        </div>
      </div>
    </div>
  );
}
