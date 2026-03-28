import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/hooks/useAuth';
import { Navbar } from '@/components/layout/Navbar';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { Toaster } from 'sonner';
import { AnimatePresence } from 'framer-motion';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Leaderboard from '@/pages/Leaderboard';
import CalendarPage from '@/pages/Calendar';
import Fleet from '@/pages/Fleet';

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

        {/* Protected routes with layout */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
          <Route path="/fleet" element={<ProtectedRoute><Fleet /></ProtectedRoute>} />
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
              background: 'hsl(220, 18%, 10%)',
              border: '1px solid hsl(220, 15%, 20%)',
              color: 'hsl(210, 40%, 96%)',
            },
          }}
        />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
