import './AppSection.css';

const AppSection = () => {
  return (
    <section className="app app-section" data-aos="fade-up">

      <div className="mobile__video" data-aos="fade-right" data-aos-delay="100">
        <video autoPlay muted loop playsInline preload="metadata">
          <source src="/images/appvideo.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="mobile" data-aos="fade-left" data-aos-delay="200">
        <span className="mobile__label"> Disponible ahora</span>
        <h2 className="mobile__title">
          Descarga <span>EPN Accesible</span>
        </h2>
        <p className="mobile__description">
          EPN Accesible es una plataforma enfocada en mejorar la movilidad y
          accesibilidad dentro del campus universitario. Localiza espacios
          seguros y preferenciales en tiempo real, facilitando la reserva de
          parqueaderos, rutas inclusivas y ascensores.
        </p>
        <div className="mobile__buttons">
          <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="store-btn">
            <img src="/images/app1.jpeg" alt="App Store" className="store-btn__logo" />
            <div className="store-btn__text">
              <span className="store-btn__sub">Disponible en</span>
              <span className="store-btn__name">App Store</span>
            </div>
          </a>
          <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="store-btn">
            <img src="/images/app2.jpg" alt="Google Play" className="store-btn__logo" />
            <div className="store-btn__text">
              <span className="store-btn__sub">Disponible en</span>
              <span className="store-btn__name">Google Play</span>
            </div>
          </a>
        </div>
      </div>

    </section>
  );
};

export default AppSection;
