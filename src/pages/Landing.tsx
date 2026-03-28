import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useFleetStats } from '@/hooks/useFleetStats';
import { GlassCard, StatCard } from '@/components/layout/GlassCard';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Truck,
  MapPin,
  DollarSign,
  Users,
  Package,
  Gauge,
  Radio,
  Calendar,
  Download,
  ArrowRight,
  Zap,
  Shield,
  Activity,
  Trophy,
} from 'lucide-react';
import { cn } from '@/lib/utils';

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current || target === 0) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  const formatNum = (n: number) => {
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toFixed(0);
  };

  return <span ref={ref}>{prefix}{formatNum(count)}{suffix}</span>;
}

const features = [
  {
    icon: Gauge,
    title: 'Live Telemetry',
    description: 'Real-time truck data — speed, fuel, navigation — streamed directly from ETS2/ATS.',
    color: 'cyan' as const,
  },
  {
    icon: Package,
    title: 'Auto Job Logger',
    description: 'The Hub logs everything — distance, revenue, XP, and cargo damage — automatically.',
    color: 'green' as const,
  },
  {
    icon: Radio,
    title: 'Discord Rich Presence',
    description: 'Broadcast your trucking status to Discord — origin, destination, cargo, speed.',
    color: 'purple' as const,
  },
  {
    icon: Activity,
    title: 'Fleet Analytics',
    description: 'Company-wide charts, leaderboards, and performance tracking for all drivers.',
    color: 'amber' as const,
  },
  {
    icon: Calendar,
    title: 'Event Calendar',
    description: 'View TruckersMP and VTC convoys, set reminders, and export to your calendar.',
    color: 'rose' as const,
  },
  {
    icon: Shield,
    title: 'Role-Based Security',
    description: 'Row-level security with Management, HR, and Driver permission tiers.',
    color: 'cyan' as const,
  },
];

export default function Landing() {
  const { user } = useAuth();
  const { stats, leaderboard } = useFleetStats();
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background HUD Layers */}
      <div className="fixed inset-0 hud-grid pointer-events-none opacity-20" />
      <motion.div style={{ y: y1 }} className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#70eeff]/5 blur-[120px] rounded-full pointer-events-none" />
      <motion.div style={{ y: y2 }} className="absolute top-[40%] -left-40 w-[500px] h-[500px] bg-[#a855f7]/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#70eeff]/10 text-[#70eeff] text-[10px] font-bold uppercase tracking-widest mb-8 border border-[#70eeff]/20 animate-pulse-glow">
            <Zap size={12} />
            Powered by Rust + Tauri
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-heading font-black tracking-tight mb-8 leading-[0.9]">
            <span className="text-white">AURA VTC</span><br />
            <span className="text-gradient">HUB</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            A high-performance command center for{' '}
            <span className="text-foreground font-semibold">ETS2 & ATS</span>.
            Engineered for precision data tracking and professional fleet management.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to={user ? "/dashboard" : "/login"}
              className="btn-primary px-10 py-4 rounded-xl text-lg flex items-center gap-3 transition-all"
            >
              {user ? "Enter Hub Dashboard" : "Login to Terminal"}
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://github.com/Chetan302003/Aura-Hub/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost px-10 py-4 rounded-xl text-lg flex items-center gap-3"
            >
              <Download size={22} />
              Desktop App
            </a>
          </div>
        </motion.div>
      </section>

      {/* Live HUD Stats */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#70eeff]/20" />
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-[#70eeff]/60">Operational Telemetry</h2>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#70eeff]/20" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              label="Fleet Distance"
              value={<AnimatedCounter target={stats?.total_distance || 0} suffix=" KM" />}
              icon={MapPin}
              color="green"
              trend={{ value: "+12.4%", isPositive: true }}
            />
            <StatCard
              label="Active Jobs"
              value={<AnimatedCounter target={stats?.total_deliveries || 0} />}
              icon={Package}
              color="cyan"
            />
            <StatCard
              label="Net Revenue"
              value={<AnimatedCounter target={stats?.total_income || 0} prefix="$" />}
              icon={DollarSign}
              color="amber"
              trend={{ value: "+8.2%", isPositive: true }}
            />
            <StatCard
              label="System Operators"
              value={<AnimatedCounter target={stats?.active_drivers || 0} />}
              icon={Users}
              color="purple"
            />
          </div>
        </div>
      </section>

      {/* Cybernetic Features */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-black mb-4">CYBERNETIC CORE</h2>
            <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold">Standard Hub Integration Protocols</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <GlassCard className="h-full group hover:bg-white/[0.05] border-white/5">
                  <div className={`w-12 h-12 rounded-lg mb-6 flex items-center justify-center transition-transform duration-500 group-hover:rotate-[360deg] ${f.color === 'cyan' ? 'bg-[#70eeff]/10 text-[#70eeff]' :
                    f.color === 'green' ? 'bg-[#5fff9a]/10 text-[#5fff9a]' :
                      f.color === 'purple' ? 'bg-[#a855f7]/10 text-[#a855f7]' :
                        f.color === 'amber' ? 'bg-[#e8b800]/10 text-[#e8b800]' :
                          'bg-[#e83553]/10 text-[#e83553]'
                    }`}>
                    <f.icon size={24} />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-primary transition-colors">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Operatives */}
      {leaderboard.length > 0 && (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-heading font-black mb-2">TOP OPERATIVES</h2>
                <p className="text-[#70eeff]/60 text-xs font-bold uppercase tracking-widest">Global Performance Rankings</p>
              </div>
              <Link to="/hub-app/leaderboard" className="text-sm font-bold text-[#70eeff] hover:underline flex items-center gap-2">
                FULL RANKINGS <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {leaderboard.slice(0, 5).map((d, i) => (
                <GlassCard key={d.user_id} className="text-center group border-white/5">
                  <div className={`text-3xl font-heading font-black mb-4 ${i === 0 ? 'text-[#e8b800]' : i === 1 ? 'text-slate-400' : i === 2 ? 'text-orange-500' : 'text-white/20'
                    }`}>
                    0{i + 1}
                  </div>
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className={cn(
                      "absolute inset-0 rounded-full blur-[10px] opacity-20 group-hover:opacity-60 transition-opacity",
                      i === 0 ? "bg-[#e8b800]" : "bg-[#70eeff]"
                    )} />
                    <div className="relative w-full h-full rounded-full border-2 border-white/10 overflow-hidden bg-muted flex items-center justify-center">
                      {d.avatar_url ? (
                        <img src={d.avatar_url} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-2xl font-bold">{d.username?.charAt(0)}</span>
                      )}
                    </div>
                  </div>
                  <h4 className="font-heading font-bold mb-1 truncate">{d.username}</h4>
                  <div className="text-[#70eeff] font-bold text-sm tracking-tighter">
                    {Number(d.total_distance).toLocaleString()} KM
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase font-black mt-2">
                    {d.total_deliveries} LOGS
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Terminal Footer */}
      <footer className="relative py-12 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
          <Truck size={32} className="text-[#70eeff]/40" />
          <div className="hud-line" />
          <p className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.5em]">
            © 2026 AURA NETWORK PROTOCOL / KEEP ON TRUCKING
          </p>
        </div>
      </footer>
    </div>
  );
}
