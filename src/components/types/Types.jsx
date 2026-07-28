import { useNavigate } from "react-router-dom";

import { cuposDisponibles, tiposEspacio } from "../../data/spaces";
import { useReservations } from "../../hooks/useReservations";
import "./Types.css";

const Types = () => {
  const navigate = useNavigate();
  const { reservas, cargandoReservas } = useReservations();

  const abrirBusqueda = (tipoId) => {
    navigate(`/?tipo=${tipoId}#buscar-espacio`);
  };

  return (
    <section className="section types-section" data-aos="fade-up">
      <h2 className="section-title">Tipos de espacios</h2>

      <div className="types-grid">
        {tiposEspacio.map((tipo) => {
          const disponibles = cuposDisponibles(tipo.id, reservas);

          return (
            <button
              className="type-card interactive"
              key={tipo.id}
              type="button"
              onClick={() => abrirBusqueda(tipo.id)}
              title={`Buscar ${tipo.nombre}`}
            >
              <div className="type-icon">
                <i className={`fa-solid ${tipo.icono}`}></i>
              </div>

              <div className="type-content">
                <div className="badge-green">
                  {cargandoReservas ? "..." : `${disponibles} disp.`}
                </div>

                <p className="type-text">{tipo.nombre}</p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default Types;