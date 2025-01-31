/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react';
import L, { MarkerClusterGroup } from 'leaflet';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { useMap } from 'react-leaflet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';

interface CustomMarkerClusterProps {
  markers: Array<{ id: string; latitude: number; longitude: number }>;
}

interface FetchedData {
  [key: string]: any;
}

const CustomMarkerCluster = ({ markers }: CustomMarkerClusterProps) => {
  const map = useMap();
  const markerClusterRef = useRef<MarkerClusterGroup | null>(null);
  const [fetchedData, setFetchedData] = useState<FetchedData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState('');
  const [isPhotoView, setIsPhotoView] = useState(false); // Track if photo view is active

  useEffect(() => {
    if (!markerClusterRef.current) {
      markerClusterRef.current = L.markerClusterGroup();
    }
    markerClusterRef.current.clearLayers();

    markers.forEach((marker) => {
      const customIcon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });
      const leafletMarker = L.marker([marker.latitude, marker.longitude], { icon: customIcon });

      leafletMarker.on('click', async () => {
        setIsLoading(true);
        setIsModalOpen(true);
        try {
          const response = await fetch(`/api/claims/${marker.id}`);
          const data = await response.json();
          setFetchedData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
          setFetchedData(null);
        } finally {
          setIsLoading(false);
        }
      });

      markerClusterRef.current?.addLayer(leafletMarker);
    });

    map.addLayer(markerClusterRef.current);

    return () => {
      if (markerClusterRef.current) {
        map.removeLayer(markerClusterRef.current);
      }
    };
  }, [markers, map]);

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={(open) => {
        setIsModalOpen(open);
        setIsPhotoView(false); // Reset photo view when closing the dialog
      }}>
        <DialogContent className="z-[1000] max-w-[90vw] max-h-[90vh] overflow-y-auto">
          {!isPhotoView ? (
            // Main Content View
            <>
              <DialogHeader>
                <DialogTitle>Подробнее</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {isLoading ? (
                  <Loader2 className='animate-spin' />
                ) : fetchedData ? (
                  <>
                    {/* Title */}
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <h3 className="text-lg font-semibold">{fetchedData.title}</h3>
                    </div>
                    {/* Description */}
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-700">{fetchedData.description}</p>
                    </div>
                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Category */}
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Категория</p>
                        <p className="font-medium">{fetchedData.category}</p>
                      </div>
                      {/* Status */}
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Статус</p>
                        <p className="font-medium">{fetchedData.status}</p>
                      </div>
                      {/* Date & Time */}
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Опубликовано</p>
                        <p className="font-medium">{fetchedData.datetime}</p>
                      </div>
                    </div>
                    {/* Photos (if available) */}
                    {fetchedData.photos && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">Фотографии</p>
                        <div className="flex gap-2">
                          {fetchedData.photos.map((photo: any, index: any) => (
                            <img
                              key={index}
                              src={`${process.env.NEXT_PUBLIC_API_URL}/${photo}`}
                              alt={`Photo ${index + 1}`}
                              className="w-20 h-20 object-cover rounded-lg cursor-pointer"
                              onClick={() => {
                                setSelectedPhoto(`${process.env.NEXT_PUBLIC_API_URL}/${photo}`);
                                setIsPhotoView(true); // Switch to photo view
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Feedback (if available) */}
                    {fetchedData.feedback && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">Обратная связь</p>
                        <p className="text-sm text-gray-700">{fetchedData.feedback}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <p>No data available.</p>
                )}
              </div>
            </>
          ) : (
            // Photo View
            <div className="flex flex-col items-center justify-center h-full">
              <button
                className="absolute top-4 right-4 bg-gray-200 px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-300 transition"
                onClick={() => setIsPhotoView(false)} // Return to main content
              >
                Назад
              </button>
              <img
                src={selectedPhoto}
                alt="Full-screen Photo"
                className="max-h-[80vh] object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CustomMarkerCluster;