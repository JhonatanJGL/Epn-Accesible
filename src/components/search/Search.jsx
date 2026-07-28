import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AOS from "aos";

import {
  cuposDisponibles,
  espacios,
  tiposEspacio,
} from "../../data/spaces";
import { useReservations } from "../../hooks/useReservations";
import "./Search.css";

const Search = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { reservas } = useReservations();

  const tipoSeleccionado = searchParams.get("tipo") || "todos";

  const resultados = useMemo(() => {
    if (tipoSeleccionado === "todos") return tiposEspacio;

    return tiposEspacio.filter((tipo) => tipo.id === tipoSeleccionado);
  }, [tipoSeleccionado]);

  const cambiarFiltro = (tipo) => {
    if (tipo === "todos") {
      setSearchParams({});
    } else {
      setSearchParams({ tipo });
    }

    window.setTimeout(() => AOS.refreshHard(), 100);
  };

  const reservarTipo = (tipoId) => {
    const espacio = espacios.find((item) => item.tipo === tipoId);

    if (!espacio) return;

    navigate("/reservaciones", {
      state: { espacioId: espacio.id },
    });
  };

  return (
    <section
      id="buscar-espacio"
      className="section search-section"
      data-aos="fade-up"
    >
      <h2 className="section-title">Buscar espacio</h2>

      <div className="search-filters">
        <label className="filter-row">
          <i className="fa-solid fa-tags filter-icon"></i>

          <span className="filter-label">Tipo de espacio</span>

          <select
            className="filter-value"
            value={tipoSeleccionado}
            onChange={(e) => cambiarFiltro(e.target.value)}
          >
            <option value="todos">Todos los tipos</option>

            {tiposEspacio.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nombre}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="search-results">
        {resultados.map((tipo, indice) => {
          const disponibles = cuposDisponibles(tipo.id, reservas);
          const esFiltroIndividual = tipoSeleccionado !== "todos";

          return (
            <article
              className={`search-type-card${
                esFiltroIndividual ? " search-type-card--expanded" : ""
              }`}
              key={`${tipoSeleccionado}-${tipo.id}`}
              data-aos="fade-up"
              data-aos-duration="500"
              data-aos-delay={indice * 80}
            >
              <div className="search-type-icon">
                <i className={`fa-solid ${tipo.icono}`}></i>
              </div>

              <div className="search-type-content">
                <p className="search-type-label">Tipo de espacio</p>
                <h3>{tipo.nombre}</h3>

                <p className="search-type-description">
                  Espacios diseñados para facilitar una movilidad segura,
                  cómoda e inclusiva dentro del campus.
                </p>
              </div>

              <div className="search-type-actions">
                <button
                  className="search-reserve-btn"
                  type="button"
                  disabled={disponibles <= 0}
                  onClick={() => reservarTipo(tipo.id)}
                >
                  <i className="fa-regular fa-calendar-check"></i>
                  {disponibles > 0 ? "Reservar" : "Sin cupos"}
                </button>

                {tipoSeleccionado !== "todos" && (
                  <button
                    className="search-show-all-btn"
                    type="button"
                    onClick={() => cambiarFiltro("todos")}
                  >
                    Ver todos los tipos
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Search;