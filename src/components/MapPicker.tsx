import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';

interface MapPickerProps {
  initialLat?: number;
  initialLng?: number;
  onLocationSelect?: (lat: number, lng: number) => void;
  readonly?: boolean;
}

const LocationMarker: React.FC<{ 
  position: LatLngExpression | null; 
  onSelect: (lat: number, lng: number) => void;
  readonly: boolean; 
}> = ({ position, onSelect, readonly }) => {
  useMapEvents({
    click(e) {
      if (!readonly) {
        onSelect(e.latlng.lat, e.latlng.lng);
      }
    },
  });

  return position ? <Marker position={position} /> : null;
};

const Recenter: React.FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
};

export const MapPicker: React.FC<MapPickerProps> = ({ 
  initialLat = 51.505, 
  initialLng = -0.09, 
  onLocationSelect, 
  readonly = false 
}) => {
  const [position, setPosition] = useState<LatLngExpression>([initialLat, initialLng]);

  const handleSelect = (lat: number, lng: number) => {
    setPosition([lat, lng]);
    if (onLocationSelect) onLocationSelect(lat, lng);
  };

  return (
    <div className="h-[300px] w-full rounded-xl overflow-hidden shadow-sm border border-slate-200 z-0">
      <MapContainer 
        center={[initialLat, initialLng]} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={!readonly}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker position={position} onSelect={handleSelect} readonly={readonly} />
        <Recenter lat={initialLat} lng={initialLng} />
      </MapContainer>
    </div>
  );
};