import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import ModalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("root");

const Modal = ({ children, title, onClose }) => {
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") {
                onClose(event);
            }
        };
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    });

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClose={onClose}>
                <div
                    className={ModalStyles.modal}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div className={ModalStyles.title}>
                        <p className='text text_type_main-large'>{title}</p>
                        <button onClick={onClose}>
                            <CloseIcon type='primary' />
                        </button>
                    </div>
                    <div className={ModalStyles.content}>{children}</div>
                </div>
            </ModalOverlay>
        </>,
        modalRoot
    );
};
export { Modal };

Modal.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
};
