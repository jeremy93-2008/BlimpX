import React from "react";
import {ActionBar} from "./actionbar";

import "./timeline.scss";
import {Header} from "./header";
import {Frames} from "./frames";
import {ScrollBar} from "./scrollbar";

export function Timeline() {
    return (
        <div className="timeline-container">
            <ActionBar/>
            <Header />
            <Frames />
            <ScrollBar />
        </div>
    )
}