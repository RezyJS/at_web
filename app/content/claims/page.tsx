/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import useSWRInfinite from 'swr/infinite';
import styles from './ClaimsPage.module.css';
import axios from 'axios';
import { lazy, Suspense, useEffect, useState, useRef } from 'react';
import ClaimsSkeleton from '@/components/ClaimsSkeleton';
import { Button } from '@/components/ui/button';
import { ArrowUp, Loader2 } from 'lucide-react'; // Import ArrowUp icon

const ClaimCard = lazy(() => import('@/components/ClaimCard'));

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function ClaimsPage() {
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null; // Reached the end
    return `/api/claims${pageIndex ? `?afterId=${previousPageData[previousPageData.length - 1].id}` : ''}`;
  };

  const { data, setSize, isValidating } = useSWRInfinite(getKey, fetcher);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const isFetching = useRef(false);

  // Flatten the data into a single array of claims
  const claims = data ? data.flat() : [];

  // Check if there are more claims to load
  const lastPage = data ? data[data.length - 1] : [];
  const hasMore = lastPage && lastPage.length > 0; // If the last page is not empty, there are more claims

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

  // Infinite scroll logic using Intersection Observer
  useEffect(() => {
    const currentLoaderRef = loaderRef.current; // Store the current ref value in a variable

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isValidating && !isFetching.current) {
          console.log('Fetching more data...'); // Debugging
          isFetching.current = true; // Set fetching flag to true
          setSize((prevSize) => prevSize + 1)
            .then(() => {
              console.log('Fetch completed.'); // Debugging
            })
            .catch(() => {
              console.log('Fetch failed.'); // Debugging
            })
            .finally(() => {
              isFetching.current = false; // Reset fetching flag after fetch is done
            });
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of the loader is visible
      }
    );

    if (currentLoaderRef) {
      observer.observe(currentLoaderRef);
    }

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef);
      }
    };
  }, [hasMore, isValidating, setSize]);

  return (
    <div className={styles.claimsContainer}>
      <Suspense
        fallback={
          <div className="grid grid-cols-1">
            {Array.from({ length: 3 }).map((_, index) => (
              <ClaimsSkeleton key={index} />
            ))}
          </div>
        }
      >
        <div className="container grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {claims.map((claim: any) => (
            <ClaimCard key={claim.id} claim={claim} />
          ))}
        </div>
      </Suspense>

      {/* Infinite scroll loader */}
      {
        hasMore && (
          <div ref={loaderRef} className="w-full flex justify-center my-4">
            <Loader2 className="animate-spin h-8 w-8" />
          </div>
        )
      }

      {/* Back to Top Button */}
      {showScrollButton && (
        <Button
          variant="default"
          className="fixed bottom-4 right-4 p-4 rounded-xl shadow-lg w-12 h-12"
          onClick={scrollToTop}
        >
          <ArrowUp size={28} />
        </Button>
      )}
    </div>
  );
}