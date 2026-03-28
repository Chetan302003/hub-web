import { GlassCard } from '@/components/layout/GlassCard';
import { motion } from 'framer-motion';
import { Map, Truck, Radio, Construction } from 'lucide-react';

export default function Fleet() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-heading-1 font-bold gradient-text">Fleet Overview</h1>
        <p className="text-muted-foreground text-sm sm:text-base mt-1">Live driver tracking & fleet map</p>
      </div>

      <GlassCard className="text-center py-20">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <div className="relative inline-block mb-6">
            <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
              <Map size={48} className="text-primary" />
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-amber/20 flex items-center justify-center">
              <Construction size={20} className="text-amber" />
            </div>
          </div>

          <h2 className="text-2xl font-heading font-bold mb-3">Under Development</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            The Fleet Overview with live driver positioning on an interactive Mapbox map is currently under development.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="p-4 rounded-xl bg-secondary/30 border border-border/30">
              <Truck size={24} className="text-cyan mx-auto mb-2" />
              <p className="text-sm font-medium">Live Positions</p>
              <p className="text-xs text-muted-foreground mt-1">Real-time driver tracking via TruckersMP API</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/30 border border-border/30">
              <Map size={24} className="text-green mx-auto mb-2" />
              <p className="text-sm font-medium">Interactive Map</p>
              <p className="text-xs text-muted-foreground mt-1">Mapbox-powered 2D map with driver markers</p>
            </div>
            <div className="p-4 rounded-xl bg-secondary/30 border border-border/30">
              <Radio size={24} className="text-purple mx-auto mb-2" />
              <p className="text-sm font-medium">Convoy Planning</p>
              <p className="text-xs text-muted-foreground mt-1">Coordinate meetups with nearby drivers</p>
            </div>
          </div>
        </motion.div>
      </GlassCard>
    </motion.div>
  );
}
