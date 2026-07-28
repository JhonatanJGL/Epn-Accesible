import { useEffect, useState } from "react";
import { reservaVencida } from "../data/spaces";

export const useReservations = () => {
  const [reservas, setReservas] = useState([]);
  const [cargandoReservas, setCargandoReservas] = useState(true);

  useEffect(() => {
    let cancelarEscucha;
    let activo = true;

    Promise.all([import("firebase/firestore"), import("../firebase/firebaseConfig")])
      .then(([{ collection, onSnapshot }, { db }]) => {
        if (!activo) return;

        cancelarEscucha = onSnapshot(
          collection(db, "reservas"),
      (snapshot) => {
        if (!activo) return;
        const datos = snapshot.docs.map((documento) => ({
          id: documento.id,
          ...documento.data(),
        }));

        setReservas(datos.filter((reserva) => !reservaVencida(reserva)));
        setCargandoReservas(false);
      },
      (error) => {
        if (!activo) return;
        console.error("Error al cargar reservas:", error);
        setCargandoReservas(false);
      }
        );
      })
      .catch((error) => {
        if (!activo) return;
        console.error("Error al iniciar las reservas:", error);
        setCargandoReservas(false);
      });

    return () => {
      activo = false;
      cancelarEscucha?.();
    };
  }, []);

  return { reservas, cargandoReservas };
};
