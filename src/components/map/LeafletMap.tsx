"use client";

import { useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Station } from '@/types';
import { StationCard } from './StationCard';
import { MapControls } from './MapControls';
import { MapLegend } from './MapLegend';
import { MapFilters, FilterState } from './MapFilters';
import { generateMockReadings } from '@/lib/mockData';
import { createCustomIcon, tileLayerConfig, mapConfig } from '@/lib/mapHelpers';

// Fix de iconos Leaflet en Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface LeafletMapProps { stations: Station[]; }

export function LeafletMap({ stations }: LeafletMapProps) {
  const [filteredStations, setFilteredStations] = useState<Station[]>(stations);

  const handleFilterChange = (filters: FilterState) => {
    const filtered = stations.filter(station => {
      const q = filters.qualities.has(station.quality);
      const t = !station.trend || filters.trends.has(station.trend);
      return q && t;
    });
    setFilteredStations(filtered);
  };

  const counts = useMemo(() => ({
    Buena: filteredStations.filter(s => s.quality === 'Buena').length,
    Moderada: filteredStations.filter(s => s.quality === 'Moderada').length,
    Peligrosa: filteredStations.filter(s => s.quality === 'Peligrosa').length,
  }), [filteredStations]);

  return (
    <div className="relative w-full h-full">
      <MapContainer
        id="rivers-map"
        aria-label="Mapa de fuentes de agua"
        center={mapConfig.center}
        zoom={mapConfig.zoom}
        minZoom={mapConfig.minZoom}
        maxZoom={mapConfig.maxZoom}
        className="w-full h-full rounded-xl shadow-2xl border-2 border-slate-200 z-[1]"
        zoomControl={false}
      >
        <TileLayer {...tileLayerConfig} />
        {filteredStations.map((station) => {
          const latestReading = generateMockReadings(station.id, 1)[0];
          return (
            <Marker
              key={station.id}
              position={station.coordinates} // [lat, lng] ✅
              icon={createCustomIcon(station.quality)}
            >
              <Popup
                /* estilos vienen de globals.css */
                maxWidth={320}
                minWidth={280}
                closeButton={true}
                autoPan
                autoPanPadding={[24, 96]}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: renderToStaticMarkup(
                      <StationCard
                        station={station}
                        latestReading={latestReading}
                        showDetailsButton
                      />
                    )
                  }}
                />
              </Popup>
            </Marker>
          );
        })}

        <MapControls />
      </MapContainer>

      <MapLegend counts={counts} />
      <MapFilters onFilterChange={handleFilterChange} />

      {/* Burbuja: a la derecha, sin tapar el popup */}
      <div className="absolute top-6 right-[88px] sm:right-28 z-[900] pointer-events-none" aria-live="polite">
        <div className="bg-white/95 backdrop-blur-sm px-5 py-2 rounded-full shadow-md border border-slate-200">
          <p className="text-xs font-medium text-slate-700">
            Mostrando <span className="font-bold text-cyan-600">{filteredStations.length}</span> de {stations.length} fuentes de agua
          </p>
        </div>
      </div>
    </div>
  );
}
