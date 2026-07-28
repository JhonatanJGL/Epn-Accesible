import { useEffect, useMemo, useRef } from "react";
import Chart from "chart.js/auto";

import { tipoDeReserva, tiposEspacio } from "../../data/spaces";
import { useReservations } from "../../hooks/useReservations";
import "./Statistics.css";

const Statistics = () => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const { reservas, cargandoReservas } = useReservations();

  const { estadisticas, totalReservados, tipoMasReservado } = useMemo(() => {
    const reservadosPorTipo = new Map(
      tiposEspacio.map((tipo) => [tipo.id, 0])
    );

    for (const reserva of reservas) {
      const tipoId = tipoDeReserva(reserva);

      if (reservadosPorTipo.has(tipoId)) {
        reservadosPorTipo.set(tipoId, reservadosPorTipo.get(tipoId) + 1);
      }
    }

    const datos = tiposEspacio.map((tipo) => {
      const reservados = reservadosPorTipo.get(tipo.id);
      return { ...tipo, reservados };
    });

    const total = datos.reduce(
      (acumulado, tipo) => acumulado + tipo.reservados,
      0
    );
    const tipoMayor = datos.reduce(
      (mayor, tipo) => (tipo.reservados > mayor.reservados ? tipo : mayor),
      datos[0] || { nombre: "Sin datos", reservados: 0 }
    );

    return {
      estadisticas: datos,
      totalReservados: total,
      tipoMasReservado: tipoMayor,
    };
  }, [reservas]);

  useEffect(() => {
    if (!canvasRef.current || cargandoReservas) return undefined;

    chartRef.current?.destroy();

    const estilos = getComputedStyle(document.documentElement);
    const colorTexto =
      estilos.getPropertyValue("--text-main").trim() || "#334155";
    const colorSecundario =
      estilos.getPropertyValue("--text-light").trim() || "#64748b";
    const colorSuperficie =
      estilos.getPropertyValue("--bg-white").trim() || "#ffffff";

    const colores = ["#005ca9", "#00a859", "#f59e0b", "#8b5cf6"];

    const textoCentral = {
      id: "textoCentral",
      afterDraw(chart) {
        const { ctx, chartArea } = chart;
        if (!chartArea) return;

        const centroX = (chartArea.left + chartArea.right) / 2;
        const centroY = (chartArea.top + chartArea.bottom) / 2;

        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = colorTexto;
        ctx.font = "700 30px Arial, sans-serif";
        ctx.fillText(String(totalReservados), centroX, centroY - 8);
        ctx.fillStyle = colorSecundario;
        ctx.font = "600 12px Arial, sans-serif";
        ctx.fillText("RESERVADOS", centroX, centroY + 20);
        ctx.restore();
      },
    };

    chartRef.current = new Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        labels: estadisticas.map((tipo) => tipo.nombre),
        datasets: [
          {
            data: estadisticas.map((tipo) => tipo.reservados),
            backgroundColor: colores,
            borderColor: colorSuperficie,
            borderWidth: 5,
            hoverOffset: 10,
          },
        ],
      },
      plugins: [textoCentral],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "68%",
        animation: {
          duration: 850,
          easing: "easeOutQuart",
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            padding: 12,
            displayColors: true,
            callbacks: {
              label: (context) => {
                const cantidad = Number(context.raw) || 0;
                const porcentaje = totalReservados
                  ? Math.round((cantidad / totalReservados) * 100)
                  : 0;
                return ` ${cantidad} lugar(es) · ${porcentaje}%`;
              },
            },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [estadisticas, totalReservados, cargandoReservas]);

  return (
    <section className="section statistics-section" data-aos="fade-up">
      <div className="statistics-heading">
        <div>
          <span className="statistics-eyebrow">Panel estadístico</span>
          <h2 className="section-title statistics-title">
            Lugares reservados
          </h2>
          <p>
            Distribución en tiempo real de las reservas activas por tipo de
            espacio accesible.
          </p>
        </div>

        <div className="statistics-live" aria-label="Datos en tiempo real">
          <span></span>
          En tiempo real
        </div>
      </div>

      {cargandoReservas ? (
        <div className="statistics-loading">
          <span className="statistics-spinner"></span>
          Cargando estadísticas...
        </div>
      ) : (
        <div className="statistics-dashboard">
          <div className="statistics-chart-card">
            <div className="statistics-chart-wrapper">
              <canvas
                ref={canvasRef}
                aria-label="Gráfica de lugares reservados por tipo"
                role="img"
              ></canvas>
            </div>

            <div className="statistics-chart-caption">
              <strong>{totalReservados}</strong>
              <span>reservas activas registradas</span>
            </div>
          </div>

          <div className="statistics-details">
            <div className="statistics-highlight">
              <div className="statistics-highlight-icon">
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <div>
                <span>Mayor demanda</span>
                <strong>{tipoMasReservado.nombre}</strong>
                <small>{tipoMasReservado.reservados} reserva(s)</small>
              </div>
            </div>

            <div className="statistics-list">
              {estadisticas.map((tipo, index) => {
                const porcentaje = totalReservados
                  ? Math.round((tipo.reservados / totalReservados) * 100)
                  : 0;

                return (
                  <article className="statistics-item" key={tipo.id}>
                    <div
                      className={`statistics-item-icon statistics-color-${index + 1}`}
                    >
                      <i className={`fa-solid ${tipo.icono}`}></i>
                    </div>

                    <div className="statistics-item-content">
                      <div className="statistics-item-header">
                        <span>{tipo.nombre}</span>
                        <strong>{tipo.reservados}</strong>
                      </div>

                      <div className="statistics-progress" aria-hidden="true">
                        <span
                          className={`statistics-progress-fill statistics-bg-${index + 1}`}
                          style={{ width: `${porcentaje}%` }}
                        ></span>
                      </div>

                      <small>{porcentaje}% del total reservado</small>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Statistics;
