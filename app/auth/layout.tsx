'use client'

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {

  const router = useRouter()

  const processToLogin = () => {
    router.replace('/auth/login');
  }

  const processToRegistration = () => {
    router.replace('/auth/registration');
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%', gap: 50 }}>
      <div style={{ backgroundColor: '#60a0db', height: '500px', width: '450px', borderRadius: 60 }}>
        { children }
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Button size={'lg'} onClick={processToLogin}>
          Авторизация
        </Button>
        <Button size={'lg'} onClick={processToRegistration}>
          Регистрация
        </Button>
      </div>
    </div>
  )
}