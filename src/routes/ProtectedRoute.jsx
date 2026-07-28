import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user, cargando } = useAuth();
  const location = useLocation();

  if (cargando) {
    return (
      <main className="main-content page-content">
        <section className="section route-loading">
          <i className="fa-solid fa-circle-notch fa-spin"></i>
          <p>Verificando sesión...</p>
        </section>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
