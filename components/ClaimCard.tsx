import React from 'react';
import { useRouter } from 'next/navigation';

interface Claim {
  id: string;
  title: string;
  description: string;
  photos: Array<string>
  datetime: string;
  status: string
}

interface ClaimCardProps {
  claim: Claim;
}

const ClaimCard: React.FC<ClaimCardProps> = ({ claim }) => {
  const router = useRouter();
    
  const handleCardClick = () => {
    router.push(`/content/claims/${claim.id}`);
  };
  return (
    <div
      onClick={handleCardClick}
      className="border-neutral-200 border-[2px] p-[20px] gap-[10px] rounded-xl max-w-lg w-[75vw] min-w-[320px] flex flex-col justify-between transition-transform duration-300 ease-in-out bg-white transform hover:scale-105 hover:shadow-lg cursor-pointer">
        <p className='font-bold text-xl border-b-2 border-b-neutral-200 pb-5 line-clamp-2'>{claim.title}</p>
        <p className='font-medium text-md text-pretty line-clamp-3'>{claim.description}</p>
        <div className='flex justify-between w-full border-t-2 border-t-neutral-200 gap-[20px] pt-5'>
          <p className='font-normal text-base text-neutral-500 text-pretty'>Опубликовано: {claim.datetime.slice(0, 11)}</p>
          <div className='flex flex-row justify-evenly items-baseline gap-2'>
            <div className='w-2 h-2 bg-red-500 rounded-2xl'>{''}</div>
            <p className='font-normal text-base text-neutral-500 text-nowrap'>{claim.status}</p>
          </div>
        </div>
    </div>
  );
};

export default ClaimCard;