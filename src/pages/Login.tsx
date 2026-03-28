import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { GlassCard } from '@/components/layout/GlassCard';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, Mail, Lock, User, Hash, ArrowLeft, Truck, AlertCircle, ShieldCheck } from 'lucide-react';

export default function Login() {
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [tmpId, setTmpId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (user) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isSignUp) {
        if (!username.trim()) {
          setError('Username is required');
          setLoading(false);
          return;
        }
        const { error } = await signUp(email, password, username, tmpId || undefined);
        if (error) {
          setError(error.message);
        } else {
          setSuccess('Account created! Check your email for verification.');
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message);
        } else {
          navigate('/dashboard', { replace: true });
        }
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-[#0f131f]">
      {/* Immersive HUD Background */}
      <div className="fixed inset-0 hud-grid opacity-20 pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#70eeff]/10 blur-[120px] rounded-full pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#a855f7]/10 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#70eeff]/60 hover:text-[#70eeff] text-[10px] font-black uppercase tracking-[0.2em] mb-8 transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Abort to Mainframe
        </Link>

        <GlassCard className="p-0 overflow-hidden border-white/5 shadow-2xl">
          <div className="relative p-8 pb-4">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#70eeff] to-transparent opacity-50" />
            
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[#70eeff]/10 mx-auto mb-6 flex items-center justify-center border border-[#70eeff]/20">
                <Truck size={32} className="text-[#70eeff]" />
              </div>
              <h1 className="text-3xl font-heading font-black tracking-tighter uppercase">
                {isSignUp ? 'REGISTER_USER' : 'INIT_AUTH'}
              </h1>
              <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mt-2">
                Aura Network Protocol / v2.0
              </p>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-[#e83553]/10 text-[#e83553] text-xs font-bold border border-[#e83553]/20 mb-6 uppercase"
              >
                <AlertCircle size={18} className="shrink-0" />
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-[#5fff9a]/10 text-[#5fff9a] text-xs font-bold border border-[#5fff9a]/20 mb-6 uppercase"
              >
                <ShieldCheck size={18} className="shrink-0" />
                {success}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Account Handler</label>
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="OPERATOR_NAME"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-black/40 border border-white/5 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-1 focus:ring-[#70eeff]/50 focus:border-[#70eeff]/50 transition-all text-sm font-heading font-bold uppercase"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">TruckersMP Data (Link)</label>
                    <div className="relative">
                      <Hash size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        value={tmpId}
                        onChange={(e) => setTmpId(e.target.value)}
                        placeholder="TMP_ID_OFFLINE"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-black/40 border border-white/5 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-1 focus:ring-[#70eeff]/50 focus:border-[#70eeff]/50 transition-all text-sm font-heading font-bold"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Signal Channel (Email)</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="SIGNAL@AURA-HUB.NET"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-black/40 border border-white/5 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-1 focus:ring-[#70eeff]/50 focus:border-[#70eeff]/50 transition-all text-sm font-heading font-bold uppercase"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest ml-1">Access Protocol (Password)</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-black/40 border border-white/5 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-1 focus:ring-[#70eeff]/50 focus:border-[#70eeff]/50 transition-all text-sm font-heading font-bold"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-4 mt-4 rounded-xl font-heading font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group whitespace-nowrap overflow-hidden"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : isSignUp ? (
                  <>
                    <UserPlus size={20} />
                    Establish Link
                  </>
                ) : (
                  <>
                    <LogIn size={20} />
                    Secure Access
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="p-6 bg-black/20 border-t border-white/5 text-center">
            <button
              onClick={() => { setIsSignUp(!isSignUp); setError(''); setSuccess(''); }}
              className="text-[10px] font-black text-muted-foreground hover:text-[#70eeff] transition-all uppercase tracking-widest"
            >
              {isSignUp ? 'EX_SIGNAL_RECORD? SWITCH_TO_LOGIN' : "NO_RECORD_FOUND? INITIALIZE_NEW_IDENTITY"}
            </button>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
