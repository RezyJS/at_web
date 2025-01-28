'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      console.log('Sending request to /api/auth/login with email:', email);

      // Send POST request using Axios
      const response = await axios.post('/api/auth/login', { email });
      console.log('Response from /api/auth/login:', response.data);

      // Redirect to confirm login page
      console.log('Redirecting to /confirm-login');
      router.push('/confirm-login');

      // Fallback redirection
      if (!router) {
        window.location.href = '/confirm-login';
      }
    } catch (error) {
      console.error('Error during login:', error);

      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.error || 'Failed to initiate login');
      } else {
        alert('An unexpected error occurred');
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin}>Send Confirmation Code</button>
    </div>
  );
}