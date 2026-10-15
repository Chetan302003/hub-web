import { useAuth } from '@/hooks/useAuth';
import { usePersonalStats } from '@/hooks/useFleetStats';
import { GlassCard, StatCard, MiniStat } from '@/components/layout/GlassCard';
import { motion } from 'framer-motion';
import {
  MapPin, DollarSign, Package, Trophy, Activity,
  Gauge, Truck, ShieldAlert, Calendar, Clock, Fuel,
  TrendingUp, ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function MyStats() {
  const { user, profile } = useAuth();
  const { stats, recentJobs, loading } = usePersonalStats(user?.id);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toFixed(0);
  };

  const formatCurrency = (num: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#70eeff]/20 border-t-[#70eeff] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 lg:space-y-8 pb-12"
    >
      {/* HUD Header */}
      <div className="relative overflow-hidden p-8 rounded-3xl bg-[#1b1f2c]/40 border border-white/5 backdrop-blur-md">
        <div className="absolute top-0 right-0 p-6 opacity-5">
          <Trophy size={140} className="text-[#70eeff]" />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#70eeff]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative w-32 h-32 rounded-full border-2 border-[#70eeff]/30 p-1 bg-black/40 overflow-hidden shadow-[0_0_30px_rgba(112,238,255,0.15)]">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="" className="w-full h-full object-cover rounded-full" />
              ) : (
                <div className="w-full h-full bg-[#70eeff]/10 flex items-center justify-center text-[#70eeff] text-4xl font-black">
                  {profile?.username?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          <div className="text-center md:text-left space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#70eeff]/10 border border-[#70eeff]/20 text-[#70eeff] text-[10px] font-black uppercase tracking-[0.2em] mb-2">
              <ShieldAlert size={12} />
              Authenticated Operative
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tighter">
              {profile?.username?.toUpperCase() || 'OPERATOR'}
            </h1>
            <p className="text-muted-foreground font-medium flex items-center justify-center md:justify-start gap-3">
              <span className="text-[#70eeff]">ID_{user?.id.slice(0, 8).toUpperCase()}</span>
              <span className="opacity-20">|</span>
              <span>METH_SYSTEMS_ACCESS_GRANTED</span>
            </p>
          </div>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Operational Distance"
          value={stats ? `${formatNumber(stats.total_distance)}` : '0'}
          suffix=" KM"
          icon={MapPin}
          color="green"
        />
        <StatCard
          label="Missions Completed"
          value={stats ? (stats.total_deliveries) : '0'}
          icon={Package}
          color="cyan"
        />
        <StatCard
          label="Gross Revenue"
          value={stats ? formatNumber(stats.total_income) : '0'}
          prefix="$"
          icon={DollarSign}
          color="amber"
          trend={{ value: "+2.4%", isPositive: true }}
        />
        <StatCard
          label="Fuel Consumed"
          value={stats ? formatNumber(stats.total_fuel) : '0'}
          suffix=" L"
          icon={Fuel}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Metrics */}
        <GlassCard className="border-white/5 h-fit">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
            <h3 className="text-sm font-heading font-black flex items-center gap-3 uppercase tracking-tighter text-[#70eeff]">
              <TrendingUp size={18} />
              Performance metrics
            </h3>
          </div>
          <div className="space-y-4">
            <MiniStat 
                label="Average Integrity" 
                value={stats ? `${(100 - stats.avg_damage).toFixed(1)}%` : '100%'} 
                icon={ShieldAlert} 
                color={stats && stats.avg_damage > 5 ? "rose" : "green"} 
            />
            <div className="h-2 w-full bg-border rounded-full overflow-hidden mb-6">
              <div 
                className={cn(
                    "h-full transition-all duration-1000",
                    stats && stats.avg_damage > 10 ? "bg-[#e83553]" : "bg-[#5fff9a]"
                )}
                style={{ width: `${stats ? 100 - stats.avg_damage : 100}%` }}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">XP Yield</p>
                    <p className="text-lg font-heading font-bold text-white tracking-tight">{(stats?.total_distance || 0) * 1.5} XP</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                    <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">Efficiency</p>
                    <p className="text-lg font-heading font-bold text-[#5fff9a] tracking-tight">{(98.4).toFixed(1)}%</p>
                </div>
            </div>
          </div>
        </GlassCard>

        {/* Recent Job History */}
        <GlassCard className="lg:col-span-2 border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-heading font-black uppercase tracking-tight flex items-center gap-3">
                <Clock size={18} className="text-[#70eeff]" />
                System log history
            </h3>
            <span className="text-[10px] font-bold text-muted-foreground uppercase bg-white/5 px-2 py-1 rounded border border-white/5">Recent_Entries</span>
          </div>

          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {recentJobs.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
                <Activity size={40} className="mx-auto text-muted-foreground/20 mb-4" />
                <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em]">No mission logs synchronized</p>
              </div>
            ) : (
              recentJobs.map((job, index) => (
                <div 
                    key={job.id || index} 
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-[#70eeff]/20 transition-all group"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-[#70eeff]/10 flex items-center justify-center text-[#70eeff] border border-[#70eeff]/20 group-hover:scale-110 transition-transform">
                        <Truck size={24} />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <p className="font-heading font-black text-white group-hover:text-[#70eeff] transition-colors">{job.source_city || job.sourceCity || job.origin_city || job.origin || job.departure_city || job.start_city || 'HUB'}</p>
                            <ArrowLeft size={14} className="rotate-180 text-muted-foreground" />
                            <p className="font-heading font-black text-white group-hover:text-[#70eeff] transition-colors">{job.destination_city || job.destinationCity || job.arrival_city || job.destination || 'TERM'}</p>
                        </div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">
                            {job.cargo || job.cargo_name || job.cargo_type || 'Classified Cargo'}
                        </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:text-right gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
                    <div className="space-y-0.5">
                        <p className="font-heading font-bold text-[#70eeff]">{job.distance_km} KM</p>
                        <p className="text-[9px] font-black text-muted-foreground uppercase tracking-tighter flex items-center justify-end gap-1">
                            <Fuel size={10} /> {job.fuel_consumed || 0}L consumed
                        </p>
                    </div>
                    <div className="space-y-0.5">
                        <p className="font-heading font-bold text-[#5fff9a]">{formatCurrency(job.income || 0)}</p>
                        <p className="text-[9px] font-black text-[#e83553] uppercase tracking-tighter">
                            -{job.damage_percent || 0}% Structural damage
                        </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </GlassCard>
      </div>

      {/* Call to Action */}
      <div className="flex justify-center pt-4">
        <Link to="/dashboard" className="btn-ghost px-8 py-3 rounded-xl flex items-center gap-3 text-xs font-black uppercase tracking-widest">
            <ArrowLeft size={16} />
            Return to dashboard center
        </Link>
      </div>
    </motion.div>
  );
}
