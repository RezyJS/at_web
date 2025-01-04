'use client'

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const sendEmail = () => {
    setIsLoading(true)
    axios.post(`${baseURL}/v1/auth/login`, { email })
      .then((res) => {
        setIsLoading(false);
        if (+res.status >= 200 && +res.status < 300) {
          router.push('/auth/login/confirm')
        }
      })
      .catch(() => {
        setIsLoading(false);
      })
  }
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <div style={{ display: 'flex', gap: 20 }}>
        <Input className="text-lg h-100" placeholder="Email" type="email" onChange={(e) => {setEmail(e.target.value)}}/>
        <Button size={'lg'} onClick={sendEmail} disabled={ isLoading ? true : false }> 
          { isLoading ? <Loader2 className="animate-spin" /> : null }
          Отправить код
        </Button>
      </div>
    </div>
  )
}