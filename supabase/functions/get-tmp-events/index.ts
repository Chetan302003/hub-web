import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const vtcId = 75200;
    
    // Fetch both internal events and global/attending events in parallel
    const [internalRes, attendingRes] = await Promise.all([
      fetch(`https://api.truckersmp.com/v2/vtc/${vtcId}/events`),
      fetch(`https://api.truckersmp.com/v2/vtc/${vtcId}/events/attending`)
    ]);

    const internalData = await internalRes.json();
    const attendingData = await attendingRes.json();

    // Consolidate into a single response
    return new Response(
      JSON.stringify({
        internal: internalData.response || [],
        attending: attendingData.response || [],
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
