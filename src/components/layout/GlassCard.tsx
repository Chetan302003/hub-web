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
      "glass-card p-[18px] rounded-[14px] transition-colors duration-200",
      hoverGlow && "hover:bg-elev hover:border-border-strong",
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
    cyan: 'text-primary',
    green: 'text-ok',
    amber: 'text-chart-2',
    purple: 'text-chart-2',
    rose: 'text-bad',
  };

  const iconBgMap = {
    cyan: 'bg-primary/10 text-primary',
    green: 'bg-ok/10 text-ok',
    amber: 'bg-chart-2/10 text-chart-2',
    purple: 'bg-chart-2/10 text-chart-2',
    rose: 'bg-bad/10 text-bad',
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
            trend.isPositive ? "text-ok border-ok/20 bg-ok/5" : "text-bad border-bad/20 bg-bad/5"
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
        color === 'green' ? 'text-ok bg-ok/10' :
        color === 'amber' ? 'text-chart-2 bg-chart-2/10' :
        color === 'rose' ? 'text-bad bg-bad/10' :
        'text-primary bg-primary/10'
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
