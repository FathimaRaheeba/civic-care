import React, { useState, useEffect, useRef } from 'react';
import { HiOutlineMap, HiOutlineArrowUpRight, HiMapPin } from 'react-icons/hi2';
import { FiX } from 'react-icons/fi';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Load Mapbox Token
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || '';
mapboxgl.accessToken = MAPBOX_TOKEN;

// Local simulated issue points around Kochi
const issuesData = [
  { id: '1', category: 'Potholes', lat: 9.9750, lng: 76.2820, intensity: 5, location: 'MG Road', description: 'Deep crater on the main lane causing traffic delays.' },
  { id: '2', category: 'Flooding', lat: 9.9850, lng: 76.2750, intensity: 4, location: 'Marine Drive', description: 'Water clogging on walkways after high tide.' },
  { id: '3', category: 'Electricity', lat: 10.0250, lng: 76.3100, intensity: 3, location: 'Edappally', description: 'Hanging high-voltage cable near metro pillar.' },
  { id: '4', category: 'Waste Management', lat: 10.0050, lng: 76.2980, intensity: 2, location: 'Kaloor', description: 'Uncollected garbage pile near bus shelter.' },
  { id: '5', category: 'Traffic', lat: 9.9700, lng: 76.3200, intensity: 4, location: 'Vytilla', description: 'Gridlock at junction due to faulty signal lights.' }
];

export default function IssueMap() {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Initialize Mapbox map
  useEffect(() => {
    if (!MAPBOX_TOKEN || !mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11', // Dark Snapchat aesthetic
      center: [76.2999, 9.9816], // Kochi center
      zoom: 11.2,
      minZoom: 9,
      maxZoom: 16
    });

    mapRef.current = map;

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');

    map.on('style.load', () => {
      // Add issues geojson source
      map.addSource('issues', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: issuesData.map(issue => ({
            type: 'Feature',
            properties: {
              id: issue.id,
              category: issue.category,
              location: issue.location,
              description: issue.description,
              intensity: issue.intensity
            },
            geometry: {
              type: 'Point',
              coordinates: [issue.lng, issue.lat]
            }
          }))
        }
      });

      // Snapchat-style heatmap layer
      map.addLayer({
        id: 'issues-heat',
        type: 'heatmap',
        source: 'issues',
        maxzoom: 15,
        paint: {
          'heatmap-weight': [
            'interpolate',
            ['linear'],
            ['get', 'intensity'],
            0, 0,
            5, 1.2
          ],
          'heatmap-intensity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            9, 1.5,
            15, 3
          ],
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(0, 0, 255, 0)',
            0.2, 'rgba(56, 189, 248, 0.45)',  // Blue
            0.4, 'rgba(34, 197, 94, 0.7)',    // Green
            0.6, 'rgba(234, 179, 8, 0.85)',   // Yellow
            0.8, 'rgba(249, 115, 22, 0.95)',  // Orange
            1.0, 'rgba(239, 68, 68, 1)'       // Red
          ],
          'heatmap-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            9, 15,
            15, 35
          ],
          'heatmap-opacity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            11, 0.85,
            15, 0.15
          ]
        }
      });

      // Point circles layer for close zoom levels
      map.addLayer({
        id: 'issues-point',
        type: 'circle',
        source: 'issues',
        paint: {
          'circle-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            9, [
              'interpolate',
              ['linear'],
              ['get', 'intensity'],
              1, 5,
              5, 9
            ],
            16, [
              'interpolate',
              ['linear'],
              ['get', 'intensity'],
              1, 12,
              5, 24
            ]
          ],
          'circle-color': [
            'match',
            ['get', 'category'],
            'Potholes', '#ef4444',
            'Flooding', '#3b82f6',
            'Electricity', '#f97316',
            'Waste Management', '#10b981',
            'Traffic', '#eab308',
            '#ef4444' // fallback red
          ],
          'circle-stroke-width': 2.5,
          'circle-stroke-color': '#ffffff',
          'circle-opacity': 0.85
        }
      });
    });

    // Point click handler popup
    map.on('click', 'issues-point', (e) => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const { category, location, description } = e.features[0].properties;

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup({ className: 'custom-mapbox-popup', closeButton: true })
        .setLngLat(coordinates)
        .setHTML(`
          <div style="font-family: system-ui, sans-serif; padding: 4px; min-width: 140px;">
            <h4 style="margin: 0 0 3px 0; font-weight: 800; font-size: 13px; color: #1e293b;">${category}</h4>
            <p style="margin: 0 0 6px 0; font-size: 11px; color: #64748b; font-weight: 600;">Location: ${location}</p>
            <span style="font-size: 11px; color: #334155; line-height: 1.45; display: block;">${description}</span>
          </div>
        `)
        .addTo(map);
    });

    // Pointer cursor updates
    map.on('mouseenter', 'issues-point', () => {
      map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'issues-point', () => {
      map.getCanvas().style.cursor = '';
    });

    return () => {
      map.remove();
    };
  }, []);

  // Recalculate canvas size on transition to fullscreen
  useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current.resize();
      }, 150);
    }
  }, [isFullscreen]);

  return (
    <section className="w-full bg-white py-8 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      {/* Popups override styles matching district map style */}
      <style>{`
        .custom-mapbox-popup .mapboxgl-popup-content {
          border-radius: 12px !important;
          padding: 12px 14px !important;
          box-shadow: 0 8px 20px -4px rgba(0, 0, 0, 0.08) !important;
          border: 1px solid rgba(226, 232, 240, 0.8) !important;
        }
        .custom-mapbox-popup .mapboxgl-popup-close-button {
          color: #94a3b8 !important;
          outline: none !important;
          padding: 2px 6px !important;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Row Panel */}
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="flex items-center space-x-2 text-slate-900">
            <HiOutlineMap className="w-5 h-5 text-blue-600 stroke-[2.2]" />
            <h3 className="text-lg font-extrabold tracking-tight">
              Issue Heatmap
            </h3>
          </div>
          
          <button 
            onClick={() => setIsFullscreen(true)}
            className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors group cursor-pointer"
          >
            <span>Open Full Map</span>
            <HiOutlineArrowUpRight className="w-3.5 h-3.5 stroke-[2.5] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Map Container Viewport Box - Fullscreen responsive toggle */}
        <div className={isFullscreen 
          ? "fixed inset-0 z-50 w-screen h-screen bg-slate-900 flex flex-col" 
          : "relative w-full h-[260px] sm:h-[320px] rounded-2xl overflow-hidden border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] bg-slate-100 group"
        }>
          
          {MAPBOX_TOKEN ? (
            <>
              {/* Map Canvas */}
              <div ref={mapContainerRef} className="w-full h-full" />

              {/* Fullscreen Close Button */}
              {isFullscreen && (
                <button 
                  onClick={() => setIsFullscreen(false)}
                  className="absolute top-4 right-4 z-50 bg-white/95 backdrop-blur-md hover:bg-white border border-slate-100 rounded-full p-2.5 shadow-lg text-slate-800 transition-all hover:scale-105 cursor-pointer"
                  title="Exit Fullscreen"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}

              {/* Fullscreen Legend */}
              {isFullscreen && (
                <div className="absolute bottom-6 left-6 z-10 bg-white/95 backdrop-blur-md border border-slate-100 shadow-md rounded-xl p-3.5 max-w-xs pointer-events-none">
                  <h4 className="text-[11px] font-extrabold text-slate-800 mb-1">Issue Density</h4>
                  <div className="w-28 h-2 rounded-full bg-gradient-to-r from-sky-400 via-green-400 to-red-500 mb-1" />
                  <div className="flex justify-between items-center text-[8px] font-bold text-slate-400 uppercase">
                    <span>Low</span>
                    <span>High</span>
                  </div>
                </div>
              )}

              {/* Inline layout action controls */}
              {!isFullscreen && (
                <div className="absolute bottom-4 right-4 flex flex-col items-end space-y-2 z-10 pointer-events-none">
                  <button 
                    onClick={() => setIsFullscreen(true)}
                    className="bg-white hover:bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-1.5 shadow-sm text-slate-800 font-bold text-xs flex items-center space-x-1.5 transition-colors pointer-events-auto cursor-pointer"
                  >
                    <span>View Full Map</span>
                    <HiOutlineArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                  </button>
                  
                  <div className="bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded-md text-[9px] font-bold text-slate-400 border border-slate-100 select-none">
                    🗺️ Mapbox | © OpenStreetMap
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Fallback layout when MAPBOX_TOKEN is missing */
            <>
              {/* Mockup Map Canvas Pattern Layer (Matches Leaflet / OpenStreetMap styling) */}
              <div 
                className="absolute inset-0 w-full h-full bg-cover bg-center select-none opacity-90 transition-transform duration-700 group-hover:scale-[1.02]" 
                style={{ 
                  backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/-74.04,40.73,11.5,0/1200x400?access_token=mock')`,
                  backgroundColor: '#f1f5f9'
                }} 
              />

              {/* Fallback procedural grid background to look like an active dashboard canvas layout */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 pointer-events-none" />

              {/* Floating Metric Count Badge (Top Left Corner) */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs border border-slate-200/50 rounded-xl px-3 py-1.5 shadow-sm pointer-events-none z-10">
                <span className="text-xs font-bold text-slate-800 tracking-tight">
                  5 Issues Mapped
                </span>
              </div>

              {/* Interactive Core Pin Group Cluster Mockup */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  
                  {/* Hotspot Pulse Layer Effect */}
                  <div className="absolute w-12 h-12 bg-rose-500/20 rounded-full animate-ping pointer-events-none" />
                  
                  {/* Hotspot Indicator 1: Red Center Pin */}
                  <div className="absolute transform translate-x-3 -translate-y-2 w-7 h-7 bg-rose-500 rounded-full border-2 border-white shadow-md flex items-center justify-center pointer-events-auto cursor-pointer transition-transform hover:scale-110">
                    <HiMapPin className="w-3.5 h-3.5 text-white" />
                  </div>

                  {/* Hotspot Indicator 2: Blue Secondary Pin */}
                  <div className="absolute transform -translate-x-3 translate-y-1 w-6 h-6 bg-blue-600 rounded-full border-2 border-white shadow-md flex items-center justify-center pointer-events-auto cursor-pointer transition-transform hover:scale-110">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>

                  {/* Hotspot Indicator 3: Orange Secondary Pin */}
                  <div className="absolute transform -translate-x-1.5 -translate-y-4 w-5 h-5 bg-amber-500 rounded-full border-2 border-white shadow-md flex items-center justify-center pointer-events-auto cursor-pointer transition-transform hover:scale-110">
                    <div className="w-1 h-1 bg-white rounded-full" />
                  </div>

                  {/* Hotspot Indicator 4: Green Secondary Pin */}
                  <div className="absolute transform translate-x-2 translate-y-4 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white shadow-md flex items-center justify-center pointer-events-auto cursor-pointer transition-transform hover:scale-110">
                    <div className="w-1 h-1 bg-white rounded-full" />
                  </div>

                </div>
              </div>

              {/* Bottom Right Control Action Button */}
              <div className="absolute bottom-4 right-4 flex flex-col items-end space-y-2 z-10">
                <button 
                  onClick={() => setIsFullscreen(true)}
                  className="bg-white hover:bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-1.5 shadow-sm text-slate-800 font-bold text-xs flex items-center space-x-1.5 transition-colors pointer-events-auto cursor-pointer"
                >
                  <span>View Full Map</span>
                  <HiOutlineArrowUpRight className="w-3 h-3 stroke-[2.5]" />
                </button>
                
                {/* OpenStreetMap / Leaflet Brand Credit Bar */}
                <div className="bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded-md text-[9px] font-bold text-slate-400 border border-slate-100 select-none pointer-events-none">
                  🗺️ Leaflet | © OpenStreetMap
                </div>
              </div>
            </>
          )}

        </div>

      </div>
    </section>
  );
}