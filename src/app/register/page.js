'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleRegister = async (username, email, password) => {
    try {
      const response = await fetch("http://localhost:1337/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Registration failed.");
      }
  
      const data = await response.json();
      return data; // { jwt, user }
    } catch (err) {
      throw new Error(err.message);
    }
  };
  
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <h1 className="text-3xl font-extrabold text-center text-gray-800">Register</h1>
        <p className="text-sm text-center text-gray-500">Create your account by filling in the details below.</p>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mt-1 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
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
            Register
          </button>
        </form>
        {error && <p className="mt-4 text-sm font-medium text-center text-red-500">{error}</p>}
        {success && <p className="mt-4 text-sm font-medium text-center text-green-500">{success}</p>}
        <p className="text-sm text-center text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-indigo-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
