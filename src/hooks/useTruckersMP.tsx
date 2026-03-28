import { useState, useCallback } from 'react';

export interface TMPEvent {
  id: number;
  name: string;
  slug: string;
  game: string;
  server: { id: number; name: string } | null;
  language: string;
  departure: { city: string; location: string };
  arrive: { city: string; location: string };
  startAt: string;
  banner: string | null;
  map: string | null;
  description: string;
  rule: string;
  voice: string;
  url: string;
  attendances: { confirmed: number; unsure: number };
  created_at: string;
  updated_at: string;
}

export function useTruckersMP() {
  const [loading, setLoading] = useState(false);

  const getEvents = useCallback(async (): Promise<TMPEvent[]> => {
    setLoading(true);
    try {
      const response = await fetch('https://api.truckersmp.com/v2/events');
      const data = await response.json();
      return data.response || [];
    } catch (error) {
      console.error('Error fetching TMP events:', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getVTCEvents = useCallback(async () => {
    try {
      const response = await fetch('https://api.truckersmp.com/v2/vtc/75200/events');
      const data = await response.json();
      return data.response || [];
    } catch (error) {
      console.error('Error fetching VTC events from TMP:', error);
      return [];
    }
  }, []);

  return { getEvents, getVTCEvents, loading };
}
