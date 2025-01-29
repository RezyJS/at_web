'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

// Define the Claim interface
interface Claim {
  id: string;
  title: string;
  description: string;
  photos: Array<string>; // Array of photo URLs
  datetime: string;
}

// Props for the Claims component
interface ClaimsProps {
  params: Promise<{ id: string }>; // `params` is now a Promise
}

const Claims = ({ params }: ClaimsProps) => {
  const router = useRouter();

  // Unwrap the `params` Promise using React.use()
  const { id } = React.use(params);

  // Simulated claim data (replace this with actual API or database fetch)
  const claim: Claim = {
    id,
    title: `Заявка с ID: ${id}`,
    description:
      'Это подробное описание заявки. Оно содержит всю необходимую информацию о событии или обновлении.',
    photos: [
      'https://via.placeholder.com/150', // Example photo URLs
      'https://via.placeholder.com/150',
    ],
    datetime: '2023-10-15T14:48:00Z', // Example date
  };

  // Function to handle the "Back" button click
  const handleBack = () => {
    router.back(); // Navigates to the previous page in the browser history
  };

  return (
    <div className="min-h-screen p-6">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-6 hover:bg-blue-600 transition-colors"
      >
        Назад
      </button>

      {/* Card Container */}
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-500 text-white p-6">
          <h1 className="text-2xl font-bold">{claim.title}</h1>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <p className="text-gray-700 leading-relaxed">{claim.description}</p>

          {/* Photos Section */}
          {/* {claim.photos.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-4">Фотографии:</h2>
              <div className="flex gap-4 flex-wrap">
                {claim.photos.map((photo, index) => (
                  <div key={index} className="relative w-32 h-32 rounded-md overflow-hidden">
                    <Image
                      src={photo}
                      alt={`Фото ${index + 1}`}
                      fill // Automatically fills the parent container
                      style={{ objectFit: 'cover' }} // Ensures the image covers the area
                      sizes="(max-width: 768px) 100vw, 33vw" // Responsive sizing
                    />
                  </div>
                ))}
              </div>
            </div>
          )} */}
        </div>

        {/* Footer Section */}
        <div className="border-t border-gray-200 p-6">
          <p className="text-sm text-gray-500">
            Опубликовано:{' '}
            <span className="font-medium">{new Date(claim.datetime).toLocaleDateString()}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Claims;