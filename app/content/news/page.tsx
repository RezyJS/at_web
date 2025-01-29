/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import useSWRInfinite from 'swr/infinite';
import styles from './NewsPage.module.css';
import axios from 'axios';
import { lazy, Suspense, useEffect, useState } from 'react';
import NewsSkeleton from '@/components/NewsSkeleton';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowUp } from 'lucide-react'; // Import ArrowUp icon

const AnnouncementCard = lazy(() => import('@/components/AnnouncementCard'));

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function NewsPage() {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null; // Reached the end
    return `/api/announcements${pageIndex ? `?afterId=${previousPageData[previousPageData.length - 1].uid}` : ''}`;
  };

  const { data, size, setSize } = useSWRInfinite(getKey, fetcher);
  const [btnPressed, setBtnPressed] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Check if there are more announcements to load
  const announcements = data ? data.flat() : [];
  const lastPage = data ? data[data.length - 1] : [];
  const hasMore = lastPage && lastPage.length > 0; // If the last page is not empty, there are more announcements

  useEffect(() => {
    setBtnPressed(false);
  }, [data]);

  // Handle scroll event to show/hide the "Back to Top" button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.newsContainer}>
      <Suspense
        fallback={
          <div className="flex flex-col gap-[20px]">
            {Array.from({ length: 3 }).map((_, index) => (
              <NewsSkeleton key={index} />
            ))}
          </div>
        }
      >
        <div className="flex flex-col gap-[20px]">
          {announcements.map((announcement: any) => (
            <AnnouncementCard key={announcement.uid} announcement={announcement} />
          ))}
        </div>
      </Suspense>
      {hasMore && (
        <div className="mt-[20px] w-full flex justify-center">
          <Button
            disabled={btnPressed}
            variant={'default'}
            onClick={() => {
              setBtnPressed(true);
              setSize(size + 1);
            }}
          >
            Больше новостей
            {btnPressed ? <Loader2 className="animate-spin" /> : null}
          </Button>
        </div>
      )}
  
      {/* Back to Top Button */}
      {showScrollButton && (
        <Button
          variant='default'
          className="fixed bottom-4 right-4 p-4 rounded-xl shadow-lg w-12 h-12" // Increased padding and size
          onClick={scrollToTop}
        >
          <ArrowUp size={28} /> {/* Increased icon size */}
        </Button>
      )}
    </div>
  );
}