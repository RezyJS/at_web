'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react";
import { useState } from "react"
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ConfirmLoginPage() {

  const router = useRouter();
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const sendCode = () => {
    setIsLoading(true)
    axios.post(`/api/confirmLogin`, { token })
      .then((res) => {
        setIsLoading(false);
        if (+res.status >= 200 && +res.status < 300) {
          router.push('/content/news')
        }
      })
      .catch(() => {
        setIsLoading(false);
      })
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <Input className="text-lg h-100" placeholder="Code" type='text' onChange={(e) => {setToken(e.target.value)}}/>
        <Button size={'lg'} onClick={sendCode} disabled={ isLoading ? true : false }> 
          { isLoading ? <Loader2 className="animate-spin" /> : null }
          Отправить код
        </Button>
      </div>
    </div>
  )
}