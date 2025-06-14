import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api.js';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-80 p-10 rounded-lg shadow"
      >
        <h1 className="text-center text-lg font-semibold mb-6">⚖️ Lawyer Login</h1>
        <input
          type="email"
          required
          placeholder="Email"
          className="w-full border border-gray-300 rounded mb-4 py-2 px-3 text-sm"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          placeholder="Password"
          className="w-full border border-gray-300 rounded mb-4 py-2 px-3 text-sm"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
