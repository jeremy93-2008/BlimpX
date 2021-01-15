import React from "react";
import {ActionBar} from "./actionbar";

import "./timeline.scss";
import {TimelineHeader} from "./header";

export function Timeline() {
    return (
        <div className="timeline-container">
            <ActionBar/>
            <TimelineHeader />
        </div>
    )
}