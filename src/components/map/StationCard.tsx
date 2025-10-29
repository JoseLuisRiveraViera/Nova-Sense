"use client";

import { Station } from '@/types';
import { Card } from '@/components/ui/card';
import { StationDetails } from './StationDetails';

interface StationCardProps {
  station: Station;
  onViewStats?: (id: string) => void;
}

export function StationCard({ station, onViewStats }: StationCardProps) {
  return (
    <Card className="border-0 shadow-none overflow-hidden">
      <StationDetails station={station} onViewStats={onViewStats} compact={true} />
    </Card>
  );
}