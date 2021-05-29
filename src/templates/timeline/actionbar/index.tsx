import React from "react";

import "./actionbar.scss";

import {FpsCounter} from "./component/fpscounter";
import {PlayControl} from "./component/playcontrol";
import {Timer} from "./component/timer";
import {FrameCounter} from "./component/framecounter";
import {AddNewFrame} from "./component/addnewframe";

export function ActionBar() {
    return (
        <div className="actionbar-container">
            <div className="actionbar-section">
                <AddNewFrame/>
            </div>
            <div className="actionbar-section">
                <FpsCounter/>
                <PlayControl/>
                <FrameCounter/>
            </div>
            <div className="actionbar-section absolute">
                <Timer/>
            </div>
        </div>
    )
}