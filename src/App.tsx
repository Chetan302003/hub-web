import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/hooks/useAuth';
import { Navbar } from '@/components/layout/Navbar';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { Toaster } from 'sonner';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Leaderboard from '@/pages/Leaderboard';
import CalendarPage from '@/pages/Calendar';
import Fleet from '@/pages/Fleet';
import MyStats from '@/pages/MyStats';

const queryClient = new QueryClient();

function AppLayout() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <Outlet />
      </main>
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Public hub routes */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/fleet" element={<Fleet />} />
          {/* Personal stats contain user-specific data. */}
          <Route path="/stats" element={<ProtectedRoute><MyStats /></ProtectedRoute>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'var(--surface)',
              border: '1px solid var(--border-color)',
              color: 'var(--text)',
            },
          }}
        />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
        <Analytics />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
