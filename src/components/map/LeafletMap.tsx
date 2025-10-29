"use client";

import { useMemo, useState, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Station, WaterQuality } from '@/types';
import { StationCard } from './StationCard';
import { MapControls } from './MapControls';
import { MapLegend } from './MapLegend';
import { MapFilters, FilterState } from './MapFilters';
import type { DisplayMode } from './InteractiveMap';

// Fix Leaflet icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface LeafletMapProps {
  stations: Station[];
  displayMode?: DisplayMode;
  onStationSelect?: (station: Station | null) => void;
  hideControls?: boolean;
}

// Component to expose map instance
function MapController({ 
  onMapReady 
}: { 
  onMapReady: (map: L.Map) => void 
}) {
  const map = useMap();
  
  useEffect(() => {
    onMapReady(map);
  }, [map, onMapReady]);

  return null;
}

// Get color by quality
function getQualityColor(quality: WaterQuality): string {
  switch (quality) {
    case 'Buena':
      return '#10B981'; // emerald-500
    case 'Moderada':
      return '#F59E0B'; // yellow-500
    case 'Peligrosa':
      return '#EF4444'; // red-500
  }
}

export function LeafletMap({ 
  stations, 
  displayMode = 'popup', 
  onStationSelect,
  hideControls = false 
}: LeafletMapProps) {
  const [filteredStations, setFilteredStations] = useState<Station[]>(stations);
  const [map, setMap] = useState<L.Map | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterChange = useCallback((filters: FilterState) => {
    const filtered = stations.filter(station => {
      const q = filters.qualities.has(station.quality);
      const t = !station.trend || filters.trends.has(station.trend);
      return q && t;
    });
    setFilteredStations(filtered);
  }, [stations]);

  const counts = useMemo(() => ({
    Buena: filteredStations.filter(s => s.quality === 'Buena').length,
    Moderada: filteredStations.filter(s => s.quality === 'Moderada').length,
    Peligrosa: filteredStations.filter(s => s.quality === 'Peligrosa').length,
  }), [filteredStations]);

  const handleMarkerClick = useCallback((station: Station) => {
    if (displayMode !== 'popup' && onStationSelect) {
      onStationSelect(station);
    }
  }, [displayMode, onStationSelect]);

  // Control handlers
  const handleZoomIn = () => map?.zoomIn();
  const handleZoomOut = () => map?.zoomOut();
  const handleLocate = () => map?.locate({ setView: true, maxZoom: 13 });
  const handleReset = () => map?.setView([21.5, -104.9], 9);

  return (
    <div className="relative w-full h-full">
      <MapContainer
        id="rivers-map"
        center={[21.5, -104.9]}
        zoom={9}
        scrollWheelZoom={true}
        className="w-full h-full rounded-xl border-2 border-slate-200 shadow-lg z-0"
        style={{ background: '#f1f5f9' }}
        aria-label="Mapa de fuentes de agua"
      >
        <MapController onMapReady={setMap} />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles"
        />

        {filteredStations.map((station) => {
          const position: [number, number] = [station.coordinates[0], station.coordinates[1]];
          const color = getQualityColor(station.quality);

          return (
            <CircleMarker
              key={station.id}
              center={position}
              radius={10}
              pathOptions={{
                fillColor: color,
                fillOpacity: 0.8,
                color: '#fff',
                weight: 3,
              }}
              eventHandlers={{
                click: () => handleMarkerClick(station),
              }}
            >
              {displayMode === 'popup' && (
                <Popup
                  maxWidth={300}
                  minWidth={280}
                  autoPan={true}
                  autoPanPadding={[50, 50]}
                  closeButton={true}
                  className="station-popup"
                >
                  <StationCard station={station} />
                </Popup>
              )}
            </CircleMarker>
          );
        })}
      </MapContainer>

      {/* Map Controls - Hidden when drawer is open on mobile */}
      {!hideControls && (
        <div className="absolute top-4 right-4 z-[500]">
          <MapControls
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onLocate={handleLocate}
            onReset={handleReset}
          />
        </div>
      )}

      {/* Filters - Hidden when drawer is open on mobile */}
      {!hideControls && (
        <div className={`absolute top-4 left-4 max-w-[90vw] sm:max-w-none ${isFilterOpen ? 'z-[600]' : 'z-[500]'}`}>
          <MapFilters 
            onChange={handleFilterChange}
            onOpenChange={setIsFilterOpen}
          />
        </div>
      )}

      {/* Legend - Hidden when drawer is open on mobile */}
      {!hideControls && (
        <div className="absolute bottom-16 left-4 z-[500]">
          <MapLegend counts={counts} />
        </div>
      )}

      {/* Count Badge - Hidden when drawer is open on mobile */}
      {!hideControls && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[500]">
          <div
            className="bg-white/95 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-lg border-2 border-cyan-200"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <p className="text-xs sm:text-sm font-semibold text-slate-900 whitespace-nowrap">
              Mostrando <span className="text-cyan-600">{filteredStations.length}</span> de{' '}
              <span className="text-cyan-600">{stations.length}</span> fuentes
            </p>
          </div>
        </div>
      )}
    </div>
  );
}