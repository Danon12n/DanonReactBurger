import ModalOverlayStyles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = function ({ children, onClose }) {
    return (
        <div onClick={onClose} className={ModalOverlayStyles.overlay}>
            {children}
        </div>
    );
};
export { ModalOverlay };

ModalOverlay.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    onClose: PropTypes.func.isRequired,
};
