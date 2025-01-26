import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const View = ({ children,onClose }) => {
    const portalRoot = document.createElement("div");

    useEffect(() => {
        document.body.appendChild(portalRoot);
        return () => {
            document.body.removeChild(portalRoot);
        };
    }, [portalRoot]);
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    return ReactDOM.createPortal(
        <div style={{zIndex:9999 }} className="portal-content flex justify-center items-center fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/50">
            {children}
            <button onClick={onClose} className="absolute top-5 right-10 font-extrabold tracking-wider text-white">Close</button>
        </div>,
        portalRoot
    );
};

export default View;
