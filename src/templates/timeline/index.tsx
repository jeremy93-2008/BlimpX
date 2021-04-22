import React from "react";
import {ActionBar} from "./actionbar";

import "./timeline.scss";
import {Header} from "./header";
import {Frames} from "./frames";
import {ScrollBar} from "./scrollbar";
import {ObjectLayers} from "./frames/component/object";

export function Timeline() {
    return (
        <div className="timeline-container">
            <ActionBar/>
            <Header/>
            <Frames renderObjectTemplate={
                (layersWidth, layerIdx, objIdx) =>
                    <ObjectLayers key={"timeline" + objIdx} layersWidth={layersWidth} layerIdx={layerIdx}
                                  objIdx={objIdx}/>}/>
            <ScrollBar/>
        </div>
    )
}