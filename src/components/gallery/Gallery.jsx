import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import './Gallery.css';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Lista de fotos con sus detalles
const galleryData = [
  {
    id: 7,
    src: '/images/img7.webp',
    title: 'Facultad Ingenieria Civil',
    description: 'Facilita la movilidad en silla de ruedas.'
  },
  {
    id: 8,
    src: '/images/img8.webp',
    title: 'Facultad Ingenieria Civil',
    description: 'Espacios señalizados y reservados cerca de las aulas para estudiantes con movilidad reducida.'
  },
  {
    id: 9,
    src: '/images/img9.webp',
    title: 'Biblioteca General',
    description: 'Rutas libres de obstáculos diseñadas para un tránsito seguro en el campus.'
  },
  {
    id: 10,
    src: '/images/img10.webp',
    title: 'Facultad de Ciencias',
    description: 'Acceso directo con rampas de pendiente baja e iluminación adecuada.'
  },
  {
    id: 11,
    src: '/images/img11.webp',
    title: 'Edificio de Formacion Basica',
    description: 'Paneles informativos con alto contraste y pictogramas accesibles.'
  },
  {
    id: 12,
    src: '/images/img12.webp',
    title: 'Facultad Ingenieria Electrica / Electronica',
    description: 'Puertas amplias y niveles adaptados para facilitar el ingreso a zonas prácticas.'
  },
  {
    id: 13,
    src: '/images/img13.webp',
    title: 'Facultad Ingenieria Mecanica',
    description: 'Espacios de permanencia accesibles cerca de las zonas académicas.'
  },
  {
    id: 14,
    src: '/images/img14.webp',
    title: 'Facultad Ciencias Administrativas',
    description: 'Elevador prioritario equipado con botones a altura accesible.'
  },
  {
    id: 15,
    src: '/images/img15.webp',
    title: 'ESFOT',
    description: 'Camino con baldosa podotáctil y pasamanos de doble altura.'
  },
  {
    id: 16,
    src: '/images/img16.webp',
    title: 'Facultad Ingenieria de Sitemas',
    description: 'Acceso a comedor y asociacion FIS'
  }
];

const Gallery = () => {
  // Estado para la imagen seleccionada en el modal
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="gallery section gallery-section" data-aos="zoom-in">
      <h3 className="gallery__title">Galería</h3>
      <p className="gallery__description">Espacios accesibles del campus (haz clic en una imagen para ver detalles).</p>
      
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        spaceBetween={24}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
        className="gallery__swiper"
      >
        {galleryData.map((item) => (
          <SwiperSlide key={item.id}>
            <button
              type="button"
              className="gallery-card"
              onClick={() => setSelectedImage(item)}
              aria-label={`Ver detalle de ${item.title}`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="gallery-img"
                loading="lazy"
                decoding="async"
              />
              <div className="gallery-overlay">
                <span> Ver detalle</span>
              </div>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Ventana Modal al hacer Clic */}
      {selectedImage && (
        <div className="gallery-modal" onClick={() => setSelectedImage(null)}>
          <div
            className="gallery-modal__content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="gallery-modal__close"
              onClick={() => setSelectedImage(null)}
              aria-label="Cerrar detalle"
            >
              &times;
            </button>
            <img src={selectedImage.src} alt={selectedImage.title} className="gallery-modal__img" decoding="async" />
            <div className="gallery-modal__info">
              <h4 id="gallery-modal-title">{selectedImage.title}</h4>
              <p>{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
