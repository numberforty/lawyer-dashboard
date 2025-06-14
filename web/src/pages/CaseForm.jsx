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
    <form onSubmit={handleSubmit} className="p-4 max-w-sm mx-auto">
      <input
        className="border p-2 w-full mb-2"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        className="border p-2 w-full mb-2"
        placeholder="Client"
        value={client}
        onChange={e => setClient(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2">Save</button>
    </form>
  );
}
