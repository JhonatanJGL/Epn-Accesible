import { AnimatePresence, motion } from "framer-motion";

import AuthForm from "./AuthForm";
import "./AuthModal.css";

const AuthModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="auth-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="auth-modal"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="auth-close-btn" onClick={onClose} aria-label="Cerrar">
            <i className="fa-solid fa-xmark"></i>
          </button>

          <AuthForm onSuccess={onClose} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;
