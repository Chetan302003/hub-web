import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useFleetStats, usePersonalStats, useWeeklyData } from '@/hooks/useFleetStats';
import { GlassCard, StatCard, MiniStat } from '@/components/layout/GlassCard';
import { motion } from 'framer-motion';
import {
  MapPin, DollarSign, Users, Package, Trophy, Activity,
  Gauge, Route, Fuel, TrendingUp, Truck, ShieldAlert,
  Link as LinkIcon
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';
import { cn } from '@/lib/utils';

const CHART_COLORS = {
  cyan: 'var(--chart-1)',
  green: 'var(--ok)',
  purple: 'var(--chart-2)',
  amber: 'var(--chart-2)',
  rose: 'var(--bad)',
};

export default function Dashboard() {
  const { user, profile, isApproved } = useAuth();
  const { stats, leaderboard } = useFleetStats();
  const { stats: personalStats } = usePersonalStats(user?.id);
  const { weeklyData } = useWeeklyData();

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toFixed(0);
  };

  const formatCurrency = (num: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3">
          <p className="text-xs font-semibold text-primary mb-2 border-b border-border pb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="flex items-center justify-between gap-4 text-xs">
              <span className="text-muted-foreground uppercase">{entry.name}:</span>
              <span className="font-heading font-bold" style={{ color: entry.color }}>
                {entry.name === 'income' ? formatCurrency(entry.value) : `${formatNumber(entry.value)} KM`}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 lg:space-y-8 pb-12"
    >
      {/* HUD Header */}
      <div className="relative overflow-hidden p-6 rounded-2xl bg-[#1b1f2c]/40 border border-white/5 backdrop-blur-md">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Activity size={120} className="text-[#70eeff]" />
        </div>

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.4em] text-[#70eeff]/60 uppercase">
              <span className="live-indicator" />
              {user ? 'Neural Link Established' : 'Public Fleet Overview'}
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-black tracking-tighter">
              WELCOME, <span className="text-gradient uppercase">{profile?.username || (user ? 'OPERATOR' : 'VISITOR')}</span>
            </h1>
            <p className="text-muted-foreground text-sm font-medium">
              {!user ? 'PUBLIC FLEET DATA / SIGN IN FOR PERSONAL STATS' : isApproved ? "FLEET PROTOCOL ACTIVATED / SYSTEM NOMINAL" : "PUBLIC FLEET OVERVIEW / AUTHORIZATION PENDING"}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-black/40 border border-white/5 p-4 rounded-xl backdrop-blur-xl">
            <div className="text-right">
              <p className="text-[10px] font-bold text-muted-foreground uppercase">System Status</p>
              <p className={cn("text-xs font-heading font-bold", !user ? "text-primary" : isApproved ? "text-[#5fff9a]" : "text-[#e8b800]")}>
                {!user ? "PUBLIC ACCESS" : isApproved ? "FULLY OPERATIONAL" : "PENDING VERIFICATION"}
              </p>
            </div>
            <div className={cn("p-2 rounded-lg", !user ? "bg-primary/10 text-primary" : isApproved ? "bg-[#5fff9a]/10 text-[#5fff9a]" : "bg-[#e8b800]/10 text-[#e8b800]")}>
              {!user ? <Activity size={20} /> : isApproved ? <Activity size={20} /> : <ShieldAlert size={20} />}
            </div>
          </div>
        </div>
      </div>

      {user && !isApproved && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-4 p-6 rounded-2xl bg-[#e8b800]/5 border border-[#e8b800]/20 text-[#e8b800] backdrop-blur-md"
        >
          <div className="p-3 rounded-xl bg-[#e8b800]/10 shrink-0"><Users size={24} /></div>
          <div>
            <h3 className="font-heading font-bold text-lg">OPERATOR VALIDATION REQUIRED</h3>
            <p className="text-sm opacity-80 font-medium">Your account is pending verification. The public fleet overview remains available while your account is reviewed.</p>
          </div>
        </motion.div>
      )}

      {/* Primary Stat Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Fleet Distance"
          value={stats ? `${formatNumber(stats.total_distance)}` : '0'}
          icon={MapPin}
          color="green"
          trend={{ value: "+3.2% LVL", isPositive: true }}
        />
        <StatCard
          label="Mission Successes"
          value={stats ? formatNumber(stats.total_deliveries) : '0'}
          icon={Package}
          color="cyan"
        />
        <StatCard
          label="Total Net Revenue"
          value={stats ? formatNumber(stats.total_income) : '0'}
          prefix="$"
          icon={DollarSign}
          color="amber"
          trend={{ value: "+1.5% LVL", isPositive: true }}
        />
        <StatCard
          label="Active Operatives"
          value={stats?.active_drivers || '0'}
          icon={Users}
          color="purple"
        />
      </div>

      {/* Analytics Command Center */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-heading font-bold flex items-center gap-3 uppercase tracking-tighter">
              <div className="w-2 h-6 bg-[#5fff9a] rounded-full" />
              Logistical Volume / Week
            </h3>
            <div className="text-[10px] font-bold text-muted-foreground border border-white/5 px-2 py-1 rounded bg-white/5">DIST_METRICS_V2</div>
          </div>
          <div className="h-[280px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="distGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={CHART_COLORS.green} stopOpacity={0.4} />
                    <stop offset="100%" stopColor={CHART_COLORS.green} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.2)" fontSize={10} axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} axisLine={false} tickLine={false} dx={-10} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
                <Area type="monotone" dataKey="distance" name="distance" stroke={CHART_COLORS.green} strokeWidth={3} fill="url(#distGrad)" animationDuration={2000} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="border-white/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-heading font-bold flex items-center gap-3 uppercase tracking-tighter">
              <div className="w-2 h-6 bg-[#e8b800] rounded-full" />
              Revenue Projection / Week
            </h3>
            <div className="text-[10px] font-bold text-muted-foreground border border-white/5 px-2 py-1 rounded bg-white/5">FIN_DATA_S04</div>
          </div>
          <div className="h-[280px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart data={weeklyData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.2)" fontSize={10} axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={10} axisLine={false} tickLine={false} dx={-10} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                <Bar dataKey="income" name="income" radius={[4, 4, 0, 0]} animationDuration={1500}>
                  {weeklyData?.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? CHART_COLORS.amber : CHART_COLORS.rose} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Lower Tactical Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-heading font-bold uppercase tracking-tight text-[#70eeff]">Individual Runtime</h3>
            <Gauge size={18} className="text-[#70eeff]/40" />
          </div>
          <div className="space-y-3">
            <MiniStat label="Net Distance" value={personalStats ? `${formatNumber(personalStats.total_distance)} KM` : '0 KM'} icon={MapPin} color="green" />
            <MiniStat label="Successful Logs" value={personalStats?.total_deliveries || 0} icon={Package} color="cyan" />
            <MiniStat label="Gross Earnings" value={personalStats ? `$${formatNumber(personalStats.total_income)}` : '$0'} icon={DollarSign} color="amber" />
            <MiniStat label="Hull Integrity" value={personalStats ? `${(100 - personalStats.avg_damage).toFixed(1)}%` : '100%'} icon={ShieldAlert} color="rose" />
          </div>
        </GlassCard>

        <GlassCard className="lg:col-span-2 border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-heading font-bold uppercase tracking-tight">Vanguard Operatives</h3>
            <Link to="/leaderboard" className="text-[10px] font-black text-[#70eeff] hover:glow-cyan px-2 py-1 border border-[#70eeff]/20 rounded transition-all">VIEW_GLOBAL_RANKINGS</Link>
          </div>
          <div className="space-y-2 max-h-[260px] overflow-y-auto pr-2 custom-scrollbar">
            {leaderboard.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
                <p className="text-muted-foreground text-xs uppercase tracking-widest">Awaiting Simulation Data...</p>
              </div>
            ) : (
              leaderboard.map((driver, index) => (
                <div key={driver.user_id} className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-[#70eeff]/20 transition-all group">
                  <div className={cn(
                    "w-8 h-8 rounded shrink-0 flex items-center justify-center font-heading font-black text-xs",
                    index === 0 ? 'bg-accent text-accent-foreground' :
                      index === 1 ? 'bg-border text-foreground' :
                        index === 2 ? 'bg-chart-2/15 text-chart-2' :
                          'bg-bg text-muted-foreground'
                  )}>
                    {index + 1}
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#70eeff] font-bold overflow-hidden shrink-0 bg-[#0f131f]">
                    {driver.avatar_url ? (
                      <img src={driver.avatar_url} alt={driver.username} className="w-full h-full object-cover" />
                    ) : (driver.username?.charAt(0).toUpperCase() || '?')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-bold text-sm truncate group-hover:text-[#70eeff] transition-colors">{driver.username}</p>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase">{driver.total_deliveries} MISSIONS LOGGED</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-heading font-black text-sm text-[#70eeff]">{formatNumber(Number(driver.total_distance))} KM</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{formatCurrency(Number(driver.total_earnings))}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </GlassCard>
      </div>

      {/* Secondary HUD Footer */}
      <GlassCard className="border-white/5 bg-transparent">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Total Consumption</p>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-heading font-bold text-[#70eeff]">{stats ? formatNumber(stats.total_fuel) : '0'}</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase">LITERS</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-[#70eeff] w-[65%]" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Operational Delta</p>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-heading font-bold text-[#e83553]">{stats ? formatCurrency(stats.total_expenses) : '$0'}</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase">USD</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-[#e83553] w-[40%]" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Projected Surplus</p>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-heading font-bold text-[#5fff9a]">{stats ? formatCurrency(stats.total_profit) : '$0'}</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase">USD</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-[#5fff9a] w-[85%]" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Logistical Mass</p>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-heading font-bold text-[#a855f7]">{stats ? formatNumber(stats.total_load_weight) : '0'}</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase">TONS</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-[#a855f7] w-[55%]" />
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
