import React from "react";

import "./actionbar.scss";

import {FpsCounter} from "./component/fpscounter";
import {PlayControl} from "./component/playcontrol";
import {Timer} from "./component/timer";
import {FrameCounter} from "./component/framecounter";
import {AddNewFrame} from "./component/addnewframe";
import {DeleteFrame} from "./component/deleteframe";

export function ActionBar() {
    return (
        <div className="actionbar-container">
            <div className="actionbar-section">
                <AddNewFrame/>
                <DeleteFrame/>
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