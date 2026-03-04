import React from "react";
import ThermodynamicGrid from "@/components/ui/interactive-thermodynamic-grid";
import { Activity, Server, Zap, ArrowRight } from "lucide-react";

export default function ThermalDemo() {
  return (
    <div className="relative w-full h-screen font-sans bg-[#050505] text-white">
      <div className="absolute left-4 top-4 z-20 flex items-center gap-3 text-xs">
        <Activity className="h-4 w-4 text-white/80" />
        <Server className="h-4 w-4 text-white/80" />
        <Zap className="h-4 w-4 text-white/80" />
        <ArrowRight className="h-4 w-4 text-white/80" />
        <span className="ml-2 text-white/70">Interactive thermodynamic grid</span>
      </div>

      <ThermodynamicGrid
        resolution={12} // Finer detail
        coolingFactor={0.96} // Long heat trails
      />
    </div>
  );
}
