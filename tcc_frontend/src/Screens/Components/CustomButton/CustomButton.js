import React from 'react';
import { Link } from "react-router-dom";
import "./CustomButton.css";

function CustomButton({ path, title, onClick }) {
    return (
        <>
            {path ? (
                <Link to={path}>
                    <button onClick={onClick} className="btn">{title}</button>
                </Link>
            ) : (
                <button className="btn-action" onClick={onClick}>{title}</button>
            )}
        </>
    );
}

export default CustomButton;