import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface FleetStats {
  total_distance: number;
  total_deliveries: number;
  total_fuel: number;
  total_income: number;
  total_expenses: number;
  total_profit: number;
  active_drivers: number;
  total_load_weight: number;
}

interface LeaderboardEntry {
  user_id: string;
  username: string;
  avatar_url: string | null;
  total_distance: number;
  total_deliveries: number;
  total_earnings: number;
}

interface PublicWeeklyData {
  day: string;
  distance: number | string;
  income: number | string;
}

export function useFleetStats() {
  const [stats, setStats] = useState<FleetStats | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('public_fleet_stats')
        .select('*')
        .single();
      if (error) throw error;

      if (!data) throw new Error('Fleet stats view returned no totals');

      setStats({
        total_distance: Number(data.total_distance),
        total_deliveries: Number(data.total_deliveries),
        total_fuel: Number(data.total_fuel),
        total_income: Number(data.total_income),
        total_expenses: Number(data.total_expenses),
        total_profit: Number(data.total_profit),
        active_drivers: Number(data.active_drivers),
        total_load_weight: Number(data.total_load_weight)
      });
    } catch (err: any) {
      console.error('Error fetching fleet stats:', err);
      setError(err.message);
    }
  };

  const fetchLeaderboard = async (limit = 10) => {
    try {
      const { data, error } = await supabase.rpc('get_leaderboard', { limit_count: limit });
      if (error) throw error;
      setLeaderboard(data as unknown as LeaderboardEntry[]);
    } catch (err: any) {
      console.error('Error fetching leaderboard:', err);
      setError(err.message);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchStats(), fetchLeaderboard()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const refresh = async () => {
    setLoading(true);
    await Promise.all([fetchStats(), fetchLeaderboard()]);
    setLoading(false);
  };

  return { stats, leaderboard, loading, error, refresh };
}

export function usePersonalStats(userId: string | undefined) {
  const [stats, setStats] = useState<{
    total_distance: number;
    total_deliveries: number;
    total_income: number;
    total_fuel: number;
    avg_damage: number;
  } | null>(null);
  const [recentJobs, setRecentJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchPersonalStats = async () => {
      setLoading(true);
      try {
        const { data: allJobs, error } = await (supabase as any)
          .from('job_logs')
          .select('*')
          .eq('user_id', userId)
          .order('delivery_date', { ascending: false });

        if (error) throw error;

        if (allJobs && allJobs.length > 0) {
          const deliveredJobs = allJobs.filter((j: any) => j.status === 'delivered' || !j.status);
          const total_distance = deliveredJobs.reduce((sum: number, j: any) => sum + Number(j.distance_km || 0), 0);
          const total_income = deliveredJobs.reduce((sum: number, j: any) => sum + Number(j.income || 0), 0);
          const total_fuel = deliveredJobs.reduce((sum: number, j: any) => sum + Number(j.fuel_consumed || 0), 0);
          const avg_damage = deliveredJobs.length > 0
            ? deliveredJobs.reduce((sum: number, j: any) => sum + Number(j.damage_percent || 0), 0) / deliveredJobs.length
            : 0;

          setStats({ total_distance, total_deliveries: deliveredJobs.length, total_income, total_fuel, avg_damage });
          setRecentJobs(allJobs.slice(0, 100));
        } else {
          setStats({ total_distance: 0, total_deliveries: 0, total_income: 0, total_fuel: 0, avg_damage: 0 });
          setRecentJobs([]);
        }
      } catch (err) {
        console.error('Error fetching personal stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalStats();
  }, [userId]);

  return { stats, recentJobs, loading };
}

export function useWeeklyData() {
  const [weeklyData, setWeeklyData] = useState<{ day: string; distance: number; income: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeeklyData = async () => {
      setLoading(true);
      try {
        const { data, error } = await (supabase as any)
          .from('public_fleet_weekly_data')
          .select('day, distance, income')
          .order('delivery_date', { ascending: true });
        if (error) throw error;

        const weeklyRows = (data || []) as PublicWeeklyData[];
        setWeeklyData(weeklyRows.map((day) => ({
          day: day.day,
          distance: Number(day.distance),
          income: Number(day.income)
        })));
      } catch (err) {
        console.error('Error fetching weekly data:', err);
        setWeeklyData([
          { day: 'Mon', distance: 0, income: 0 },
          { day: 'Tue', distance: 0, income: 0 },
          { day: 'Wed', distance: 0, income: 0 },
          { day: 'Thu', distance: 0, income: 0 },
          { day: 'Fri', distance: 0, income: 0 },
          { day: 'Sat', distance: 0, income: 0 },
          { day: 'Sun', distance: 0, income: 0 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyData();
  }, []);

  return { weeklyData, loading };
}
