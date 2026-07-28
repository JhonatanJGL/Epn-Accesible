import { Navigate, useLocation, useNavigate } from "react-router-dom";

import AuthForm from "../components/auth/AuthForm";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const { user, cargando } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const fromLocation = location.state?.from;
  const from = fromLocation
    ? `${fromLocation.pathname}${fromLocation.search || ""}${fromLocation.hash || ""}`
    : "/";

  const handleAuthSuccess = () => {
    navigate(from, { replace: true });
  };

  if (cargando) {
    return (
      <main className="main-content page-content login-page">
        <section className="section route-loading">
          <i className="fa-solid fa-circle-notch fa-spin"></i>
          <p>Verificando sesión...</p>
        </section>
      </main>
    );
  }

  if (user) {
    return <Navigate to={from} replace />;
  }

  return (
    <main className="main-content page-content login-page">
      <section className="section login-section">
        <div className="auth-page-card">
          <AuthForm onSuccess={handleAuthSuccess} />
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
