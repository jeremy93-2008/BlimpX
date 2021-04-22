import React, {useContext} from "react";
import {BlimpContext} from "../../../../../blimpx";
import {getLayersByWidth} from "../../../../../util/layers";

interface IObjectLayersProps {
    layersWidth: number,
    layerIdx: number;
    objIdx: number;
}

export function ObjectLayers(props: IObjectLayersProps) {
    const {layersWidth, layerIdx, objIdx} = props;
    const blimpContext = useContext(BlimpContext);

    return (
        <React.Fragment key={"objectLayers" + layerIdx + objIdx}>
            {getLayersByWidth("frames", blimpContext, layersWidth, layerIdx, objIdx)}
        </React.Fragment>
    )
}