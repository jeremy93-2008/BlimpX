import React from "react";
import {HeaderFrames} from "./component/frames";
import {HeaderLayers} from "./component/layers";

import "./header.scss";

export function Header() {
    return (
        <div className="timeline-header-container">
            <HeaderFrames />
            <HeaderLayers />
        </div>
    )
}