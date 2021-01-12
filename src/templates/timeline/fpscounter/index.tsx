import React from "react";
import "./fpscounter.scss";

export function FpsCounter() {
    return (
        <div className="fpscounter-container">
            <input type="text" className="fps-input" />
            <span className="fps-text">fps</span>
        </div>
    )
}