import React, {useContext, useEffect, useRef, useState} from "react";
import {BlimpContext} from "../../../blimpx";

import "./frames.scss";
import {TitleFrame} from "./component/title";
import {getLayersByWidth, useWidthLayer} from "../../../util/layers";

export function Frames() {
    const [ store ] = useContext(BlimpContext);
    const layersRef = useRef<HTMLDivElement>(null);
    const [layersWidth, setLayersWidth] = useState(0);

    useWidthLayer(layersRef, setLayersWidth, store)

    return (
        <div className="frames-container">
            {store.layers.map((layer, layerIdx) =>
                <div key={layer._id} className="layer-container">
                    <TitleFrame layer={layer} />
                    <div ref={layersRef} className="frame-layer-container">
                        {getLayersByWidth("frames", store, layersWidth, layerIdx)}
                    </div>
                </div>
            )}
        </div>
    )
}