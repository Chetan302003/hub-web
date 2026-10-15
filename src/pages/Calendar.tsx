import { useState, useEffect, useMemo, useCallback } from 'react';
import { GlassCard } from '@/components/layout/GlassCard';
import { useTruckersMP, TMPEvent } from '@/hooks/useTruckersMP';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import {
  format, parseISO, isSameDay, startOfMonth, endOfMonth,
  eachDayOfInterval, addMonths, subMonths, getDay, isToday, isSameMonth
} from 'date-fns';
import {
  Calendar as CalendarIcon, Download, RefreshCw, MapPin, Clock, Truck, Globe,
  Users, ChevronLeft, ChevronRight, ExternalLink, X, Gamepad2, Target, Zap, ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface VTCEvent {
  id: string;
  title: string;
  description: string | null;
  event_type: string;
  game: string;
  departure_city: string;
  arrival_city: string;
  start_time: string;
  start_at?: string;
  startAt?: string;
  server_name: string | null;
  banner_url: string | null;
}

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  type: 'tmp' | 'vtc';
  game: string;
  departure: string;
  arrival: string;
  description?: string;
  url?: string;
  attendees?: number;
  server?: string;
  banner?: string;
}

export default function CalendarPage() {
  const { getEvents, getVTCEvents, loading: tmpLoading } = useTruckersMP();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [vtcEvents, setVtcEvents] = useState<VTCEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  useEffect(() => { fetchAllEvents(); }, []);

  const fetchAllEvents = async () => {
    setLoading(true);
    await fetchVTCEvents();
    setLoading(false);
  };


  const fetchVTCEvents = async () => {
    try {
      const [supabaseResponse, tmpVtcEventsData] = await Promise.all([
        supabase.from('vtc_events').select('*').order('start_time', { ascending: true }),
        getVTCEvents().catch(() => [])
      ]);

      const internalEvents = (supabaseResponse.data || []).map(e => ({ ...e, is_internal: true }));
      const { internal = [], attending = [] } = tmpVtcEventsData as any;
      
      const externalInternal = internal.map((e: any) => ({
        id: `tmp-vtc-${e.id}`, title: e.name, description: e.description,
        event_type: e.event_type?.key, game: e.game,
        departure_city: e.departure?.city, arrival_city: e.arrive?.city,
        start_time: (e.start_at || e.startAt || new Date().toISOString()).replace(' ', 'T'),
        server_name: e.server?.name, banner_url: e.banner, is_internal: true
      }));

      const externalAttending = attending.map((e: any) => ({
        id: `tmp-att-${e.id}`, title: e.name, description: e.description,
        event_type: e.event_type?.key, game: e.game,
        departure_city: e.departure?.city, arrival_city: e.arrive?.city,
        start_time: (e.start_at || e.startAt || new Date().toISOString()).replace(' ', 'T'),
        server_name: e.server?.name, banner_url: e.banner, is_internal: false
      }));

      const now = new Date();
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const combined = [...internalEvents, ...externalInternal, ...externalAttending].filter(e =>
        new Date(e.start_time || new Date()).getTime() >= sevenDaysAgo.getTime()
      );
      setVtcEvents(combined as any[]);
    } catch { setVtcEvents([]); }
  };

  const calendarEvents = useMemo((): CalendarEvent[] => {
    const events: CalendarEvent[] = [];
    
    // Process all events from the combined vtcEvents state
    vtcEvents.forEach((event: any) => {
      const startTime = event.start_time || event.startAt || event.start_at || new Date().toISOString();
      events.push({
        id: event.id.toString(),
        title: event.title, 
        start: parseISO(startTime.replace(' ', 'T')),
        type: event.is_internal ? 'vtc' : 'tmp', 
        game: event.game, 
        departure: event.departure_city || 'TBD', 
        arrival: event.arrival_city || 'TBD',
        description: event.description || undefined, 
        server: event.server_name || undefined,
        banner: event.banner_url || undefined
      });
    });

    return events.sort((a, b) => a.start.getTime() - b.start.getTime());
  }, [vtcEvents]);

  const getEventsForDay = useCallback((day: Date) => calendarEvents.filter(e => isSameDay(e.start, day)), [calendarEvents]);

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
    const startPadding = getDay(monthStart);
    const totalCells = Math.ceil((days.length + startPadding) / 7) * 7;
    return [...Array(startPadding).fill(null), ...days, ...Array(totalCells - days.length - startPadding).fill(null)];
  }, [currentMonth]);

  const handleDownloadCalendar = useCallback(() => {
    if (calendarEvents.length === 0) { toast.error('No events to export'); return; }
    const fmtDate = (d: Date) => format(d, "yyyyMMdd'T'HHmmss'Z'");
    const esc = (t: string) => t.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
    let lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Aura VTC Hub//Events//EN', 'METHOD:PUBLISH'];
    calendarEvents.forEach(e => {
      lines.push('BEGIN:VEVENT', `UID:${e.id}@auravtc.hub`, `DTSTAMP:${fmtDate(new Date())}`,
        `DTSTART:${fmtDate(e.start)}`, `DTEND:${fmtDate(new Date(e.start.getTime() + 7200000))}`,
        `SUMMARY:${esc(e.title)}`, `LOCATION:${esc(e.departure)}`);
      if (e.url) lines.push(`URL:${e.url}`);
      lines.push('END:VEVENT');
    });
    lines.push('END:VCALENDAR');
    const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'aura-vtc-events.ics';
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success('EXP_SUCCESS: MISSION_DATA_SAVED');
  }, [calendarEvents]);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-8 pb-12">
      {/* HUD Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.4em] text-[#70eeff] uppercase">
            <Target size={12} />
            Mission Briefing Schedule
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-black tracking-tighter uppercase">
            EVENT_ <span className="text-[#a855f7]">CHRONOLOGY</span>
          </h1>
          <p className="text-muted-foreground text-sm font-medium border-l-2 border-[#a855f7]/30 pl-3 ml-1 mt-2">
            COORDINATING LOGISTICAL OPERATIONS ACROSS THE NETWORK
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <button onClick={fetchAllEvents} disabled={loading || tmpLoading} className="p-3 rounded-xl bg-white/5 border border-white/10 text-foreground hover:bg-white/10 transition-all disabled:opacity-50">
            <RefreshCw size={18} className={cn((loading || tmpLoading) && 'animate-spin')} />
          </button>
          <button onClick={handleDownloadCalendar} disabled={calendarEvents.length === 0} className="btn-primary px-6 py-3 rounded-xl text-xs font-heading font-black uppercase tracking-widest flex items-center gap-2">
            <Download size={16} /> Export_ICS
          </button>
        </div>
      </div>

      {/* Stats Command Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#1b1f2c]/40 border border-white/5 backdrop-blur-md">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Total Operations</p>
          <p className="text-2xl font-heading font-black text-white">{calendarEvents.length}</p>
        </div>
        <div className="p-4 rounded-xl bg-[#1b1f2c]/40 border border-white/5 backdrop-blur-md">
          <p className="text-[10px] font-black text-[#70eeff] uppercase tracking-widest mb-1">Global Events</p>
          <p className="text-2xl font-heading font-black text-[#70eeff]">{vtcEvents.filter((e: any) => !e.is_internal).length}</p>
        </div>
        <div className="p-4 rounded-xl bg-[#1b1f2c]/40 border border-white/5 backdrop-blur-md">
          <p className="text-[10px] font-black text-[#a855f7] uppercase tracking-widest mb-1">Internal Convoys</p>
          <p className="text-2xl font-heading font-black text-[#a855f7]">{vtcEvents.filter((e: any) => e.is_internal).length}</p>
        </div>
        <div className="p-4 rounded-xl bg-black/40 border border-[#5fff9a]/20 backdrop-blur-md border-dashed flex items-center justify-center">
            <p className="text-[10px] font-black text-[#5fff9a] uppercase tracking-[0.2em] animate-pulse">System Live</p>
        </div>
      </div>

      {/* Calendar Grid */}
      <GlassCard className="p-0 border-white/5 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-black/20">
          <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-[#70eeff]">
            <ChevronLeft size={20} />
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-heading font-black uppercase tracking-tighter text-[#70eeff]">{format(currentMonth, 'MMMM yyyy')}</h2>
            <button onClick={() => setCurrentMonth(new Date())} className="text-[10px] font-black text-muted-foreground hover:text-white uppercase tracking-[0.3em] mt-1 transition-colors">Jump_to_Present</button>
          </div>
          <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-[#70eeff]">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7 bg-black/40">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
            <div key={day} className="py-4 text-center text-[10px] font-black text-muted-foreground tracking-widest border-r border-white/5">{day}</div>
          ))}
        </div>

        {loading || tmpLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4 bg-black/20">
            <div className="w-12 h-12 border-4 border-[#a855f7] border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(168,85,247,0.3)]" />
            <p className="text-[10px] font-black text-[#a855f7] uppercase tracking-[0.5em]">Fetching Logistical Data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-7 hud-grid">
            {calendarDays.map((day, index) => {
              const dayEvents = day ? getEventsForDay(day) : [];
              const isCurrMonth = day ? isSameMonth(day, currentMonth) : false;
              const isTod = day ? isToday(day) : false;
              return (
                <div key={index} className={cn(
                  "min-h-[120px] md:min-h-[140px] border-r border-b border-white/5 p-2 transition-all group relative",
                  !isCurrMonth && "bg-black/40 opacity-40 grayscale",
                  isTod && "bg-[#70eeff]/5"
                )}>
                  {day && (
                    <>
                      <div className={cn(
                        "text-right font-heading font-black text-xs mb-2 transition-colors", 
                        isTod ? "text-[#70eeff]" : "text-muted-foreground group-hover:text-white"
                      )}>
                        {format(day, 'dd')}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 3).map(event => (
                          <button 
                            key={event.id} 
                            onClick={() => setSelectedEvent(event)} 
                            className={cn(
                              "w-full text-left p-1.5 rounded border transition-all text-[9px] font-bold uppercase truncate flex items-center gap-1.5",
                              event.type === 'tmp' 
                                ? "bg-[#70eeff]/5 border-[#70eeff]/10 text-[#70eeff] hover:bg-[#70eeff]/15 group/btn" 
                                : "bg-[#a855f7]/5 border-[#a855f7]/10 text-[#a855f7] hover:bg-[#a855f7]/15 group/btn"
                            )}
                          >
                            <div className={cn("w-1 h-1 rounded-full shrink-0 animate-pulse-dot", event.type === 'tmp' ? "bg-[#70eeff]" : "bg-[#a855f7]")} />
                            {event.title}
                          </button>
                        ))}
                        {dayEvents.length > 3 && (
                          <div className="text-[8px] font-black text-muted-foreground text-center uppercase py-1 border border-dashed border-white/5 rounded mt-1">
                            +{dayEvents.length - 3} MORE_MISSIONS
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </GlassCard>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-8 py-4 px-6 rounded-2xl bg-black/20 border border-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-2 tracking-tighter">
            <div className="w-2 h-2 rounded-full bg-[#a855f7] shadow-[0_0_8px_#a855f7]" />
            <span className="text-[10px] font-black uppercase text-muted-foreground">Internal_Fleet</span>
        </div>
        <div className="flex items-center gap-2 tracking-tighter">
            <div className="w-2 h-2 rounded-full bg-[#70eeff] shadow-[0_0_8px_#70eeff]" />
            <span className="text-[10px] font-black uppercase text-muted-foreground">Global_Operations</span>
        </div>
        <div className="flex items-center gap-2 tracking-tighter">
            <div className="w-2 h-2 rounded-full bg-white opacity-40 shadow-[0_0_8px_white]" />
            <span className="text-[10px] font-black uppercase text-muted-foreground">Current_Timezone</span>
        </div>
      </div>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedEvent(null)}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-xl glass-card p-0 relative max-h-[90vh] overflow-hidden border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header Banner */}
              <div className="relative h-48 w-full bg-[#0f131f] border-b border-white/10">
                {selectedEvent.banner ? (
                  <img src={selectedEvent.banner} className="w-full h-full object-cover opacity-60" />
                ) : (
                  <div className="flex items-center justify-center h-full opacity-10">
                    <Truck size={120} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f131f] to-transparent" />
                <div className="absolute bottom-4 left-6">
                    <div className={cn(
                        "inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest mb-2",
                        selectedEvent.type === 'tmp' ? "bg-[#70eeff]/10 text-[#70eeff] border-[#70eeff]/30" : "bg-[#a855f7]/10 text-[#a855f7] border-[#a855f7]/30"
                    )}>
                        {selectedEvent.type === 'tmp' ? 'GLOBAL_OP' : 'FLEET_MISSION'}
                    </div>
                    <h2 className="text-2xl font-heading font-black tracking-tighter uppercase leading-none">{selectedEvent.title}</h2>
                </div>
                <button onClick={() => setSelectedEvent(null)} className="absolute top-4 right-4 p-2 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 text-white transition-all">
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 space-y-6 overflow-y-auto max-h-[calc(90vh-12rem)] custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Temporal Coordinate</p>
                            <div className="flex items-center gap-3 text-white">
                                <Clock size={16} className="text-[#a855f7]" />
                                <span className="font-heading font-bold text-sm uppercase">{format(selectedEvent.start, 'EEEE, MMM dd, yyyy')} | {format(selectedEvent.start, 'HH:mm')} UTC</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Logistical Vector</p>
                            <div className="flex items-center gap-3 text-white">
                                <MapPin size={16} className="text-[#70eeff]" />
                                <span className="font-heading font-bold text-sm uppercase">{selectedEvent.departure} <ArrowRight size={12} className="inline mx-1 opacity-40"/> {selectedEvent.arrival}</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Deployment Server</p>
                            <div className="flex items-center gap-3 text-white">
                                <Globe size={16} className="text-chart-2" />
                                <span className="font-heading font-bold text-sm uppercase">{selectedEvent.server || 'TBD_ENCRYPTED'}</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Verified Participants</p>
                            <div className="flex items-center gap-3 text-white">
                                <Users size={16} className="text-[#5fff9a]" />
                                <span className="font-heading font-bold text-sm uppercase">{selectedEvent.attendees !== undefined ? `${selectedEvent.attendees} UNITS` : 'CALCULATING...'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {selectedEvent.description && (
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Target size={12} /> Mission_Parameters
                    </p>
                    <p className="text-xs text-muted-foreground font-medium leading-[1.8] tracking-wide">{selectedEvent.description}</p>
                  </div>
                )}

                {selectedEvent.url && (
                  <a href={selectedEvent.url} target="_blank" rel="noopener noreferrer" className="btn-primary w-full py-4 rounded-xl font-heading font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 group">
                    View Network Intel
                    <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
