import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api.js';

export default function CaseDetail() {
  const { id } = useParams();
  const [c, setCase] = useState(null);
  const [file, setFile] = useState(null);
  const [evidence, setEvidence] = useState([]);

  useEffect(() => {
    api.get(`/cases/${id}`).then(res => setCase(res.data));
    api.get(`/evidence/${id}`).then(res => setEvidence(res.data));
  }, [id]);

  const upload = async e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('file', file);
    await api.post(`/evidence/${id}`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    const { data } = await api.get(`/evidence/${id}`);
    setEvidence(data);
  };

  if (!c) return null;

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">{c.title}</h2>
      <p>Client: {c.client}</p>
      <form onSubmit={upload} className="my-4">
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button className="bg-blue-500 text-white px-4 py-2 ml-2">Upload</button>
      </form>
      <ul>
        {evidence.map(ev => (
          <li key={ev._id}>{ev.originalname}</li>
        ))}
      </ul>
    </div>
  );
}
