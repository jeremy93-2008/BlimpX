import React from "react";

import "./frames.scss";
import {FrameOptions} from "../../../../../component/frameOptions";

export function HeaderFrames() {
    return (
        <div className="header-frames-container">
            <FrameOptions onVisibility={() => true} onLock={() => false} />
        </div>
    )
}