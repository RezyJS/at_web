import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

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
  return (
    <Card className="w-[316px] max-w-md flex flex-col justify-between flex-shrink-0">
      {/* Title at the top */}
      <CardHeader className="border-b">
        <CardTitle>{truncateText(claim.title, 30)}</CardTitle>
      </CardHeader>

      {/* Description in the middle */}
      <CardContent className="flex-1 p-6">
        <p className="text-sm text-gray-700">{truncateText(claim.description)}</p>
      </CardContent>

      {/* Date at the bottom */}
      <CardContent className="border-t p-6">
        <p className="text-sm text-gray-500">{claim.datetime.slice(0, 11)}</p>
      </CardContent>
    </Card>
  );
};

export default ClaimCard;