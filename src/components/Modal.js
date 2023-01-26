import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ title, content, actions, onDismiss }) => {
    return ReactDOM.createPortal(
        <div onClick={onDismiss} className="delete">
            <div onClick={(e) => e.stopPropagation( )} className="delete__modal">
                <div className="delete__modal--header">{title}</div>
                <div className="delete__modal--content">{content}</div>
                <div className="delete__modal--actions">{actions}</div>
            </div>
        </div>,
        document.getElementById("modal")
    );
};

export default Modal;