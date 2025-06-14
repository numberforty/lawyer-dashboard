import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api.js';

export default function CaseForm() {
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    await api.post('/cases', { title, client });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <nav className="bg-slate-800 text-white p-3 px-6 flex items-center gap-4">
        <button onClick={() => navigate('/')} className="text-sm hover:underline">← Back to Dashboard</button>
      </nav>

      <main className="p-6 max-w-md mx-auto">
        <h2 className="text-lg font-semibold mb-4">Create Case</h2>
        <form onSubmit={handleSubmit}>
          <input
            required
            placeholder="Case title"
            className="w-full border border-gray-300 rounded mb-4 py-2 px-3 text-sm bg-white"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input
            required
            placeholder="Client name"
            className="w-full border border-gray-300 rounded mb-4 py-2 px-3 text-sm bg-white"
            value={client}
            onChange={e => setClient(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded text-sm">Save</button>
        </form>
      </main>
    </div>
  );
}
