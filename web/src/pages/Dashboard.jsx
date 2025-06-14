import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api.js';

export default function Dashboard() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    api.get('/cases').then(res => setCases(res.data));
  }, []);

  return (
    <div className="p-4">
      <Link to="/cases/new" className="underline">New Case</Link>
      <ul>
        {cases.map(c => (
          <li key={c._id}>
            <Link className="text-blue-500" to={`/cases/${c._id}`}>{c.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
