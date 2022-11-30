import ModalOverlayStyles from "./modal-overlay.module.css";
import { FC } from "react";

interface IModalOverlayProps {
    onClose: () => void;
}

const ModalOverlay: FC<IModalOverlayProps> = function ({ onClose }) {
    return <div onClick={onClose} className={ModalOverlayStyles.overlay}></div>;
};
export { ModalOverlay };
