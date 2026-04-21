import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';

import Landing       from './pages/Landing';
import Auth          from './pages/Auth';
import AuthCallback  from './pages/AuthCallback';
import Dashboard     from './pages/Dashboard';
import DSATracker    from './pages/DSATracker';
import Roadmaps      from './pages/Roadmaps';
import Resources     from './pages/Resources';
import InterviewPrep from './pages/InterviewPrep';
import Premium       from './pages/Premium';
import Settings      from './pages/Settings';
import Professionals from './pages/Professionals';
import FeaturedForm  from './pages/FeaturedForm';
import Admin         from './pages/Admin';
import GrindRoom     from './pages/GrindRoom';
import ArticlePage   from './pages/ArticlePage';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>;
  return user ? children : <Navigate to="/auth" replace />;
}

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-mesh">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Landing />} />
      <Route path="/auth" element={user ? <Navigate to="/dashboard" replace /> : <Auth />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/get-featured"  element={<FeaturedForm />} />

      {/* Protected routes */}
      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route path="dashboard"      element={<Dashboard />} />
        <Route path="dsa"            element={<DSATracker />} />
        <Route path="roadmaps"       element={<Roadmaps />} />
        <Route path="resources"      element={<Resources />} />
        <Route path="professionals"  element={<Professionals />} />
        <Route path="interview-prep" element={<InterviewPrep />} />
        <Route path="premium"        element={<Premium />} />
        <Route path="settings"       element={<Settings />} />
        <Route path="admin"          element={<Admin />} />
        <Route path="grind-room"     element={<GrindRoom />} />
        <Route path="learn/:slug"    element={<ArticlePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
