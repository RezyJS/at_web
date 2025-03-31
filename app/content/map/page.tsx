'use client'

import dynamic from 'next/dynamic';

// Dynamically import the MapComponent to avoid SSR issues
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false, // Disable server-side rendering for this component
});

export default function Home() {
  return (
    <div className='p-0 m-0'>
      <MapComponent />
    </div>
  );
}