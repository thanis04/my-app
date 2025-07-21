import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from './components/auth/Login.jsx';
import PasswordRecovery from "./components/auth/PasswordRecovery.jsx";
import AdminDashboard from "./components/pages/AdminDashboard.jsx";
import UserDashboard from "./components/pages/UserDashboard.jsx";
import { getToken, getUserRole, isSessionValid } from "./utils/auth";
        import AccessControl from "./components/pages/AccessControl.jsx";

const PrivateRoute = ({ children, role }) => {
  const token = getToken();
  const userRole = getUserRole();

  if (!token || !isSessionValid()) {
    return <Navigate to="/login" replace />;
  }
  if (role && userRole !== role) {
    return <Navigate to={`/${userRole}`} replace />;
  }
  return children;
};

function App() {
  // Auto logout after 1 hour of inactivity
  useEffect(() => {
    let timeout;
    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        localStorage.clear();
        window.location.href = "/login";
      }, 3600000); // 1 hour
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute role="super_admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/user"
          element={
            <PrivateRoute role="user">
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route path="/access-control" element={<AccessControl />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
