CREATE MATERIALIZED VIEW public.public_fleet_stats AS
SELECT
  COALESCE(SUM(COALESCE(j.distance_km, 0)), 0)::numeric AS total_distance,
  COUNT(*)::bigint AS total_deliveries,
  COALESCE(SUM(COALESCE(j.fuel_consumed, 0)), 0)::numeric AS total_fuel,
  COALESCE(SUM(COALESCE(j.income, 0)), 0)::numeric AS total_income,
  COALESCE(SUM(COALESCE(j.expenses, 0)), 0)::numeric AS total_expenses,
  COALESCE(SUM(COALESCE(j.income, 0) - COALESCE(j.expenses, 0)), 0)::numeric AS total_profit,
  COUNT(DISTINCT j.user_id)::bigint AS active_drivers,
  COALESCE(SUM(COALESCE(j.cargo_weight, 0)), 0)::numeric AS total_load_weight
FROM public.job_logs AS j
WHERE j.status = 'delivered';

CREATE MATERIALIZED VIEW public.public_fleet_weekly_data AS
WITH calendar AS (
  SELECT (CURRENT_DATE - gs.day_offset)::date AS delivery_date
  FROM generate_series(6, 0, -1) AS gs(day_offset)
),
daily_totals AS (
  SELECT
    j.delivery_date::date AS delivery_date,
    SUM(COALESCE(j.distance_km, 0))::numeric AS distance,
    SUM(COALESCE(j.income, 0))::numeric AS income
  FROM public.job_logs AS j
  WHERE j.status = 'delivered'
    AND j.delivery_date >= CURRENT_DATE - 6
    AND j.delivery_date < CURRENT_DATE + 1
  GROUP BY j.delivery_date::date
)
SELECT
  calendar.delivery_date,
  CASE EXTRACT(DOW FROM calendar.delivery_date)
    WHEN 0 THEN 'Sun'
    WHEN 1 THEN 'Mon'
    WHEN 2 THEN 'Tue'
    WHEN 3 THEN 'Wed'
    WHEN 4 THEN 'Thu'
    WHEN 5 THEN 'Fri'
    WHEN 6 THEN 'Sat'
  END AS day,
  COALESCE(daily_totals.distance, 0)::numeric AS distance,
  COALESCE(daily_totals.income, 0)::numeric AS income
FROM calendar
LEFT JOIN daily_totals USING (delivery_date);

REVOKE ALL ON TABLE public.public_fleet_stats FROM PUBLIC;
REVOKE ALL ON TABLE public.public_fleet_weekly_data FROM PUBLIC;
GRANT SELECT ON TABLE public.public_fleet_stats TO anon, authenticated;
GRANT SELECT ON TABLE public.public_fleet_weekly_data TO anon, authenticated;

CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;

CREATE OR REPLACE FUNCTION public.refresh_public_fleet_dashboard()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  REFRESH MATERIALIZED VIEW public.public_fleet_stats;
  REFRESH MATERIALIZED VIEW public.public_fleet_weekly_data;
END;
$$;

REVOKE ALL ON FUNCTION public.refresh_public_fleet_dashboard() FROM PUBLIC;

SELECT cron.unschedule(jobid)
FROM cron.job
WHERE jobname = 'refresh-public-fleet-dashboard';

SELECT cron.schedule(
  'refresh-public-fleet-dashboard',
  '*/5 * * * *',
  'SELECT public.refresh_public_fleet_dashboard()'
);
