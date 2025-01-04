'use client'

import { Button } from "@/components/ui/button";
import fetcher from "@/helpers/fetcher";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from 'swr';

export default function News() {

  const router = useRouter();
  const logout = () => {
    fetcher({
    url: '/api/logout',
    params: { method: 'POST' },
    headers: null
    })  
    .then((res) => { 
      if (res.ok) {
        router.replace('/');
      }
    })
  }

  const [news, setNews] = useState({});

  const { data, isLoading } = useSWR(() => fetcher({
    url: '/api/newsData',
    params: null,
    headers: null
  }));

  useEffect(() => {
    if (data) {
      setNews(data.announcements)
    }
  }, [data])

  return (
    <div>
      <p>NEWS</p>
      { isLoading ? <p>LOADING...</p> : <p>{JSON.stringify(news)}</p> }
      <Button onClick={logout}> Выйти </Button>
    </div>
  )
}