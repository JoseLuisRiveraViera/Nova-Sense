import L from 'leaflet';
import { Station } from '@/types';

/** Color del marcador por calidad */
export function getColorByQuality(quality: Station['quality']): string {
  switch (quality) {
    case 'Buena': return '#10B981'; // emerald-500
    case 'Moderada': return '#F59E0B'; // yellow-500
    case 'Peligrosa': return '#EF4444'; // red-500
    default: return '#3B82F6'; // blue-500
  }
}

/** Fondo del popup por calidad */
export function getBackgroundByQuality(quality: Station['quality']): string {
  switch (quality) {
    case 'Buena': return 'from-green-50 to-emerald-50';
    case 'Moderada': return 'from-yellow-50 to-orange-50';
    case 'Peligrosa': return 'from-red-50 to-rose-50';
    default: return 'from-blue-50 to-cyan-50';
  }
}

/** Borde por calidad */
export function getBorderColorByQuality(quality: Station['quality']): string {
  switch (quality) {
    case 'Buena': return 'border-green-300';
    case 'Moderada': return 'border-yellow-300';
    case 'Peligrosa': return 'border-red-300';
    default: return 'border-blue-300';
  }
}

/** Emoji por calidad */
export function getEmojiByQuality(quality: Station['quality']): string {
  switch (quality) {
    case 'Buena': return '✅';
    case 'Moderada': return '⚠️';
    case 'Peligrosa': return '🚫';
    default: return '💧';
  }
}

/** Mensaje por calidad (lenguaje ciudadano) */
export function getMessageByQuality(quality: Station['quality']): string {
  switch (quality) {
    case 'Buena': return 'Apta para consumo humano';
    case 'Moderada': return 'Solo para riego — no consumir';
    case 'Peligrosa': return 'No usar — agua contaminada';
    default: return 'Estado desconocido';
  }
}

/** Icono personalizado del marcador */
export function createCustomIcon(quality: Station['quality']): L.DivIcon {
  const color = getColorByQuality(quality);
  const emoji = getEmojiByQuality(quality);

  return L.divIcon({
    html: `
      <div class="relative">
        <div class="w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white" style="background-color:${color}">
          <span class="text-lg">${emoji}</span>
        </div>
        <div class="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-r-2 border-b-2 border-white" style="background-color:${color}"></div>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
}

/** Config de tiles */
export const tileLayerConfig = {
  url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  maxZoom: 19,
};

/** Config inicial del mapa (Nayarit) */
export const mapConfig = {
  center: [21.5, -104.9] as [number, number],
  zoom: 9,
  minZoom: 8,
  maxZoom: 18,
};
