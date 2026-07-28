import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import "./Footer.css";

function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">
              <i className="fa-solid fa-wheelchair"></i>
            </div>
            <div className="footer__brand-text">
              <h3 className="footer__name">EPN Accesible</h3>
              <p className="footer__slogan">Gestión de Espacios Preferenciales</p>
            </div>
          </div>
          <p className="footer__desc">
            Facilitamos la movilidad y autonomía de la comunidad politécnica,
            conectando personas con los espacios que necesitan.
          </p>
        </div>

        <hr className="footer__divider" />

        <motion.div
          className="footer__links"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="footer__col" variants={itemVariants}>
            <h4 className="footer__col-title">Navegación</h4>
            <ul className="footer__list">
              <li>
                <Link to="/">
                  <i className="fa-solid fa-house"></i> Inicio
                </Link>
              </li>
              <li>
                <Link to="/reservaciones">
                  <i className="fa-regular fa-calendar-days"></i> Reservaciones
                </Link>
              </li>
              <li>
                <Link to="/estado">
                  <i className="fa-solid fa-chart-line"></i> Estado
                </Link>
              </li>
              <li>
                <Link to="/servicios">
                  <i className="fa-solid fa-map-location-dot"></i> Servicios
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div className="footer__col" variants={itemVariants}>
            <h4 className="footer__col-title">Contacto</h4>
            <ul className="footer__list">
              <li><i className="fa-solid fa-location-dot"></i> Ladrón de Guevara E11-253</li>
              <li><i className="fa-solid fa-envelope"></i> accesible@epn.edu.ec</li>
              <li><i className="fa-solid fa-phone"></i> +593 2 2976 300</li>
            </ul>
          </motion.div>

          <motion.div className="footer__col" variants={itemVariants}>
            <h4 className="footer__col-title">Equipo</h4>
            <ul className="footer__list footer__list--plain">
              <li>Gregory Araujo</li>
              <li>Jhonatan Guacapiña</li>
              <li>Cristhian Veliz</li>
              <li>Jordy Cajas</li>
            </ul>
          </motion.div>
        </motion.div>

        <hr className="footer__divider" />

        <div className="footer__bottom">
          <p className="footer__copy">
            2026 EPN Accesible - Proyecto de Diseño de Interfaces - Escuela Politécnica Nacional
          </p>
          <div className="footer__socials">
            <a href="https://www.facebook.com/EPNQuito/" target="_blank" rel="noreferrer" aria-label="Facebook de la EPN"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/epn_ecuador/" target="_blank" rel="noreferrer" aria-label="Instagram de la EPN"><i className="fa-brands fa-instagram"></i></a>
            <a href="https://x.com/EPNEcuador" target="_blank" rel="noreferrer" aria-label="X de la EPN">
              <i className="fa-brands fa-square-x-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;
