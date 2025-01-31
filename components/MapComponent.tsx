// components/MapComponent.tsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngTuple } from 'leaflet'; // Import LatLngTuple for center prop

const MapComponent = () => {
  const position: LatLngTuple = [56.8587, 35.9176]; // Use LatLngTuple for center

  return (
    <MapContainer
      center={position}
      zoom={13}
      className='p-0 m-0 h-[100vh] w-full z-10'
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;