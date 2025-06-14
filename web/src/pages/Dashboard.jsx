import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api.js';

export default function Dashboard() {
  const [cases, setCases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/cases').then(res => setCases(res.data));
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <nav className="bg-slate-800 text-white p-3 px-6 flex justify-between">
        <h1 className="font-semibold text-lg">⚖️ Lawyer Dashboard</h1>
        <button onClick={logout} className="text-sm hover:underline">Logout</button>
      </nav>

      <main className="p-6 max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Your Cases</h2>
          <Link to="/cases/new" className="bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-4 rounded">+ New Case</Link>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map(c => (
            <Link
              key={c._id}
              to={`/cases/${c._id}`}
              className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow"
            >
              <h3 className="font-semibold mb-1">{c.title}</h3>
              <p className="text-sm text-gray-500 mb-1">Client: {c.client}</p>
              <span
                className={`inline-block px-2 py-1 rounded text-xs font-medium ${c.status === 'open' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}
              >
                {c.status === 'open' ? 'Open' : 'Closed'}
              </span>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
