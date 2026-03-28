import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Trophy,
  Calendar,
  Map,
  LogOut,
  Menu,
  X,
  User,
  ChevronDown,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { to: '/dashboard', label: 'DASHBOARD', icon: LayoutDashboard },
  { to: '/stats', label: 'MY_STATS', icon: Trophy },
  { to: '/leaderboard', label: 'RANKINGS', icon: Trophy },
  { to: '/calendar', label: 'SCHEDULE', icon: Calendar },
  { to: '/fleet', label: 'FLEET_MAP', icon: Map },
];

export function Navbar() {
  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0f131f]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative">
                <div className="absolute inset-0 bg-[#70eeff]/20 blur-md rounded-full scale-0 group-hover:scale-100 transition-transform" />
                <img
                    src="https://i.ibb.co/9Hd1f7jr/cropped-circle-image-1.png"
                    alt="Aura VTC"
                    className="w-10 h-10 rounded-full border border-white/10 relative z-10"
                />
            </div>
            <div className="flex flex-col">
                <span className="font-heading font-black text-xl tracking-tighter text-white group-hover:text-[#70eeff] transition-colors">
                    AURA_HUB
                </span>
                <span className="text-[8px] font-black text-[#70eeff] tracking-[0.4em] uppercase -mt-1 hidden sm:block">
                    Network_Protocol
                </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          {user && (
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all uppercase',
                    location.pathname === link.to
                      ? 'bg-[#70eeff]/5 text-[#70eeff] border border-[#70eeff]/20 shadow-[0_0_15px_rgba(112,238,255,0.1)]'
                      : 'text-muted-foreground hover:text-white hover:bg-white/5'
                  )}
                >
                  <link.icon size={14} />
                  {link.label}
                </Link>
              ))}
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-[#70eeff]/30 transition-all group"
                >
                  <div className="w-8 h-8 rounded-full bg-[#70eeff]/20 border border-[#70eeff]/30 flex items-center justify-center text-[#70eeff] font-bold overflow-hidden shadow-[0_0_10px_rgba(112,238,255,0.2)]">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <User size={16} />
                    )}
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-[10px] font-black text-white leading-none mb-0.5">{(profile?.username || 'OPERATOR').toUpperCase()}</p>
                    <p className="text-[8px] font-bold text-muted-foreground leading-none">ID_{user.id.slice(0, 8).toUpperCase()}</p>
                  </div>
                  <ChevronDown size={14} className="text-muted-foreground group-hover:text-[#70eeff] transition-colors" />
                </button>

                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute right-0 mt-3 w-80 p-2 rounded-2xl bg-black/40 backdrop-blur-[40px] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] z-50 overflow-visible"
                    >
                      <div className="px-4 py-3 border-b border-white/5 mb-2">
                        <p className="text-[10px] font-black text-[#70eeff] uppercase tracking-widest mb-1">Active Operative</p>
                        <p className="text-sm font-heading font-black text-white truncate">{profile?.username}</p>
                        <p className="text-[10px] text-muted-foreground font-medium truncate">{user.email}</p>
                      </div>
                      
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black text-[#e83553] hover:bg-[#e83553]/10 transition-colors uppercase tracking-widest"
                      >
                        <LogOut size={16} />
                        Terminate_Session
                      </button>
                    </motion.div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-primary px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
              >
                <Zap size={14} />
                INITIALIZE_AUTH
              </Link>
            )}

            {/* Mobile menu button */}
            {user && (
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2.5 rounded-xl bg-white/5 border border-white/5 text-foreground transition-all hover:bg-white/10"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && user && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden border-t border-white/5 py-4 space-y-2"
          >
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-4 px-4 py-3.5 rounded-xl text-[10px] font-black tracking-[0.2em] transition-all uppercase',
                  location.pathname === link.to
                    ? 'bg-[#70eeff]/5 text-[#70eeff] border border-[#70eeff]/20'
                    : 'text-muted-foreground hover:text-white hover:bg-white/5'
                )}
              >
                <link.icon size={18} />
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
}
