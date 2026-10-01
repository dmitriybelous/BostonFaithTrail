'use client';
import { MapContainer, TileLayer, Marker, Popup, Polyline, CircleMarker, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import { Stop } from '@/types/stop';
import { googleMapsPlaceUrl } from '@/lib/geo';
import { CrosshairIcon } from '@/components/Icons';

function numberedIcon(n: number) {
  return L.divIcon({
    className: 'trail-marker',
    html: `<div style="width:32px;height:32px;border-radius:9999px;background:#152744;color:#fff;border:2.5px solid #c9a44a;display:flex;align-items:center;justify-content:center;font:600 13px/1 var(--font-sans),system-ui,sans-serif;box-shadow:0 4px 10px rgba(11,22,40,.35)">${n}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18],
  });
}

function FitBounds({ stops }: { stops: Stop[] }) {
  const map = useMap();
  useEffect(() => {
    if (stops.length === 0) return;
    map.fitBounds(L.latLngBounds(stops.map((s) => [s.lat, s.lng])), { padding: [36, 36] });
  }, [map, stops]);
  return null;
}

function FlyTo({ position }: { position: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo(position, 16);
  }, [map, position]);
  return null;
}

interface TrailMapProps {
  stops: Stop[];
}

export default function TrailMap({ stops }: TrailMapProps) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locateError, setLocateError] = useState<string | null>(null);

  const handleLocate = () => {
    setLocateError(null);
    if (!('geolocation' in navigator)) {
      setLocateError('Location is not available on this device.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
      () => setLocateError('Unable to access your location. Please check your browser permissions.'),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[42.3575, -71.0615]}
        zoom={15}
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds stops={stops} />
        <FlyTo position={userLocation} />
        <Polyline
          positions={stops.map((s) => [s.lat, s.lng] as [number, number])}
          pathOptions={{ color: '#a88035', weight: 3, opacity: 0.85, dashArray: '2 8', lineCap: 'round' }}
        />
        {stops.map((stop, index) => (
          <Marker key={stop.id} position={[stop.lat, stop.lng]} icon={numberedIcon(index + 1)}>
            <Popup>
              <div className="min-w-[180px] max-w-[220px]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-dark !m-0">
                  Stop {index + 1}{stop.type ? ` · ${stop.type}` : ''}
                </p>
                <h3 className="font-serif text-base font-semibold text-navy leading-snug mt-1 mb-3">{stop.title}</h3>
                <div className="flex gap-2">
                  <Link
                    href={`/stops/${stop.slug}`}
                    className="flex-1 text-center rounded-full bg-navy !text-white text-xs font-semibold px-3 py-2"
                  >
                    Details
                  </Link>
                  <a
                    href={googleMapsPlaceUrl(stop.lat, stop.lng)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center rounded-full bg-gold-light !text-navy text-xs font-semibold px-3 py-2"
                  >
                    Directions
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
        {userLocation && (
          <CircleMarker
            center={userLocation}
            radius={8}
            pathOptions={{ color: '#ffffff', weight: 3, fillColor: '#2563eb', fillOpacity: 1 }}
          />
        )}
      </MapContainer>
      <button
        onClick={handleLocate}
        aria-label="Show my location"
        className="absolute bottom-4 right-4 z-[1000] flex h-11 w-11 items-center justify-center rounded-full bg-white text-navy shadow-lift active:scale-95 transition"
      >
        <CrosshairIcon />
      </button>
      {locateError && (
        <div className="absolute bottom-[4.5rem] right-4 left-4 sm:left-auto z-[1000] bg-white text-crimson rounded-xl px-3 py-2 text-xs sm:max-w-[240px] shadow-lift">
          {locateError}
        </div>
      )}
    </div>
  );
}
