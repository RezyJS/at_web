'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Smile } from "lucide-react";

export default function RegistrationPage() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [mail, setMail] = useState('');
  const router = useRouter();

  // TODO: Change!
  const handleRegistration = async () => {
    try {
      await axios.post('/api/auth/registration', { first_name: name, second_name: surname, email: mail });
      router.push('/confirm-login');
      if (!router) {
        window.location.href = '/confirm-login';
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.error || 'Возникла ошибка, попробуйте снова позже!');
      } else {
        alert('Произошла непредвиденная ошибка!');
      }
    }
  };

  const handleBack = () => {
    router.push('/auth');
    if (!router) {
      window.location.href = '/auth';
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <div className="flex justify-center">
            <Smile className="h-12 w-12 text-blue-600" /> {/* Decorative icon */}
          </div>
          <CardTitle className="text-3xl font-bold text-center text-gray-800 mt-4">
            Регистрация
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Введите данные ниже и нажмите на кнопку
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-[10px]'>
          <div className='flex flex-col gap-[20px]'>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Имя
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Иван"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full"
                required
                />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Фамилия
              </label>
              <Input
                id="surname"
                type="text"
                placeholder="Иванов"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                className="mt-1 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="example@test.com"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                className="mt-1 w-full"
                required
              />
            </div>
            <Button onClick={handleRegistration} className="w-full bg-blue-600 hover:bg-blue-700">
              Далее
            </Button>
            <Button onClick={handleBack} className="w-full bg-red-600 hover:bg-red-700">
              Назад
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}