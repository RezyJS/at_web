import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; // Adjust the import path based on your project structure
import { useRouter } from 'next/navigation';

interface Announcement {
  uid: string;
  title: string;
  description: string;
  datetime: string;
}

interface AnnouncementCardProps {
  announcement: Announcement;
}

function truncateText(text: string, maxLength = 100) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement }) => {
  const router = useRouter();
  
  const handleCardClick = () => {
    router.push(`/content/news/${announcement.uid}`);
  };


  return (
    <Card
      className="w-[316px] max-w-md flex flex-col justify-between flex-shrink-0 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer"
      onClick={handleCardClick} // Add click event to trigger alert
    >
      {/* Title at the top */}
      <CardHeader className="border-b">
        <CardTitle>{truncateText(announcement.title, 30)}</CardTitle>
      </CardHeader>

      {/* Description in the middle */}
      <CardContent className="flex-1 p-6">
        <p className="text-sm text-gray-700">{truncateText(announcement.description)}</p>
      </CardContent>

      {/* Date at the bottom */}
      <CardContent className="border-t p-6">
        <p className="text-sm text-gray-500">{announcement.datetime.slice(0, 11)}</p>
      </CardContent>
    </Card>
  );
};

export default AnnouncementCard;