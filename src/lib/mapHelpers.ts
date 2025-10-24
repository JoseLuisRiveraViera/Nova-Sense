import L from 'leaflet';
import { Station } from '@/types';

/**
 * Obtiene el color del marcador según la calidad del agua
 */
export function getColorByQuality(quality: Station['quality']): string {
  switch (quality) {
    case 'Buena':
      return '#10b981'; // green-500
    case 'Moderada':
      return '#f59e0b'; // yellow-500
    case 'Peligrosa':
      return '#ef4444'; // red-500
    default:
      return '#3b82f6'; // blue-500
  }
}

/**
 * Obtiene el color de fondo del popup según la calidad
 */
export function getBackgroundByQuality(quality: Station['quality']): string {
  switch (quality) {
    case 'Buena':
      return 'from-green-50 to-emerald-50';
    case 'Moderada':
      return 'from-yellow-50 to-orange-50';
    case 'Peligrosa':
      return 'from-red-50 to-rose-50';
    default:
      return 'from-blue-50 to-cyan-50';
  }
}

/**
 * Obtiene el color del borde según la calidad
 */
export function getBorderColorByQuality(quality: Station['quality']): string {
  switch (quality) {
    case 'Buena':
      return 'border-green-300';
    case 'Moderada':
      return 'border-yellow-300';
    case 'Peligrosa':
      return 'border-red-300';
    default:
      return 'border-blue-300';
  }
}

/**
 * Obtiene el emoji según la calidad
 */
export function getEmojiByQuality(quality: Station['quality']): string {
  switch (quality) {
    case 'Buena':
      return '✅';
    case 'Moderada':
      return '⚠️';
    case 'Peligrosa':
      return '🚫';
    default:
      return '💧';
  }
}

/**
 * Obtiene el mensaje descriptivo según la calidad
 */
export function getMessageByQuality(quality: Station['quality']): string {
  switch (quality) {
    case 'Buena':
      return 'Apta para consumo humano';
    case 'Moderada':
      return 'Solo para riego - No consumir';
    case 'Peligrosa':
      return 'No usar - Agua contaminada';
    default:
      return 'Estado desconocido';
  }
}

/**
 * Crea un icono personalizado para el marcador
 */
export function createCustomIcon(quality: Station['quality']): L.DivIcon {
  const color = getColorByQuality(quality);
  const emoji = getEmojiByQuality(quality);
  
  return L.divIcon({
    html: `
      <div class="relative">
        <div class="w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white" 
             style="background-color: ${color};">
          <span class="text-lg">${emoji}</span>
        </div>
        <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 rotate-45 border-r-2 border-b-2 border-white" 
             style="background-color: ${color};"></div>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
}

/**
 * Crea un icono para cluster de marcadores
 */
export function createClusterIcon(cluster: any): L.DivIcon {
  const count = cluster.getChildCount();
  let size = 'small';
  let sizeClass = 'w-10 h-10 text-sm';
  
  if (count > 10) {
    size = 'medium';
    sizeClass = 'w-12 h-12 text-base';
  }
  if (count > 50) {
    size = 'large';
    sizeClass = 'w-14 h-14 text-lg';
  }

  return L.divIcon({
    html: `
      <div class="${sizeClass} rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white 
                  flex items-center justify-center font-bold shadow-lg border-2 border-white">
        ${count}
      </div>
    `,
    className: 'custom-cluster-icon',
    iconSize: [40, 40],
  });
}

/**
 * Configuración de tiles para el mapa
 */
export const tileLayerConfig = {
  url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  maxZoom: 19,
};

/**
 * Configuración inicial del mapa (centrado en Nayarit)
 */
export const mapConfig = {
  center: [21.5, -104.9] as [number, number],
  zoom: 9,
  minZoom: 8,
  maxZoom: 18,
};