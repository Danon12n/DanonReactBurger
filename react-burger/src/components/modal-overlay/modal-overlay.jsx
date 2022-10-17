import ModalOverlayStyles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = function ({ onClose }) {
    return <div onClick={onClose} className={ModalOverlayStyles.overlay}></div>;
};
export { ModalOverlay };

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
};
