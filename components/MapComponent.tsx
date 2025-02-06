/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { MapContainer, TileLayer, ZoomControl, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import CustomMarkerCluster from './CustomMarkerCluster';
import { Button } from '@/components/ui/button';
import { PlusCircle, X } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Claim {
  id: string;
  latitude: number;
  longitude: number;
}

const Map = ({ claims, setBounds, children }: { claims?: Claim[], setBounds: Dispatch<SetStateAction<{ nw: number[]; se: number[]; }>>, children?: React.ReactNode }) => {

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
    <MapContainer
      center={[56.8587, 35.9176]}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      attributionControl={false}
      zoomControl={false}
    >
      <MapEvents />
      <ZoomControl position="topright" />
      {children}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution=""
      />

      {claims ? <CustomMarkerCluster markers={claims} /> : null}
    </MapContainer>
  );
};

const CreateClaim = ({ setBounds }: { setBounds: Dispatch<SetStateAction<{ nw: number[]; se: number[]; }>>, switcher: Dispatch<SetStateAction<boolean>> }) => {
  const [latlng, setLatLng] = useState<{ lat: string, lng: string }>({ lat: '56.8', lng: '35.8' });
  const [isModalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);

  const LocationFinderDummy = () => {
    useMapEvents({
      click(e: any) {
        const { lat, lng } = e.latlng;
        setLatLng({ lat: lat.toString(), lng: lng.toString() });
        setModalOpen(true);
      },
    });
    return null;
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 3); // Limit to 3 files
      setPhotos(files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('latitude', latlng.lat);
    formData.append('longitude', latlng.lng);
    photos.forEach((photo, index) => {
      formData.append(`photo${index + 1}`, photo);
    });

    try {
      const response = await fetch('/api/create-claim', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Заявка успешно создана!');
        setModalOpen(false);
      } else {
        alert('Ошибка при создании заявки.');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка при отправке данных.');
    }
  };

  return (
    <Map setBounds={setBounds}>
      <LocationFinderDummy />
      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="z-[1005] max-w-[95vw] sm:max-w-md max-h-[90vh] overflow-y-auto mt-10 sm:mt-0">
          <DialogHeader>
            <DialogTitle>Создание заявки</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="title">Заголовок</label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="category">Категория</label>
                <Select onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent className='z-[1006]'>
                    <SelectItem value="road">Дороги</SelectItem>
                    <SelectItem value="environment">Экология</SelectItem>
                    <SelectItem value="infrastructure">Инфраструктура</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="description">Описание</label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="photos">Прикрепить фото (до 3)</label>
                <Input
                  id="photos"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoChange}
                />
                {photos.length > 0 && (
                  <div className="mt-2">
                    <div className="flex space-x-2">
                      {photos.map((photo, index) => (
                        <div key={index} className="w-20 h-20 overflow-hidden rounded-lg">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className='flex w-full justify-evenly'>
                <Button type='reset' onClick={() => setPhotos([])}>Очистить фото</Button>
                <Button type="submit">Создать заявку</Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Map>
  );
};

const MapComponent = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bounds, setBounds] = useState({
    nw: [56.8, 35.8], // Northwest coordinates (latitude, longitude)
    se: [56.9, 36.0], // Southeast coordinates (latitude, longitude)
  });
  const [newClaim, setStageOne] = useState(false);

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
      {
        newClaim ?
          <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
            <CreateClaim switcher={setStageOne} setBounds={setBounds}/>
            <div style={{
              position: 'absolute',
              top: '100px',
              right: '10px',
              zIndex: 1000
            }}>
              <Button variant='destructive' className='border-[2px] border-neutral-400' onClick={() => setStageOne(false)} size="icon">
                <X className="h-2 w-2" />
              </Button>
            </div>
          </div>
        : <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
            <Map claims={claims} setBounds={setBounds}/>
            <div style={{
              position: 'absolute',
              top: '100px',
              right: '10px',
              zIndex: 1000
            }}>
              <Button variant="outline" className='border-[2px] border-neutral-400' onClick={() => setStageOne(true)} size="icon">
                <PlusCircle className="h-2 w-2" />
              </Button>
            </div>
          </div>
      }
      
    </div>
  );
};

export default MapComponent;
