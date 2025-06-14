import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CaseForm from './pages/CaseForm.jsx';
import CaseDetail from './pages/CaseDetail.jsx';

export default function App() {
  const token = localStorage.getItem('token');
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/cases/new" element={<CaseForm />} />
      <Route path="/cases/:id" element={<CaseDetail />} />
    </Routes>
  );
}
