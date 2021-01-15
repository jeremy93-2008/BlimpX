import React from "react";
import {FaEye, FaLock} from "react-icons/all";
import {ColorIcon} from "../../../../../component/colorIcon";

import "./frames.scss";

export function HeaderFrames() {
    return (
        <div className="header-frames-container">
            <FaEye />
            <FaLock />
            <ColorIcon color={"white"} />
        </div>
    )
}