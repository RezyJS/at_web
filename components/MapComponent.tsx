// components/MapComponent.tsx
'use client'
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import CustomMarkerCluster from './CustomMarkerCluster';

interface Claim {
  id: string;
  latitude: number;
  longitude: number;
}

const MapComponent = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bounds, setBounds] = useState({
    nw: [56.8, 35.8], // Northwest coordinates (latitude, longitude)
    se: [56.9, 36.0], // Southeast coordinates (latitude, longitude)
  });

  // Fetch claims when bounds change
  useEffect(() => {
    const fetchClaims = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/map?nwLat=${bounds.nw[0]}&nwLng=${bounds.nw[1]}&seLat=${bounds.se[0]}&seLng=${bounds.se[1]}`
        );

        if (!response.ok) throw new Error('Failed to fetch claims');

        const data = await response.json();
        setClaims(data.claims);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch claims');
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, [bounds]);

  // Component to handle map movement
  const MapEvents = () => {
    const map = useMap();

    useEffect(() => {
      const updateBounds = () => {
        const mapBounds = map.getBounds();
        setBounds({
          nw: [mapBounds.getNorthWest().lat, mapBounds.getNorthWest().lng],
          se: [mapBounds.getSouthEast().lat, mapBounds.getSouthEast().lng],
        });
      };

      map.on('moveend', updateBounds);
      return () => {
        map.off('moveend', updateBounds);
      };
    }, [map]);

    return null;
  };

  return (
    <div className="relative h-screen w-full">
      {loading && (
        <div className="absolute z-[1000] top-4 left-4 bg-white p-4 rounded shadow-lg">
          <span className="animate-spin">⏳</span> Loading claims...
        </div>
      )}

      {error && (
        <div className="absolute z-[1000] top-4 left-4 bg-red-100 p-4 rounded shadow-lg text-red-700">
          ⚠️ Error: {error}
        </div>
      )}

      <MapContainer
        center={[56.8587, 35.9176]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        attributionControl={false}
      >
        <MapEvents />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution=""
        />

        <CustomMarkerCluster markers={claims} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
