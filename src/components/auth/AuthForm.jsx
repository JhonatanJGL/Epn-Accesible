import { useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import "./AuthModal.css";

const AuthForm = ({ onSuccess }) => {
  const { login, registrar, loginConGoogle } = useAuth();

  const [vista, setVista] = useState("login");
  const [cargando, setCargando] = useState(false);
  const [cargandoGoogle, setCargandoGoogle] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const [loginData, setLoginData] = useState({
    correo: "",
    password: "",
  });

  const [registroData, setRegistroData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    edad: "",
    password: "",
    confirmar: "",
  });

  const limpiarMensajes = () => {
    setError("");
    setExito("");
  };

  const resetearFormulario = () => {
    limpiarMensajes();
    setVista("login");
    setLoginData({ correo: "", password: "" });
    setRegistroData({
      nombre: "",
      apellido: "",
      correo: "",
      edad: "",
      password: "",
      confirmar: "",
    });
  };

  const finalizarAutenticacion = (delay) => {
    window.setTimeout(() => {
      resetearFormulario();
      onSuccess?.();
    }, delay);
  };

  const irARegistro = (correoPrecargado = "") => {
    limpiarMensajes();
    setRegistroData((prev) => ({
      ...prev,
      correo: correoPrecargado,
    }));
    setVista("registro");
  };

  const traducirError = (codigo) => {
    const mensajes = {
      "auth/invalid-email": "El correo electrónico no es válido.",
      "auth/user-not-found": "No existe una cuenta con ese correo.",
      "auth/wrong-password": "La contraseña es incorrecta.",
      "auth/invalid-credential": "Correo o contraseña incorrectos.",
      "auth/email-already-in-use":
        "Ese correo ya está registrado. Intenta iniciar sesión.",
      "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
      "auth/too-many-requests": "Demasiados intentos. Intenta más tarde.",
      "auth/popup-closed-by-user": "Cerraste la ventana antes de completar el acceso.",
    };

    return mensajes[codigo] || "Ocurrió un error. Intenta de nuevo.";
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    limpiarMensajes();
    setCargando(true);

    try {
      await login(loginData.correo, loginData.password);
      setExito("¡Bienvenido de nuevo!");
      finalizarAutenticacion(800);
    } catch (err) {
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/invalid-credential"
      ) {
        irARegistro(loginData.correo);
        setError(
          "No tienes una cuenta vinculada a ese correo o la contraseña no coincide. Si es tu primera vez, regístrate."
        );
      } else {
        setError(traducirError(err.code));
      }
    } finally {
      setCargando(false);
    }
  };

  const handleGoogleSubmit = async () => {
    limpiarMensajes();
    setCargandoGoogle(true);

    try {
      await loginConGoogle();
      setExito("¡Bienvenido!");
      finalizarAutenticacion(800);
    } catch (err) {
      setError(traducirError(err.code));
    } finally {
      setCargandoGoogle(false);
    }
  };

  const handleRegistroSubmit = async (e) => {
    e.preventDefault();
    limpiarMensajes();

    if (registroData.password !== registroData.confirmar) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (registroData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setCargando(true);

    try {
      await registrar(registroData);

      setExito("Usuario registrado correctamente. Ahora inicia sesión.");

      setLoginData({
        correo: registroData.correo,
        password: "",
      });

      setRegistroData({
        nombre: "",
        apellido: "",
        correo: "",
        edad: "",
        password: "",
        confirmar: "",
      });

      setVista("login");
    } catch (err) {
      setError(traducirError(err.code));
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <div className="auth-header">
        <div className="auth-logo-circle">
          <i className="fa-solid fa-wheelchair"></i>
        </div>

        <h2 className="auth-title">
          {vista === "login" ? "Iniciar sesión" : "Crear cuenta"}
        </h2>

        <p className="auth-subtitle">
          {vista === "login"
            ? "Accede a tu cuenta de EPN Accesible"
            : "Completa tus datos para registrarte"}
        </p>
      </div>

      {error && <div className="auth-message auth-message-error">{error}</div>}
      {exito && <div className="auth-message auth-message-success">{exito}</div>}

      <button
        type="button"
        className="auth-google-btn"
        onClick={handleGoogleSubmit}
        disabled={cargandoGoogle}
      >
        <i className="fa-brands fa-google"></i>
        {cargandoGoogle ? "Conectando..." : "Continuar con Google"}
      </button>

      <div className="auth-divider">
        <span>o</span>
      </div>

      {vista === "login" ? (
        <form className="auth-form" onSubmit={handleLoginSubmit}>
          <div className="auth-field">
            <label htmlFor="login-correo">Correo electrónico</label>
            <input
              id="login-correo"
              type="email"
              required
              value={loginData.correo}
              onChange={(e) =>
                setLoginData({ ...loginData, correo: e.target.value })
              }
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="login-password">Contraseña</label>
            <input
              id="login-password"
              type="password"
              required
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              placeholder="********"
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={cargando}>
            {cargando ? "Verificando..." : "Iniciar sesión"}
          </button>

          <p className="auth-switch-text">
            ¿No tienes cuenta?{" "}
            <span
              className="auth-switch-link"
              onClick={() => irARegistro(loginData.correo)}
            >
              Regístrate
            </span>
          </p>
        </form>
      ) : (
        <form className="auth-form" onSubmit={handleRegistroSubmit}>
          <div className="auth-field-row">
            <div className="auth-field">
              <label htmlFor="reg-nombre">Nombre</label>
              <input
                id="reg-nombre"
                type="text"
                required
                value={registroData.nombre}
                onChange={(e) =>
                  setRegistroData({ ...registroData, nombre: e.target.value })
                }
                placeholder="Juan"
              />
            </div>

            <div className="auth-field">
              <label htmlFor="reg-apellido">Apellido</label>
              <input
                id="reg-apellido"
                type="text"
                required
                value={registroData.apellido}
                onChange={(e) =>
                  setRegistroData({ ...registroData, apellido: e.target.value })
                }
                placeholder="Pérez"
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="reg-correo">Correo electrónico</label>
            <input
              id="reg-correo"
              type="email"
              required
              value={registroData.correo}
              onChange={(e) =>
                setRegistroData({ ...registroData, correo: e.target.value })
              }
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div className="auth-field">
            <label htmlFor="reg-edad">Edad</label>
            <input
              id="reg-edad"
              type="number"
              min="1"
              max="120"
              value={registroData.edad}
              onChange={(e) =>
                setRegistroData({ ...registroData, edad: e.target.value })
              }
              placeholder="20"
            />
          </div>

          <div className="auth-field-row">
            <div className="auth-field">
              <label htmlFor="reg-password">Contraseña</label>
              <input
                id="reg-password"
                type="password"
                required
                value={registroData.password}
                onChange={(e) =>
                  setRegistroData({ ...registroData, password: e.target.value })
                }
                placeholder="********"
              />
            </div>

            <div className="auth-field">
              <label htmlFor="reg-confirmar">Confirmar</label>
              <input
                id="reg-confirmar"
                type="password"
                required
                value={registroData.confirmar}
                onChange={(e) =>
                  setRegistroData({ ...registroData, confirmar: e.target.value })
                }
                placeholder="********"
              />
            </div>
          </div>

          <button type="submit" className="auth-submit-btn" disabled={cargando}>
            {cargando ? "Creando cuenta..." : "Registrarse"}
          </button>

          <p className="auth-switch-text">
            ¿Ya tienes cuenta?{" "}
            <span
              className="auth-switch-link"
              onClick={() => {
                limpiarMensajes();
                setVista("login");
              }}
            >
              Inicia sesión
            </span>
          </p>
        </form>
      )}
    </>
  );
};

export default AuthForm;