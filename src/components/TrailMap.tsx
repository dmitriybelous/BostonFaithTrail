'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import OpenInMapsButton from './OpenInMapsButton';
import { Stop } from '@/types/stop';

// Fix Leaflet default icon issue in Next.js
try {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
} catch {
  // Icon fix not required in this environment
}

interface TrailMapProps {
  stops: Stop[];
}

export default function TrailMap({ stops }: TrailMapProps) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  const [locateError, setLocateError] = useState<string | null>(null);

  const handleLocate = () => {
    setLocateError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      },
      () => {
        setLocateError('Unable to access your location. Please check your browser permissions.');
      }
    );
  };

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[42.3601, -71.0589]}
        zoom={14}
        className="w-full h-full"
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {stops.map((stop) => (
          <Marker key={stop.id} position={[stop.lat, stop.lng]}>
            <Popup>
              <div className="min-w-[160px]">
                <h3 className="font-semibold text-sm mb-1">{stop.title}</h3>
                <p className="text-xs text-gray-600 mb-2">{stop.shortSummary}</p>
                <div className="flex flex-col gap-1">
                  <Link href={`/stops/${stop.slug}`} className="text-xs text-blue-700 underline">View details</Link>
                  <OpenInMapsButton lat={stop.lat} lng={stop.lng} className="text-xs" />
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>You are here</Popup>
          </Marker>
        )}
      </MapContainer>
      <button
        onClick={handleLocate}
        className="absolute bottom-6 right-4 z-[1000] bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium shadow hover:bg-gray-50"
      >
        📍 Locate me
      </button>
      {locateError && (
        <div className="absolute bottom-16 right-4 z-[1000] bg-red-50 border border-red-300 text-red-700 rounded-lg px-3 py-2 text-xs max-w-[220px] shadow">
          {locateError}
        </div>
      )}
    </div>
  );
}
