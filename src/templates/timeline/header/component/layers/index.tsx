import React, {useContext, useEffect, useRef, useState} from "react";

import "./layers.scss";
import {BlimpContext} from "../../../../../blimpx";
import {getLayersByWidth, useWidthLayer} from "../../../../../util/layers";
import {Cursor} from "../cursor";

export function HeaderLayers() {
    const [ store ] = useContext(BlimpContext);
    const layersRef = useRef<HTMLDivElement>(null);
    const [layersWidth, setLayersWidth] = useState(0);

    useWidthLayer(layersRef, setLayersWidth, store)

    return (
        <div ref={layersRef} className="layers-header-container">
            <Cursor />
            {getLayersByWidth("header", store, layersWidth)}
        </div>
    )
}