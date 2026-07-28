import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Typed from "typed.js";

import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import "./Header.css";

const navItems = [
  { to: "/", label: "Inicio", icon: "fa-solid fa-house" },
  {
    to: "/servicios",
    label: "Servicios",
    icon: "fa-solid fa-map-location-dot",
  },
  { to: "/galeria", label: "Galería", icon: "fa-regular fa-images" },
  { to: "/tipos", label: "Tipos", icon: "fa-solid fa-layer-group" },
  { to: "/estado", label: "Estado", icon: "fa-solid fa-chart-simple" },
  {
    to: "/reservaciones",
    label: "Reservaciones",
    icon: "fa-regular fa-calendar-check",
  },
];

const Header = () => {
  const typedTarget = useRef(null);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { user, perfil, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const typed = new Typed(typedTarget.current, {
      strings: ["EPN Accesible", "Gestión de Espacios"],
      typeSpeed: 70,
      backSpeed: 45,
      backDelay: 1800,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });

    return () => typed.destroy();
  }, []);

  const cerrarMenu = () => setMenuAbierto(false);

  const handleLogoutClick = async () => {
    await logout();
    cerrarMenu();
  };

  const getNavLinkClass = ({ isActive }) =>
    `header-nav-link${isActive ? " header-nav-link--active" : ""}`;

  return (
    <header className="header">
      <div className="header-container">
        <NavLink
          className="header-logo"
          to="/"
          onClick={cerrarMenu}
          aria-label="Ir al inicio"
        >
          <div className="logo-circle">
            <i className="fa-solid fa-wheelchair"></i>
          </div>
        </NavLink>

        <div className="header-title">
          <h1 className="header-title-text">
            <span ref={typedTarget}></span>
          </h1>

          <p className="header-subtitle-text">
            Gestión de Espacios Preferenciales
          </p>
        </div>

        <button
          className={`header-menu-btn${
            menuAbierto ? " header-menu-btn--open" : ""
          }`}
          type="button"
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          aria-controls="main-navigation"
          aria-expanded={menuAbierto}
          onClick={() => setMenuAbierto((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav
          id="main-navigation"
          className={`header-nav${menuAbierto ? " header-nav--open" : ""}`}
          aria-label="Navegación principal"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={getNavLinkClass}
              onClick={cerrarMenu}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </NavLink>
          ))}

          <button
            className="header-nav-link header-theme-toggle"
            type="button"
            onClick={toggleTheme}
            title={theme === "light" ? "Activar modo oscuro" : "Activar modo claro"}
            aria-label={theme === "light" ? "Activar modo oscuro" : "Activar modo claro"}
          >
            <i className={theme === "light" ? "fa-solid fa-moon" : "fa-solid fa-sun"}></i>
            <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
          </button>

          {user && (
            <div className="header-user-info header-nav-user" title={user.email}>
              <i className="fa-regular fa-user"></i>
              <span className="header-user-name">
                {perfil?.nombre || user.email}
              </span>
            </div>
          )}

          {user ? (
            <button
              className="header-nav-link header-auth-link"
              type="button"
              onClick={handleLogoutClick}
              title="Cerrar sesión"
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <span>Cerrar sesión</span>
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `header-nav-link header-auth-link${
                  isActive ? " header-nav-link--active" : ""
                }`
              }
              onClick={cerrarMenu}
            >
              <i className="fa-regular fa-user"></i>
              <span>Iniciar sesión</span>
            </NavLink>
          )}
        </nav>
      </div>

      {menuAbierto && (
        <button
          className="header-backdrop"
          type="button"
          aria-label="Cerrar menú"
          onClick={cerrarMenu}
        ></button>
      )}
    </header>
  );
};

export default Header;
