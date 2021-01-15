import React from "react";

import "./actionbar.scss";

import {FpsCounter} from "./component/fpscounter";
import {PlayControl} from "./component/playcontrol";
import {Timer} from "./component/timer";

export function ActionBar() {
    return (
        <div className="actionbar-container">
            <div className="actionbar-section">
            </div>
            <div className="actionbar-section">
                <FpsCounter />
                <PlayControl />
            </div>
            <div className="actionbar-section">
                <Timer />
            </div>
        </div>
    )
}