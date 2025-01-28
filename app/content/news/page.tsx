/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import useSWRInfinite from 'swr/infinite';
import AnnouncementCard from '@/components/AnnouncementCard';
import styles from './NewsPage.module.css';
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function NewsPage() {

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null; // Reached the end
    return `/api/announcements${pageIndex ? `?afterId=${previousPageData[previousPageData.length - 1].uid}` : ''}`;
  };

  const { data, size, setSize } = useSWRInfinite(getKey, fetcher);

  // Check if there are more announcements to load
  const announcements = data ? data.flat() : [];
  const lastPage = data ? data[data.length - 1] : [];
  const hasMore = lastPage && lastPage.length > 0; // If the last page is not empty, there are more announcements

  return (
    <div className={styles.newsContainer}>
      {announcements.map((announcement: any) => (
        <AnnouncementCard
          key={announcement.uid} // Add a unique key prop
          announcement={announcement}
        />
      ))}
      {hasMore && ( // Only show the button if there are more announcements to load
        <button className={styles.loadMoreButton} onClick={() => setSize(size + 1)}>
          Load More
        </button>
      )}
    </div>
  );
}