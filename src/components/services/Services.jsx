import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { toast } from 'react-toastify';
import 'leaflet/dist/leaflet.css';
import './Services.css';

// Parche obligatorio para iconos de Leaflet en entornos React + Vite
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';

const customIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const EPN_COORDS = [-0.2104, -78.4892];

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { 
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    if (sectionElement) {
      observer.observe(sectionElement);
    }

    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
    };
  }, []);

  const infoServicios = [
    {
      id: 1,
      titulo: "Mapa en Tiempo Real",
      descripcion: "Monitoreo en vivo de la disponibilidad de parqueaderos preferenciales y ascensores.",
      iconoClass: "fa-solid fa-map-location-dot",
      claseColor: "color-verde"
    },
    {
      id: 2,
      titulo: "Sistema de Reservas",
      descripcion: "Asegura tu espacio preferencial de forma autónoma antes de llegar al campus.",
      iconoClass: "fa-solid fa-square-parking",
      claseColor: "color-azul-suave"
    },
    {
      id: 3,
      titulo: "Rutas de Accesibilidad",
      descripcion: "Visualiza rutas optimizadas sin obstáculos para una mejor movilidad en la EPN.",
      iconoClass: "fa-solid fa-wheelchair",
      claseColor: "color-rojo"
    }
  ];

  const manejarClickServicio = (servicio) => {
    if (servicio.id === 3) {
      toast.info("Aún no se calculan las rutas de accesibilidad");
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className={`services-section ${isVisible ? 'is-visible' : 'is-hidden'}`}
    >
      <div className="services-container">
        
        <div className="services-info-side">
          <span className="services-subtitle anim-item-1">Servicios e Infraestructura</span>
          <h2 className="services-title anim-item-2">EPN Accesible</h2>
          <p className="services-description anim-item-3">
            Herramientas diseñadas para mejorar la movilidad y gestionar de forma autónoma los espacios preferenciales dentro del campus.
          </p>

          <div className="services-mini-grid">
            {infoServicios.map((servicio, index) => (
              <div 
                key={servicio.id} 
                className="service-compact-card anim-card"
                style={{ '--card-index': index }}
                onClick={() => manejarClickServicio(servicio)}
              >
                <div className={`card-icon-container ${servicio.claseColor}`}>
                  <i className={servicio.iconoClass}></i>
                </div>
                <div className="card-texts">
                  <h3>{servicio.titulo}</h3>
                  <p>{servicio.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="services-map-side anim-map">
          <div className="services-map-wrapper">
            <MapContainer 
              center={EPN_COORDS} 
              zoom={16} 
              scrollWheelZoom={false}
              className="custom-leaflet-map"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />
              <Marker position={EPN_COORDS} icon={customIcon}>
                <Popup className="custom-popup">
                  <strong>EPN Accesible</strong> <br />
                  Campus Politécnico J. Rubén Orellana R.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>

      </div>
    </section>
  );
}
