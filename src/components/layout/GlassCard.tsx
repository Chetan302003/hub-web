import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverGlow?: boolean;
}

export function GlassCard({ children, className, hoverGlow = true }: GlassCardProps) {
  return (
    <div className={cn(
      "glass-card p-6 rounded-xl transition-all duration-300",
      hoverGlow && "hover:glow-cyan hover:border-white/10",
      className
    )}>
      {children}
    </div>
  );
}

export function StatCard({ 
  label, 
  value, 
  icon: Icon, 
  color = 'cyan',
  trend,
  prefix,
  suffix
}: { 
  label: string; 
  value: string | number | ReactNode; 
  icon: any; 
  color?: 'cyan' | 'green' | 'amber' | 'purple' | 'rose';
  trend?: { value: string; isPositive: boolean };
  prefix?: string;
  suffix?: string;
}) {
  const colorMap = {
    cyan: 'text-[#70eeff] shadow-[#70eeff]/20',
    green: 'text-[#5fff9a] shadow-[#5fff9a]/20',
    amber: 'text-[#e8b800] shadow-[#e8b800]/20',
    purple: 'text-[#a855f7] shadow-[#a855f7]/20',
    rose: 'text-[#e83553] shadow-[#e83553]/20',
  };

  const iconBgMap = {
    cyan: 'bg-[#70eeff]/10 text-[#70eeff]',
    green: 'bg-[#5fff9a]/10 text-[#5fff9a]',
    amber: 'bg-[#e8b800]/10 text-[#e8b800]',
    purple: 'bg-[#a855f7]/10 text-[#a855f7]',
    rose: 'bg-[#e83553]/10 text-[#e83553]',
  };

  return (
    <GlassCard className="group relative overflow-hidden">
      {/* HUD-style accent line */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-current to-transparent",
        colorMap[color]
      )} />
      
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-2.5 rounded-lg transition-transform duration-300 group-hover:scale-110", iconBgMap[color])}>
          <Icon size={20} />
        </div>
        {trend && (
          <span className={cn(
            "text-[10px] font-bold px-2 py-0.5 rounded-full border",
            trend.isPositive ? "text-green-400 border-green-400/20 bg-green-400/5" : "text-rose-400 border-rose-400/20 bg-rose-400/5"
          )}>
            {trend.value}
          </span>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">{label}</p>
        <div className={cn("text-2xl font-heading font-bold tabular-nums", colorMap[color])}>
          {prefix}{value}{suffix}
        </div>
      </div>
    </GlassCard>
  );
}

export function MiniStat({ label, value, icon: Icon, color = 'cyan' }: { label: string; value: string | number; icon: any; color?: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
      <div className={cn(
        "p-2 rounded-lg transition-transform group-hover:scale-110",
        color === 'green' ? 'text-[#5fff9a] bg-[#5fff9a]/10' :
        color === 'amber' ? 'text-[#e8b800] bg-[#e8b800]/10' :
        color === 'rose' ? 'text-[#e83553] bg-[#e83553]/10' :
        'text-[#70eeff] bg-[#70eeff]/10'
      )}>
        <Icon size={16} />
      </div>
      <div>
        <p className="text-[10px] text-muted-foreground uppercase tracking-tight font-bold">{label}</p>
        <p className="text-sm font-heading font-bold text-foreground">{value}</p>
      </div>
    </div>
  );
}
