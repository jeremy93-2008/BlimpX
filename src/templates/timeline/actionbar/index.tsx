import React from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

import "./actionbar.scss";
import {ToolbarButton} from "../../../component/toolbarButton";
import {FpsCounter} from "../fpscounter";
import {PlayControl} from "../playcontrol";
import {Timer} from "../timer";

export function ActionBar() {
    return (
        <div className="actionbar-container">
            <div className="actionbar-section">
                <ToolbarButton label={"Add frame"} icon={FaPlus} size={16} gap={10} />
                <ToolbarButton label={"Add frame"} icon={FaTrash} size={16} gap={10} />
            </div>
            <div className="actionbar-section">
                <PlayControl />
                <FpsCounter />
            </div>
            <div className="actionbar-section">
                <Timer />
            </div>
        </div>
    )
}