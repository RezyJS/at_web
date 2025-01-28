'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function ConfirmLoginPage() {
  const [code, setCode] = useState('');
  const router = useRouter();

  const handleConfirm = async () => {
    try {
      // Send POST request using Axios
      await axios.post('/api/auth/confirm-login', { code });

      // Redirect to the news page after successful login
      router.push('/content/news');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.error || 'Failed to confirm login');
      } else {
        alert('An unexpected error occurred');
      }
    }
  };

  return (
    <div>
      <h1>Confirm Login</h1>
      <input
        type="text"
        placeholder="Confirmation Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={handleConfirm}>Confirm</button>
    </div>
  );
}