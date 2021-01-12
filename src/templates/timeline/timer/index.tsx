import React from "react";

import "./timer.scss";

export function Timer() {
    return (
        <div className="timer-container">
            <span className="current-timer">15:43.154</span>
            /
            <span className="max-timer">27:10.000</span>
        </div>
    )
}