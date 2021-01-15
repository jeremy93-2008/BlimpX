import React from "react";
import { FaPlay, FaFastBackward, FaFastForward } from "react-icons/fa";

import "./playcontrol.scss";

export function PlayControl() {
    return (
        <div className="playcontrol-container">
            <FaFastBackward />
            <FaPlay />
            <FaFastForward />
        </div>
    )
}