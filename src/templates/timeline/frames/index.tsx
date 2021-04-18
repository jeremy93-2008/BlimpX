import React, {useContext, useRef, useState} from "react";
import {BlimpContext} from "../../../blimpx";
import {useWidthLayer} from "../../../util/layers";
import {TitleFrame} from "../frames/component/title";

import "./frames.scss";

interface ILayerFramesProps {
    renderObjectTemplate: (layersWidth: number, layerIdx: number, objIdx: number) => JSX.Element
}

export function Frames(props: ILayerFramesProps) {
    const {renderObjectTemplate} = props;
    const blimpContext = useContext(BlimpContext);
    const [store] = blimpContext
    const layersRef = useRef<HTMLDivElement>(null);
    const [layersWidth, setLayersWidth] = useState(0);

    useWidthLayer(layersRef, setLayersWidth)

    return (
        <div className="frames-container">
            {store.layers.map((layer, layerIdx) =>
                <>
                    <div key={layer._id} className="layer-container">
                        <TitleFrame layer={layer}/>
                        <div ref={layersRef} className="frame-layer-container">
                        </div>
                    </div>
                    <>
                        {layer.objects.map((obj, idx) =>
                            <div key={layer._id} className="layer-container">
                                <div className="title-object-container">
                                    {obj.type}
                                </div>
                                <div className="frame-object-container">
                                    {renderObjectTemplate(layersWidth, layerIdx, idx)}
                                </div>
                            </div>
                        )}
                    </>
                </>
            )}
        </div>
    )
}