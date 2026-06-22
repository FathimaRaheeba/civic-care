import React, { useEffect, useRef } from 'react';
import { HiOutlineMap } from 'react-icons/hi2';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || '';
mapboxgl.accessToken = MAPBOX_TOKEN;

export default function IssueMap() {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!MAPBOX_TOKEN || !mapContainerRef.current) return;

    // Centered around Kerala, India coordinates matching the state view bounds
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [76.5, 10.5], 
      zoom: 7.2,
      minZoom: 6,
      maxZoom: 14,
      interactive: true
    });

    map.on('load', () => {
      // Sample map marker hotspots placed within Kerala regions mimicking image_18b2e2.jpg nodes
      const markers = [
        { coords: [76.2999, 9.9816], color: '#ef4444', size: 24 }, // Ernakulam Core Node
        { coords: [76.9366, 8.5241], color: '#3b82f6', size: 16 }, // TVM Node
        { coords: [76.2144, 10.5276], color: '#f97316', size: 18 }, // Thrissur Node
        { coords: [75.7804, 11.2588], color: '#22c55e', size: 14 }  // Kozhikode Node
      ];

      markers.forEach(m => {
        const el = document.createElement('div');
        el.className = 'rounded-full border-2 border-white shadow-sm animate-pulse';
        el.style.backgroundColor = m.color;
        el.style.width = `${m.size}px`;
        el.style.height = `${m.size}px`;

        new mapboxgl.Marker(el)
          .setLngLat(m.coords)
          .addTo(map);
      });
    });

    return () => map.remove();
  }, []);

  return (
    /* ==========================================================================
       ISSUE HEATMAP CONTAINER PANEL
       Uses bg-transparent to preserve your custom oklab layout canvas seamlessly.
       ========================================================================== */
    <section className="w-full bg-transparent py-8 px-4 sm:px-6 lg:px-8 font-sans antialiased text-[rgb(0,0,0)]">
      <div className="max-w-7xl mx-auto flex flex-col">
        
        {/* Top Header Row matching image_18b2e2.jpg typography */}
        <div className="flex items-center justify-between w-full mb-4 select-none">
          <div className="flex items-center space-x-2.5">
            <HiOutlineMap className="w-5 h-5 text-blue-600 stroke-[2.2]" />
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
              Issue Heatmap
            </h2>
          </div>
          
          <a 
            href="#full-map" 
            className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>Open Full Map</span>
            <FiArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>
        </div>

        {/* Viewport Frame Container */}
        <div className="w-full h-[280px] sm:h-[340px] rounded-[24px] overflow-hidden relative shadow-xs border border-slate-200/50">
          
          {MAPBOX_TOKEN ? (
            <div ref={mapContainerRef} className="w-full h-full" />
          ) : (
            /* Fallback Wireframe Vector Layout focused directly on Kerala state geometry maps */
            <div className="w-full h-full bg-slate-100/40 flex items-center justify-center relative">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/1/18/Districts_of_Kerala.png" 
                alt="Static Kerala Location Viewport Layout" 
                className="w-full h-full object-contain opacity-40 mix-blend-multiply select-none p-4"
              />
              
              {/* Floating Hotspot Nodes mapped directly over Kerala regions */}
              <div className="absolute top-[48%] left-[51%] w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-md" />
              <div className="absolute top-[58%] left-[48%] w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md" />
              <div className="absolute top-[42%] left-[45%] w-[18px] h-[18px] bg-amber-500 rounded-full border-2 border-white shadow-md" />
              <div className="absolute top-[34%] left-[42%] w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-md" />
            </div>
          )}

          {/* Top-Left: Floating Mapped Count Badge */}
          <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md border border-slate-100 rounded-xl px-3 py-1.5 shadow-xs select-none">
            <span className="text-[11px] font-bold text-slate-800 tracking-tight">
              5 Issues Mapped
            </span>
          </div>

          {/* Bottom-Right: Floating Action Overlay Capsule */}
          <button className="absolute bottom-4 right-4 z-10 inline-flex items-center space-x-1.5 px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl border border-slate-100 shadow-sm transition-all active:scale-98 cursor-pointer">
            <span>View Full Map</span>
            <FiArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] text-slate-500" />
          </button>

          {/* Attribution Taglet matching Leaflet engine layout footprint */}
          <div className="absolute bottom-0 right-0 z-10 bg-white/80 backdrop-blur-xs text-[9px] font-medium text-slate-400 px-2 py-0.5 pointer-events-none select-none tracking-tight border-tl border-slate-100">
            🇺🇦 <span className="hover:underline text-blue-500">Leaflet</span> | © OpenStreetMap
          </div>

        </div>

      </div>
    </section>
  );
}