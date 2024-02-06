import { Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Login from "./auth/login";
import Register from "./auth/register";
import NotFoundPage from "./components/404page";
import ForbiddenPage from "./components/403page";

// Custom Route component to protect routes
const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token');

  // Redirect to login if the user is not logged in
  if (!token) {
    return <Navigate to="/403" />;
  }

  // Render the protected route
  return element;
};

// Custom Route component to handle 404
const NotFoundRoute = () => {
  return <Navigate to="/404" />;
};

function RouteDir() {
  return (
    <Routes>
      <Route
        path="/dashboard/*"
        element={<ProtectedRoute element={<App />} />}
      />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="/403" element={<ForbiddenPage />} />
      <Route path="*" element={<NotFoundRoute />} />
    </Routes>
  );
}

export default RouteDir;
