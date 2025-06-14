import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api.js';

export default function CaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState(null);
  const [file, setFile] = useState(null);
  const [evidence, setEvidence] = useState([]);

  useEffect(() => {
    api.get(`/cases/${id}`).then(res => setCaseData(res.data));
    api.get(`/evidence/${id}`).then(res => setEvidence(res.data));
  }, [id]);

  const upload = async e => {
    e.preventDefault();
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    await api.post(`/evidence/${id}`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    const { data } = await api.get(`/evidence/${id}`);
    setEvidence(data);
    setFile(null);
  };

  if (!caseData) return null;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <nav className="bg-slate-800 text-white p-3 px-6 flex items-center gap-4">
        <button onClick={() => navigate('/')} className="text-sm hover:underline">← Back to Dashboard</button>
      </nav>

      <main className="p-6 max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-1">{caseData.title}</h2>
        <p className="text-gray-500 mb-6">Client: {caseData.client}</p>

        <form onSubmit={upload} className="flex items-center gap-3 mb-8">
          <input
            type="file"
            required
            onChange={e => setFile(e.target.files[0])}
            className="flex-1 border border-gray-300 rounded py-2 px-3 bg-white"
          />
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-5 rounded text-sm">Upload</button>
        </form>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {evidence.map(ev => (
            <a key={ev._id} href={`http://localhost:3000/uploads/${ev.filename}`} className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow filecard" target="_blank" rel="noopener noreferrer">
              <p className="truncate mb-1">{ev.originalname}</p>
              <p className="text-xs text-gray-500">{(((ev.size ?? 0) / 1024).toFixed(1))} KB</p>
            </a>
          ))}
        </section>
      </main>
    </div>
  );
}
