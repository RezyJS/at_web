'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Smile } from "lucide-react";

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await axios.post('/api/auth/login', { email });
      router.push('/confirm-login');
      if (!router) {
        window.location.href = '/confirm-login';
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.error || 'Failed to initiate login');
      } else {
        alert('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <div className="flex justify-center">
            <Smile className="h-12 w-12 text-blue-600" /> {/* Decorative icon */}
          </div>
          <CardTitle className="text-3xl font-bold text-center text-gray-800 mt-4">
            Вы &apos;В Центре Внимания&apos; 👋
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Введите ваш email для входа.
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-[10px]'>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="example@test.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full"
              required
            />
          </div>
          <Button onClick={handleLogin} type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Далее
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}