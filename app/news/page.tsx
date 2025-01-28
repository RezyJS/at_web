/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import useSWRInfinite from 'swr/infinite';
import AnnouncementCard from '@/components/AnnouncementCard';
import { useRouter } from 'next/navigation';
import styles from './NewsPage.module.css';
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function NewsPage() {
  const router = useRouter();

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null; // Reached the end
    return `/api/announcements${pageIndex ? `?afterId=${previousPageData[previousPageData.length - 1].uid}` : ''}`;
  };

  const { data, size, setSize } = useSWRInfinite(getKey, fetcher);

  // Check if there are more announcements to load
  const announcements = data ? data.flat() : [];
  const lastPage = data ? data[data.length - 1] : [];
  const hasMore = lastPage && lastPage.length > 0; // If the last page is not empty, there are more announcements

  const handleLogout = async () => {
    try {
      // Call the logout API route
      await axios.post('/api/auth/logout');

      // Redirect to the auth page
      router.push('/auth');
    } catch (error) {
      console.error('Failed to logout:', error);
      alert('Failed to logout. Please try again.');
    }
  };

  return (
    <div className={styles.newsContainer}>
      <h1>News</h1>
      <button onClick={handleLogout} style={{ marginBottom: '20px' }}>Logout</button>
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