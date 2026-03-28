import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface TMPEvent {
  id: number;
  name: string;
  slug: string;
  game: string;
  server: { id: number; name: string } | null;
  language: string;
  departure: { city: string; location: string };
  arrive: { city: string; location: string };
  start_at: string;
  startAt?: string;
  banner: string | null;
  map: string | null;
  description: string;
  rule: string;
  voice: string;
  url: string;
  attendances: { confirmed: number; unsure: number };
  created_at: string;
  is_internal?: boolean;
}

export function useTruckersMP() {
  const [loading, setLoading] = useState(false);

  const getEvents = useCallback(async (): Promise<TMPEvent[]> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('get-tmp-events');
      if (error) throw error;
      
      // Combine internal and attending events for the general getEvents call
      return [...(data.internal || []), ...(data.attending || [])];
    } catch (error) {
      console.error('Error fetching TMP events via Edge Function:', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getVTCEvents = useCallback(async () => {
    try {
      const { data, error } = await supabase.functions.invoke('get-tmp-events');
      if (error) throw error;
      return data; // Return full consolidated object { internal, attending }
    } catch (error) {
      console.error('Error fetching VTC events from Edge Function:', error);
      return { internal: [], attending: [] };
    }
  }, []);

  return { getEvents, getVTCEvents, loading };
}
