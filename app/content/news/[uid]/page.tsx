/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import useSWR from 'swr';
import axios from 'axios';

const NewsData = ({ data }: { data: any }) => (
  <div className="min-h-screen p-6">
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-blue-500 text-white p-6">
        <h1 className="text-2xl font-bold">{data.title}</h1>
      </div>
      
      <div className="p-6">
        <p className="text-gray-700 leading-relaxed mb-[20px]">{data.description}</p>

        <div className="border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Опубликовано:{' '}
            <span className="font-medium">{data.datetime.slice(0, 11)}</span>
          </p>
        </div>

      </div>

    </div>
  </div>
);

const NewsSkeleton = () => (
  <div className="border-neutral-100 animate-pulse border-[2px] p-[20px] rounded-xl max-w-3xl mx-auto space-y-6">
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
  </div>
);

const Wrapper = ({ router, children }: { router: AppRouterInstance, children: React.ReactNode }) => (
  <div className="min-h-screen p-6">
    <button
      onClick={() => router.back()}
      className="bg-blue-500 text-white px-4 py-2 rounded-md mb-6 hover:bg-blue-600 transition-colors"
    >
      Назад
    </button>
    { children }
  </div>
);

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const getAnnouncementData = (uid: string): string => {
  return `/api/announcements/${uid}`;
} 

const News = ({ params }: { params: Promise<{ uid: string }> }) => {

  const { uid } = React.use(params);
  const router = useRouter();

  const { data, isLoading, error } = useSWR(getAnnouncementData(uid), fetcher);

  if (isLoading || error) {
    return (
      <Wrapper router={ router }>
        <NewsSkeleton />
      </Wrapper>
    );
  }

  return (
    <Wrapper router={ router }>
      <NewsData data={data} />
    </Wrapper>
  )

};

export default News;