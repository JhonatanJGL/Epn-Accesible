import { toast } from "react-toastify";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  cuposDisponibles,
  reservasActivas,
  tiposEspacio,
} from "../../data/spaces";
import { useReservations } from "../../hooks/useReservations";
import "./Status.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const historialBase = [
  { dia: "Sáb", reservas: 15 },
  { dia: "Dom", reservas: 9 },
  { dia: "Lun", reservas: 7 },
  { dia: "Mar", reservas: 11 },
  { dia: "Mié", reservas: 6 },
  { dia: "Jue", reservas: 13 },
  { dia: "Vie", reservas: 5 },
];

const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

const contarReservasPorDia = (reservas) => {
  const conteo = {};
  diasSemana.forEach((dia) => (conteo[dia] = 0));

  const hoy = new Date();

  reservas.forEach((r) => {
    if (!r.fecha) return;
    const fecha = new Date(`${r.fecha}T00:00:00`);
    if (isNaN(fecha)) return;

    const diffDias = (hoy - fecha) / (1000 * 60 * 60 * 24);
    if (diffDias >= 0 && diffDias < 7) {
      const dia = diasSemana[fecha.getDay()];
      conteo[dia] += 1;
    }
  });

  return conteo;
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (context) => `${context.parsed.y} reservas`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { stepSize: 5 },
      grid: { color: "rgba(0,0,0,0.06)" },
    },
    x: {
      grid: { display: false },
    },
  },
};

const Status = () => {
  const { reservas, cargandoReservas } = useReservations();

  const total = tiposEspacio.reduce(
    (suma, tipo) => suma + tipo.capacidad,
    0
  );

  const disponibles = tiposEspacio.reduce(
    (suma, tipo) => suma + cuposDisponibles(tipo.id, reservas),
    0
  );

  const ocupados = total - disponibles;
  const activas = reservasActivas(reservas).length;

  const reservasReales = contarReservasPorDia(reservas);

  const chartData = {
    labels: historialBase.map((d) => d.dia),
    datasets: [
      {
        label: "Reservas",
        data: historialBase.map(
          (d) => d.reservas + (reservasReales[d.dia] || 0)
        ),
        backgroundColor: "#2563eb",
        borderRadius: 6,
        maxBarThickness: 40,
      },
    ],
  };

  const mostrarDisponibles = () => {
    toast.info(`Hay ${disponibles} espacios disponibles en este momento.`);
  };

  const mostrarOcupados = () => {
    toast.warning(`Actualmente hay ${ocupados} espacios ocupados.`);
  };

  const mostrarActivas = () => {
    toast.info(`Tienes ${activas} reservas activas registradas.`);
  };

  return (
    <section className="section status-section" data-aos="fade-up">
      <h2 className="section-title">Estado general</h2>

      <div className="status-grid">
        <div
          className="status-card interactive"
          onClick={mostrarDisponibles}
        >
          <div className="status-icon icon-green">
            <i className="fa-solid fa-wheelchair"></i>
          </div>
          <div className="status-info">
            <span className="status-number text-green">
              {cargandoReservas ? "..." : disponibles}
            </span>
            <span className="status-label text-green">Disponibles</span>
          </div>
        </div>

        <div className="status-card interactive" onClick={mostrarOcupados}>
          <div className="status-icon icon-red">
            <i className="fa-solid fa-wheelchair"></i>
          </div>
          <div className="status-info">
            <span className="status-number text-red">
              {cargandoReservas ? "..." : ocupados}
            </span>
            <span className="status-label text-red">Ocupados</span>
          </div>
        </div>

        <div className="status-card interactive" onClick={mostrarActivas}>
          <div className="status-icon icon-blue">
            <i className="fa-regular fa-calendar-days"></i>
          </div>
          <div className="status-info">
            <span className="status-number text-blue">
              {cargandoReservas ? "..." : activas}
            </span>
            <span className="status-label text-blue">
              Reservas activas
            </span>
          </div>
        </div>
      </div>

      <div className="status-chart-card">
        <h3 className="status-chart-title">Reservas de la última semana</h3>
        <div className="status-chart-wrapper">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </section>
  );
};

export default Status;