import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './InfoTabs.css';

function InfoTabs() {
  return (
    <section
      className="section tabs-section"
      data-aos="fade-up"
    >
      <div className="tabs-card-wrapper">
        <h2 className="section-title">Conoce más del sistema</h2>
        
        <Tabs className="custom-tabs">
          <TabList className="custom-tab-list">
            <Tab className="custom-tab" selectedClassName="custom-tab--selected">Sobre el Proyecto</Tab>
            <Tab className="custom-tab" selectedClassName="custom-tab--selected">Estadísticas</Tab>
            <Tab className="custom-tab" selectedClassName="custom-tab--selected">Nuestro Objetivo</Tab>
          </TabList>

          {/* Pestaña 1: Sobre el Proyecto */}
          <TabPanel className="custom-tab-panel" selectedClassName="custom-tab-panel--selected">
            <div className="tab-content animate-fade-in">
              <h3>Gestión Digital de la ESFOT</h3>
              <p>
                <strong>EPN Accesible</strong> es una iniciativa académica e inclusiva desarrollada en la ESFOT para la gestión, reserva y monitoreo en tiempo real de espacios preferenciales. Permitimos a la comunidad universitaria planificar su llegada de forma autónoma y segura, eliminando la incertidumbre sobre la disponibilidad de parqueaderos y accesos prioritarios.
              </p>
            </div>
          </TabPanel>

          {/* Pestaña 2: Estadísticas */}
          <TabPanel className="custom-tab-panel" selectedClassName="custom-tab-panel--selected">
            <div className="tab-content animate-fade-in about-stats">
              <div className="stat-item">
                <span className="stat-value">+50</span>
                <span className="stat-desc">Espacios Mapeados</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">100%</span>
                <span className="stat-desc">Gestión Digital</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">24/7</span>
                <span className="stat-desc">Disponibilidad</span>
              </div>
            </div>
            <div className="tab-content animate-fade-in">
              <p style={{ marginTop: '10px' }}>
                Optimizamos el uso diario de la infraestructura mediante la digitalización de rutas y parqueaderos adaptados, generando datos clave para la mejora continua del campus.
              </p>
            </div>
          </TabPanel>

          <TabPanel className="custom-tab-panel" selectedClassName="custom-tab-panel--selected">
            <div className="tab-content animate-fade-in">
              <h3>Por un campus más inclusivo</h3>
              <p>
                Buscamos eliminar las barreras arquitectónicas mediante la tecnología, transparentando el estado de parqueaderos adaptados y rutas accesibles para reducir tiempos de traslado y promover el respeto a los espacios preferenciales.
              </p>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </section>
  );
}

export default InfoTabs;
