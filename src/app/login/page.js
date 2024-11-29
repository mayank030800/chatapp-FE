'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:1337/api/auth/local', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: email,
          password, 
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid email or password.');
      }

      const res = await response.json();
      // console.log(res)
      // Save token to localStorage
      localStorage.setItem('token', res.jwt);

      // Redirect to auth-protected page
      router.push('/chat');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600">
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-extrabold text-center text-gray-800">Login</h1>
      <p className="text-sm text-center text-gray-500">Welcome back! Please enter your details.</p>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 text-white bg-indigo-500 rounded-lg shadow hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Login
        </button>
      </form>
      {error && <p className="mt-4 text-sm font-medium text-center text-red-500">{error}</p>}
      <p className="text-sm text-center text-gray-500">
        Don't have an account?{' '}
        <a href="/register" className="font-medium text-indigo-500 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  </div>  
  );
};

export default LoginPage;
