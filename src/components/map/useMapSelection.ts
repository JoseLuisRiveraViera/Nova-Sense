"use client";

import { useState, useCallback } from 'react';
import { Station } from '@/types';

export function useMapSelection() {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const selectStation = useCallback((station: Station | null) => {
    setSelectedStation(station);
    setIsOpen(!!station);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedStation(null);
    setIsOpen(false);
  }, []);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Delay clearing selection to allow exit animation
      setTimeout(() => setSelectedStation(null), 150);
    }
  }, []);

  return {
    selectedStation,
    isOpen,
    selectStation,
    clearSelection,
    handleOpenChange
  };
}