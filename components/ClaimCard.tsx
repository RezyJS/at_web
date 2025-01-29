import React from 'react';
import { useRouter } from 'next/navigation';

interface Claim {
  id: string;
  title: string;
  description: string;
  photos: Array<string>
  datetime: string;
}

interface ClaimCardProps {
  claim: Claim;
}

function truncateText(text: string, maxLength = 100) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
}

const ClaimCard: React.FC<ClaimCardProps> = ({ claim }) => {
  const router = useRouter();
    
  const handleCardClick = () => {
    router.push(`/content/claims/${claim.id}`);
  };
  return (
    <div
      onClick={handleCardClick}
      className="border-neutral-200 border-[2px] p-[20px] gap-[10px] rounded-xl max-w-lg min-w-min flex flex-col justify-between transition-transform duration-300 ease-in-out bg-white transform hover:scale-105 hover:shadow-lg cursor-pointer">
        <p className='font-bold text-xl border-b-2 border-b-neutral-200 pb-5 text-pretty'>{claim.title}</p>
        <p className='font-medium text-md text-pretty'>{truncateText(claim.description, 200)}</p>
        <p className='font-normal text-base text-neutral-500 border-t-2 border-t-neutral-200 pt-5 text-pretty'>Опубликовано: {claim.datetime.slice(0, 11)}</p>
    </div>
  );
};

export default ClaimCard;