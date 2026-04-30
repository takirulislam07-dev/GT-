import { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../AuthContext';
import { LogIn, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

export default function Login() {
  const { loginWithGoogle, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // If already logged in, redirect
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/";

  if (user && !loading) {
    return <Navigate to={from} replace />;
  }

  const handleLogin = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    setError(null);
    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const firebaseError = err as { code?: string; message?: string };
      console.error("Login failed:", firebaseError);
      if (firebaseError.code === 'auth/popup-blocked') {
        setError('The login popup was blocked by your browser. Please enable popups for this site.');
      } else if (firebaseError.code === 'auth/cancelled-popup-request' || firebaseError.code === 'auth/popup-closed-by-user') {
        setError('Login was cancelled. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-12 rounded-[48px] shadow-2xl shadow-brand-night/10 border border-zinc-100 text-center space-y-8"
      >
        <div className="w-20 h-20 bg-brand-emerald/10 text-brand-emerald rounded-full flex items-center justify-center mx-auto mb-6">
          <LogIn size={40} />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-display font-bold text-brand-night uppercase tracking-tight">Welcome Back</h1>
          <p className="text-zinc-500 font-medium">Join the Green Touch community for organic health & wellness.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <button 
          onClick={handleLogin}
          disabled={isLoggingIn}
          className="w-full bg-brand-night text-white py-5 rounded-2xl font-bold text-lg hover:bg-brand-emerald disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center gap-4 group"
        >
          {isLoggingIn ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
              Continue with Google
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>

        <p className="text-xs text-zinc-400 leading-relaxed pt-4">
          By signing in, you agree to our <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
        </p>

        <div className="pt-8">
          <p className="text-xs font-bold text-brand-night tracking-[0.2em] uppercase">Authentic & Pure</p>
        </div>
      </motion.div>
    </div>
  );
}
