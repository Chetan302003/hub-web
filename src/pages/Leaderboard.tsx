import { useState } from 'react';
import { useFleetStats } from '@/hooks/useFleetStats';
import { GlassCard } from '@/components/layout/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, MapPin, Package, DollarSign, Search, RefreshCw, Zap, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Leaderboard() {
  const { leaderboard, loading, refresh } = useFleetStats();
  const [search, setSearch] = useState('');

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toFixed(0);
  };

  const formatCurrency = (num: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(num);

  const filtered = leaderboard.filter(d =>
    d.username?.toLowerCase().includes(search.toLowerCase())
  );

  const top3 = filtered.slice(0, 3);
  const rest = filtered.slice(3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 pb-12"
    >
      {/* HUD Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.4em] text-[#e8b800] uppercase">
            <Trophy size={12} />
            Elite Operative Rankings
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tighter uppercase">
            HUB_ <span className="text-[#70eeff]">LEADERBOARD</span>
          </h1>
          <p className="text-muted-foreground text-sm font-medium border-l-2 border-[#70eeff]/30 pl-3 ml-1 mt-2">
            TRACKING {leaderboard.length} ACTIVE OPERATIVES IN THE NETWORK
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative w-full md:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="SEARCH_OPERATIVE..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/40 border border-white/5 text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:ring-1 focus:ring-[#70eeff]/50 transition-all text-xs font-bold uppercase"
            />
          </div>
          <button
            onClick={refresh}
            disabled={loading}
            className="p-3 rounded-xl bg-[#70eeff]/5 border border-[#70eeff]/10 text-[#70eeff] hover:bg-[#70eeff]/10 transition-all disabled:opacity-50 group"
          >
            <RefreshCw size={20} className={cn(loading && 'animate-spin')} />
          </button>
        </div>
      </div>

      {/* Top 3 Podium */}
      {top3.length >= 3 && !search && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-12">
          {/* 2nd Place */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="order-2 md:order-1"
          >
            <GlassCard className="text-center pt-12 pb-8 border-white/5 relative group hover:border-slate-400/30">
              <div className="absolute top-4 left-4 text-[10px] font-black text-slate-400/50 uppercase tracking-widest">RANK_02</div>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-slate-400/20 border border-slate-400/30 flex items-center justify-center font-heading font-black text-slate-300 shadow-[0_0_20px_rgba(148,163,184,0.2)]">02</div>
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-slate-400/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-full h-full rounded-full bg-[#0f131f] border-2 border-slate-400/20 overflow-hidden flex items-center justify-center text-slate-400 text-3xl font-black font-heading">
                  {top3[1].avatar_url ? <img src={top3[1].avatar_url} className="w-full h-full object-cover" /> : top3[1].username?.charAt(0)}
                </div>
              </div>
              <h3 className="font-heading font-black text-xl mb-1 uppercase truncate px-4">{top3[1].username}</h3>
              <p className="text-slate-400 font-heading font-black text-2xl tracking-tighter">{formatNumber(Number(top3[1].total_distance))} KM</p>
              <div className="flex items-center justify-center gap-4 mt-6">
                <div className="text-center">
                  <p className="text-[8px] font-black text-muted-foreground uppercase">Logs</p>
                  <p className="text-xs font-bold">{top3[1].total_deliveries}</p>
                </div>
                <div className="w-px h-6 bg-white/5" />
                <div className="text-center">
                  <p className="text-[8px] font-black text-muted-foreground uppercase">Revenue</p>
                  <p className="text-xs font-bold text-[#5fff9a]">${formatNumber(Number(top3[1].total_earnings))}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* 1st Place */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="order-1 md:order-2"
          >
            <GlassCard className="text-center pt-16 pb-10 border-amber-500/20 relative group hover:border-amber-500/40 glow-amber bg-amber-500/[0.03]">
              <div className="absolute top-4 left-4 text-[10px] font-black text-amber-500/50 uppercase tracking-widest">RANK_01</div>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-500/40 flex items-center justify-center font-heading font-black text-amber-500 text-xl shadow-[0_0_30px_rgba(232,184,0,0.4)] animate-pulse-glow">👑</div>
              <div className="relative w-32 h-32 mx-auto mb-8">
                <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-2xl opacity-40 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-full h-full rounded-full bg-[#0f131f] border-4 border-amber-500/30 overflow-hidden flex items-center justify-center text-amber-500 text-5xl font-black font-heading shadow-inner">
                  {top3[0].avatar_url ? <img src={top3[0].avatar_url} className="w-full h-full object-cover" /> : top3[0].username?.charAt(0)}
                </div>
              </div>
              <h3 className="font-heading font-black text-3xl mb-1 uppercase tracking-tighter truncate px-4">{top3[0].username}</h3>
              <p className="text-amber-500 font-heading font-black text-4xl tracking-tighter">{formatNumber(Number(top3[0].total_distance))} KM</p>
              <div className="flex items-center justify-center gap-6 mt-8">
                <div className="text-center">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Missions</p>
                  <p className="text-lg font-heading font-bold">{top3[0].total_deliveries}</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Surplus</p>
                  <p className="text-lg font-heading font-bold text-[#5fff9a]">${formatNumber(Number(top3[0].total_earnings))}</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                <Zap size={10} className="text-amber-500" />
                <Zap size={10} className="text-amber-500" />
                <Zap size={10} className="text-amber-500" />
              </div>
            </GlassCard>
          </motion.div>

          {/* 3rd Place */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3 }}
            className="order-3 md:order-3"
          >
            <GlassCard className="text-center pt-12 pb-8 border-white/5 relative group hover:border-orange-500/30">
              <div className="absolute top-4 left-4 text-[10px] font-black text-orange-500/50 uppercase tracking-widest">RANK_03</div>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center font-heading font-black text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.2)]">03</div>
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 rounded-full bg-orange-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-full h-full rounded-full bg-[#0f131f] border-2 border-orange-500/20 overflow-hidden flex items-center justify-center text-orange-500 text-3xl font-black font-heading">
                  {top3[2].avatar_url ? <img src={top3[2].avatar_url} className="w-full h-full object-cover" /> : top3[2].username?.charAt(0)}
                </div>
              </div>
              <h3 className="font-heading font-black text-xl mb-1 uppercase truncate px-4">{top3[2].username}</h3>
              <p className="text-orange-500 font-heading font-black text-2xl tracking-tighter">{formatNumber(Number(top3[2].total_distance))} KM</p>
               <div className="flex items-center justify-center gap-4 mt-6">
                <div className="text-center">
                  <p className="text-[8px] font-black text-muted-foreground uppercase">Logs</p>
                  <p className="text-xs font-bold">{top3[2].total_deliveries}</p>
                </div>
                <div className="w-px h-6 bg-white/5" />
                <div className="text-center">
                  <p className="text-[8px] font-black text-muted-foreground uppercase">Revenue</p>
                  <p className="text-xs font-bold text-[#5fff9a]">${formatNumber(Number(top3[2].total_earnings))}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      )}

      {/* Full List */}
      <div className="space-y-3">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="w-12 h-12 border-4 border-[#70eeff] border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(112,238,255,0.3)]" />
            <p className="text-[10px] font-black text-[#70eeff] uppercase tracking-[0.5em]">Synchronizing Network Data...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-white/10 rounded-2xl bg-black/20">
            <Target size={48} className="mx-auto mb-4 text-white/10" />
            <p className="text-muted-foreground text-xs font-black uppercase tracking-widest">No matching operatives detected in current simulation</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {(search ? filtered : rest).map((driver, idx) => {
              const rank = search ? idx + 1 : idx + 4;
              return (
                <motion.div
                  key={driver.user_id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#1b1f2c]/40 border border-white/5 hover:bg-white/[0.08] hover:border-[#70eeff]/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded bg-[#0f131f] border border-white/10 flex items-center justify-center font-heading font-black text-xs text-muted-foreground shrink-0 group-hover:text-[#70eeff] transition-colors">
                    {rank < 10 ? `0${rank}` : rank}
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/10 bg-[#0f131f] flex items-center justify-center text-[#70eeff] font-bold overflow-hidden shrink-0 group-hover:border-[#70eeff]/40 transition-all">
                    {driver.avatar_url ? (
                      <img src={driver.avatar_url} alt={driver.username} className="w-full h-full object-cover" />
                    ) : (driver.username?.charAt(0).toUpperCase() || '?')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-black text-sm uppercase truncate group-hover:text-[#70eeff] transition-colors">{driver.username}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest border-r border-white/10 pr-3">{driver.total_deliveries} LOGS</span>
                      <span className="text-[9px] font-black text-[#5fff9a] uppercase tracking-widest">{formatCurrency(Number(driver.total_earnings))}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1.5 text-muted-foreground text-[9px] font-black uppercase mb-0.5">
                      <MapPin size={10} /> DISTANCE
                    </div>
                    <p className="font-heading font-black text-lg text-white tracking-widest group-hover:text-[#70eeff] transition-colors">
                      {formatNumber(Number(driver.total_distance))} <span className="text-[10px] text-muted-foreground ml-1">KM</span>
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}
