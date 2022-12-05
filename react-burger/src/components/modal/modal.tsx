import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { useEffect } from "react";
import ModalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modals") as HTMLElement;

interface IModalProps {
    title: string;
    onClose: () => void;
    children?: JSX.Element;
}

const Modal: FC<IModalProps> = ({ children, title, onClose }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("keydown", handleEsc);
        };
    }, [onClose]);

    return createPortal(
        <div className={ModalStyles.wrapper}>
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
            <ModalOverlay onClose={onClose} />
        </div>,
        modalRoot
    );
};

export { Modal };
