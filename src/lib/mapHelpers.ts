//import L from 'leaflet';
//import { WaterQuality } from '@/types';

/**
 * Creates custom marker icon based on water quality
 */
// export function createCustomIcon(quality: WaterQuality): L.DivIcon {
//   const config = {
//     Buena: {
//       color: '#10B981',
//       emoji: '💧',
//       size: 32
//     },
//     Moderada: {
//       color: '#F59E0B',
//       emoji: '⚠️',
//       size: 32
//     },
//     Peligrosa: {
//       color: '#EF4444',
//       emoji: '🚫',
//       size: 32
//     }
//   };

//   const { color, emoji, size } = config[quality];

//   return L.divIcon({
//     html: `
//       <div style="
//         width: ${size}px;
//         height: ${size}px;
//         background: ${color};
//         border: 3px solid white;
//         border-radius: 50%;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         font-size: 16px;
//         box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
//         cursor: pointer;
//         transition: transform 0.2s ease;
//       " class="custom-marker">
//         ${emoji}
//       </div>
//     `,
//     className: 'custom-marker-container',
//     iconSize: [size, size],
//     iconAnchor: [size / 2, size / 2],
//     popupAnchor: [0, -size / 2]
//   });
// }

/**
 * Tile layer configuration for OpenStreetMap
 */
export const tileLayerConfig = {
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
};

/**
 * Default map configuration
 */
export const mapConfig = {
  center: [21.5, -104.9] as [number, number],
  zoom: 9,
  minZoom: 8,
  maxZoom: 18,
  scrollWheelZoom: false
};