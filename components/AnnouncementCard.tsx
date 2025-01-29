import React from 'react';
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
    <div
      onClick={handleCardClick}
      className="p-[20px] gap-[10px] rounded-xl w-[75vw] min-w-min flex flex-col justify-between transition-transform duration-300 ease-in-out bg-white transform hover:scale-105 hover:shadow-lg cursor-pointer">
        <p className='font-bold text-xl'>{truncateText(announcement.title, 50)}</p>
        <p className='font-medium text-md'>{truncateText(announcement.description, 500)}</p>
        <p className='font-normal text-md text-neutral-500'>Опубликовано: {announcement.datetime.slice(0, 11)}</p>
    </div>
  );
};

export default AnnouncementCard;