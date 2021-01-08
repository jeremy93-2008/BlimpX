import React from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

import "./actionbar.scss";
import {ToolbarButton} from "../../../component/toolbarButton";

export function ActionBar() {
    return (
        <div className="actionbar-container">
            <ToolbarButton label={"Add frame"} icon={FaPlus} size={16} gap={10} />
            <ToolbarButton label={"Add frame"} icon={FaTrash} size={16} gap={10} />
        </div>
    )
}