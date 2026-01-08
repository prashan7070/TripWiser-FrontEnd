import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap, Polyline, Popup } from 'react-leaflet';
import type { LatLngExpression, LatLngBoundsExpression } from 'leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});
L.Marker.prototype.options.icon = DefaultIcon;

interface MapPickerProps {
  selectedLat?: number;
  selectedLng?: number;
  onLocationSelect?: (lat: number, lng: number) => void;
  readonly?: boolean;
  // NEW PROP: Array of points to connect
  route?: { lat: number; lng: number; label: string }[];
}

const MapFix = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => map.invalidateSize(), 100);
  }, [map]);
  return null;
};

//  Auto-Zoom to fit all points in the route
const FitRouteBounds: React.FC<{ route: { lat: number; lng: number }[] }> = ({ route }) => {
  const map = useMap();
  useEffect(() => {
    if (route.length > 0) {
      const bounds: LatLngBoundsExpression = route.map(p => [p.lat, p.lng]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [route, map]);
  return null;
};

// Center map on single point selection
const RecenterMap: React.FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 13);
  }, [lat, lng, map]);
  return null;
};

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

export const MapPicker: React.FC<MapPickerProps> = ({ 
  selectedLat, 
  selectedLng, 
  onLocationSelect, 
  readonly = false,
  route = [] // Default to empty array
}) => {
  const defaultLat = 7.8731;
  const defaultLng = 80.7718;

  const [position, setPosition] = useState<LatLngExpression>([
    selectedLat || defaultLat, 
    selectedLng || defaultLng
  ]);

  useEffect(() => {
    if (selectedLat && selectedLng) {
      setPosition([selectedLat, selectedLng]);
    }
  }, [selectedLat, selectedLng]);

  const handleSelect = (lat: number, lng: number) => {
    setPosition([lat, lng]);
    if (onLocationSelect) onLocationSelect(lat, lng);
  };

  const isRouteMode = route.length > 0;

  return (
    <div className="h-[400px] w-full rounded-xl shadow-sm border border-slate-200 z-0 relative isolate">
      <MapContainer 
        center={[selectedLat || defaultLat, selectedLng || defaultLng]} 
        zoom={isRouteMode ? 7 : 13} 
        style={{ height: '100%', width: '100%', borderRadius: '0.75rem' }}
        scrollWheelZoom={!readonly}
      >
        <MapFix />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {isRouteMode ? (
         
          <>
            {/* Connecting Stops */}
            <Polyline 
              positions={route.map(p => [p.lat, p.lng])} 
              pathOptions={{ color: '#4f46e5', weight: 4, dashArray: '10, 10', opacity: 0.8 }} 
            />
            
            {/*  Draw Marker for EACH stop */}
            {route.map((stop, idx) => (
              <Marker key={idx} position={[stop.lat, stop.lng]}>
                <Popup>
                  <div className="text-center">
                    <span className="font-bold text-indigo-600">Stop {idx + 1}</span>
                    <br />
                    {stop.label}
                  </div>
                </Popup>
              </Marker>
            ))}

            {/*Auto Zoom*/}
            <FitRouteBounds route={route} />
          </>
        ) : (
         
          <>
            <LocationMarker position={position} onSelect={handleSelect} readonly={readonly} />
            <RecenterMap lat={selectedLat || defaultLat} lng={selectedLng || defaultLng} />
          </>
        )}

      </MapContainer>
    </div>
  );
};