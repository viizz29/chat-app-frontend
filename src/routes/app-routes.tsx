import { Suspense, lazy, type JSX } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../auth/use-auth";

// Layout
import MainLayout from "../components/layouts/main-layout";

// Lazy pages (code splitting)
const Home = lazy(() => import("../features/home/home"));
const Login = lazy(() => import("../features/auth/login"));
const Dashboard = lazy(() => import("../features/dashboard/dashboard"));
const NotFound = lazy(() => import("../features/misc/not-found"));

// 🔐 Private Route Wrapper

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isAuthReady } = useAuth();

  // ⏳ Wait until auth is initialized
  if (!isAuthReady) {
    return <div className="p-4">Loading...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
};


const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const { user, isAuthReady } = useAuth();

  // ⏳ Wait until auth is initialized
  if (!isAuthReady) {
    return <div className="p-4">Loading...</div>;
  }

  return !user ? children : <Navigate to="/" replace />;
};

export default function AppRoutes() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />

        {/* Private routes with layout */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          {/* Nested routes */}
          <Route index element={<Home />} />
          <Route path="/connections" element={<Dashboard />} />
          
        </Route>

        {/* Catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}