import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/HomePage";
import "../pages/pages.css";
import ProtectedRoute from "./ProtectedRoute";

const ServicesPage = lazy(() => import("../pages/ServicesPage"));
const GalleryPage = lazy(() => import("../pages/GalleryPage"));
const TypesPage = lazy(() => import("../pages/TypesPage"));
const StatusPage = lazy(() => import("../pages/StatusPage"));
const ReservationsPage = lazy(() => import("../pages/ReservationsPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));

const AppRoutes = () => {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/servicios" element={<ServicesPage />} />
          <Route path="/galeria" element={<GalleryPage />} />
          <Route path="/tipos" element={<TypesPage />} />
          <Route path="/estado" element={<StatusPage />} />
          <Route
            path="/reservaciones"
            element={
              <ProtectedRoute>
                <ReservationsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
