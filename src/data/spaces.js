export const tiposEspacio = [
  {
    id: "parqueadero",
    nombre: "Parqueaderos accesibles",
    icono: "fa-car",
    capacidad: 10,
  },
  {
    id: "asiento",
    nombre: "Asientos preferenciales",
    icono: "fa-chair",
    capacidad: 10,
  },
  {
    id: "ascensor",
    nombre: "Ascensores accesibles",
    icono: "fa-elevator",
    capacidad: 10,
  },
  {
    id: "ruta",
    nombre: "Rutas y rampas",
    icono: "fa-wheelchair-move",
    capacidad: 10,
  },
];

export const espacios = [
  { id: "p1", nombre: "Parqueadero accesible P1", tipo: "parqueadero" },
  { id: "p2", nombre: "Parqueadero accesible P2", tipo: "parqueadero" },
  { id: "a1", nombre: "Asiento preferencial A1", tipo: "asiento" },
  { id: "a2", nombre: "Asiento preferencial A2", tipo: "asiento" },
  { id: "e1", nombre: "Ascensor accesible E1", tipo: "ascensor" },
  { id: "r1", nombre: "Ruta accesible R1", tipo: "ruta" },
];

const tiposPorId = new Map(tiposEspacio.map((tipo) => [tipo.id, tipo]));
const tiposPorNombreEspacio = new Map(
  espacios.map((espacio) => [espacio.nombre, espacio.tipo])
);

export const tipoDeReserva = (reserva) => {
  if (reserva.tipo) return reserva.tipo;

  return tiposPorNombreEspacio.get(reserva.espacio) || null;
};

export const fechaLocalActual = () => {
  const fecha = new Date();
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, "0");
  const day = String(fecha.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const reservaVencida = (reserva) => {
  if (!reserva.fecha) return false;

  // Combinamos fecha + hora de fin de la reserva y comparamos
  // contra el momento actual, no solo contra el día actual.
  const horaFin = reserva.fin || "23:59";
  const finReserva = new Date(`${reserva.fecha}T${horaFin}:00`);

  return finReserva < new Date();
};

export const reservasActivas = (reservas) =>
  reservas.filter(
    (reserva) => reserva.estado === "activa" && !reservaVencida(reserva)
  );

export const cuposDisponibles = (tipoId, reservas, periodo = null) => {
  const tipo = tiposPorId.get(tipoId);

  if (!tipo) return 0;

  let ocupados = 0;

  for (const reserva of reservas) {
    if (
      reserva.estado !== "activa" ||
      reservaVencida(reserva) ||
      tipoDeReserva(reserva) !== tipoId
    ) {
      continue;
    }

    if (
      !periodo ||
      (reserva.fecha === periodo.fecha &&
        reserva.inicio < periodo.fin &&
        reserva.fin > periodo.inicio)
    ) {
      ocupados += 1;
    }
  }

  return Math.max(tipo.capacidad - ocupados, 0);
};
