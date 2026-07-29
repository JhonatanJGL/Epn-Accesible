import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";

const cargarServiciosFirebase = async () => {
  const [authModule, firestoreModule, configModule] = await Promise.all([
    import("firebase/auth"),
    import("firebase/firestore"),
    import("../firebase/firebaseConfig"),
  ]);

  return { ...authModule, ...firestoreModule, ...configModule };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
  let activo = true;
  let unsubscribeAuth;
  let unsubscribePerfil;

  cargarServiciosFirebase()
    .then(({ onAuthStateChanged, onSnapshot, auth, db, doc }) => {
      if (!activo) return;

      unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
        if (!activo) return;

        setUser(firebaseUser);

        unsubscribePerfil?.();
        unsubscribePerfil = undefined;

        if (firebaseUser) {
          const referenciaPerfil = doc(
            db,
            "usuarios",
            firebaseUser.uid
          );

          unsubscribePerfil = onSnapshot(
            referenciaPerfil,
            (snap) => {
              if (!activo) return;

              setPerfil(snap.exists() ? snap.data() : null);
              setCargando(false);
            },
            (error) => {
              if (!activo) return;

              console.error("Error al escuchar el perfil:", error);
              setPerfil(null);
              setCargando(false);
            }
          );
        } else {
          setPerfil(null);
          setCargando(false);
        }
      });
    })
    .catch((error) => {
      if (!activo) return;

      console.error("Error al iniciar la autenticación:", error);
      setCargando(false);
    });

  return () => {
    activo = false;
    unsubscribeAuth?.();
    unsubscribePerfil?.();
  };
}, []);

  const correoExiste = async (correo) => {
    const { fetchSignInMethodsForEmail, auth } = await cargarServiciosFirebase();
    const metodos = await fetchSignInMethodsForEmail(auth, correo);
    return metodos.length > 0;
  };

  const login = async (correo, password) => {
    const { signInWithEmailAndPassword, auth } = await cargarServiciosFirebase();
    return signInWithEmailAndPassword(auth, correo, password);
  };

  const loginConGoogle = async () => {
    const {
      signInWithPopup,
      GoogleAuthProvider,
      doc,
      getDoc,
      setDoc,
      auth,
      db,
    } = await cargarServiciosFirebase();
    const proveedor = new GoogleAuthProvider();
    const credenciales = await signInWithPopup(auth, proveedor);
    const usuarioGoogle = credenciales.user;

    const referenciaPerfil = doc(db, "usuarios", usuarioGoogle.uid);
    const snap = await getDoc(referenciaPerfil);

    let datosPerfil;

    if (!snap.exists()) {
      const [nombre, ...resto] = (usuarioGoogle.displayName || "Usuario").split(
        " "
      );

      datosPerfil = {
        nombre: nombre || "Usuario",
        apellido: resto.join(" ") || "",
        correo: usuarioGoogle.email,
        edad: null,
        creadoEn: new Date().toISOString(),
        proveedor: "google",
      };

      await setDoc(referenciaPerfil, datosPerfil);
    } else {
      datosPerfil = snap.data();
    }

    setPerfil(datosPerfil);

    return credenciales;
  };

  const registrar = async ({ nombre, apellido, correo, edad, password }) => {
    const {
      createUserWithEmailAndPassword,
      updateProfile,
      doc,
      setDoc,
      signOut,
      auth,
      db,
    } = await cargarServiciosFirebase();
    const credenciales = await createUserWithEmailAndPassword(
      auth,
      correo,
      password
    );

    const nuevoUsuario = credenciales.user;

    await updateProfile(nuevoUsuario, {
      displayName: `${nombre} ${apellido}`,
    });

    const datosPerfil = {
      nombre,
      apellido,
      correo,
      edad: edad ? Number(edad) : null,
      creadoEn: new Date().toISOString(),
    };

    await setDoc(doc(db, "usuarios", nuevoUsuario.uid), datosPerfil);

    // Evita que Firebase deje abierta la sesión después de registrar.
    setPerfil(null);
    await signOut(auth);

    return credenciales;
  };

  const logout = async () => {
    const { signOut, auth } = await cargarServiciosFirebase();
    return signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        perfil,
        cargando,
        login,
        loginConGoogle,
        registrar,
        logout,
        correoExiste,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
