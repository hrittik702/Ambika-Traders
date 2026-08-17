import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Input from '@/components/forms/Input';
import { ShieldCheck, Mail, ArrowRight, Eye, EyeOff } from 'lucide-react';
import Stars from '@/components/ui/Stars';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="relative h-[100dvh] w-full bg-mono-950 text-mono-0 flex flex-col justify-between font-intern p-6 md:p-12 overflow-hidden">
      <Stars />
      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between">
        <Link to="/" className="flex flex-col group">
          <span className="font-bold text-lg md:text-xl tracking-tighter text-mono-0 uppercase group-hover:text-mono-300">
            AMBIKA TRADERS
          </span>
          <span className="text-[0.65rem] font-mono tracking-widest text-mono-400 uppercase">
            [ADMINISTRATIVE ACCESS PORTAL]
          </span>
        </Link>

        <Link
          to="/"
          className="text-xs font-mono text-mono-400 hover:text-mono-0 transition-colors uppercase tracking-wider"
        >
          ← Return to Website
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-md mx-auto my-auto bg-mono-900/80 backdrop-blur-md border border-mono-800 p-8 md:p-10 rounded-xs shadow-floating space-y-6">
        <div className="space-y-2">
          <div className="w-12 h-12 bg-mono-0 text-mono-950 rounded-xs flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="font-mono text-xs text-mono-400 uppercase tracking-widest block">
            [SECURITY CLEARANCE REQUIRED]
          </span>
          <h1 className="text-heading-lg font-bold text-mono-0">
            Admin Authentication
          </h1>
          <p className="text-body-sm text-mono-400">
            Login with your authorized administrator credentials to manage products, services, quotations, and team accounts.
          </p>
        </div>



        {error && (
          <div className="p-3.5 bg-red-950/60 border border-red-800 text-red-200 text-xs rounded-xs font-mono">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-mono-300 uppercase tracking-wider mb-2">
              Registered Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ambikatraders.com"
                required
                className="w-full px-4 py-3 bg-mono-950 text-mono-0 border border-mono-700 rounded-xs focus:outline-none focus:ring-2 focus:ring-mono-0 text-sm font-intern"
              />
              <Mail className="w-4 h-4 text-mono-500 absolute right-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-mono-300 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 bg-mono-950 text-mono-0 border border-mono-700 rounded-xs focus:outline-none focus:ring-2 focus:ring-mono-0 text-sm font-intern"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-mono-500 hover:text-mono-0 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="inverse"
              size="lg"
              className="w-full"
              isLoading={loading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In to Dashboard
            </Button>
          </div>
        </form>


      </div>

      {/* Footer */}
      <div className="relative z-10 text-center text-xs font-mono text-mono-500">
        Ambika Traders • Management Control System • Protected by Google Firebase
      </div>
    </div>
  );
}

export default AdminLogin;
