import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; // Adjust the import path based on your project structure

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
  return (
    <Card className="w-full max-w-md flex flex-col justify-between flex-shrink-0">
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