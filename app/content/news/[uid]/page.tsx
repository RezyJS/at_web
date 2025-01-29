'use client'

// File: app/content/news/[uid]/page.tsx
import React from 'react';
import { useRouter } from 'next/navigation';

interface Announcement {
  uid: string;
  title: string;
  description: string;
  datetime: string;
}

interface NewsProps {
  params: Promise<{ uid: string }>; // `params` is now a Promise
}

const News = ({ params }: NewsProps) => {
  const router = useRouter();

  // Unwrap the `params` Promise using React.use()
  const { uid } = React.use(params);

  // Simulated announcement data (replace this with actual API or database fetch)
  const announcement: Announcement = {
    uid,
    title: `Announcement Title for UID: ${uid}`,
    description:
      'This is the detailed description of the announcement. It provides all the necessary information about the event or update.',
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
          <h1 className="text-2xl font-bold">{announcement.title}</h1>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <p className="text-gray-700 leading-relaxed">{announcement.description}</p>
        </div>

        {/* Footer Section */}
        <div className="border-t border-gray-200 p-6">
          <p className="text-sm text-gray-500">
            Опубликовано:{' '}
            <span className="font-medium">{new Date(announcement.datetime).toLocaleDateString()}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default News;