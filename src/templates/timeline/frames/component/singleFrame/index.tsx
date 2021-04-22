import React, {useCallback, useRef, useState} from "react";
import {CollapsableArrow} from "../caret";
import {TitleFrame} from "../title";
import {useWidthLayer} from "../../../../../util/layers";
import {IBlimpLayer} from "../../../../../blimpx.typing";

import "./singleFrame.scss";

interface ISingleFrameProps {
    layer: IBlimpLayer
    idx: number;
    objectTemplate: (layersWidth: number, layerIdx: number, objIdx: number) => JSX.Element;
}

export function SingleFrame(props: ISingleFrameProps) {
    const {layer, idx: layerIdx, objectTemplate} = props;
    const layersRef = useRef<HTMLDivElement>(null);
    const [layersWidth, setLayersWidth] = useState(0);
    const [isCollapsable, setCollapsable] = useState(false)

    const onClickCollapsable = useCallback(() => {
        setCollapsable(!isCollapsable)
    }, [props, isCollapsable])

    useWidthLayer(layersRef, setLayersWidth)

    return (
        <React.Fragment key={layer._id}>
            <div key={layer._id + "name"} className="layer-container">
                <CollapsableArrow isCollapsable={isCollapsable} onClick={onClickCollapsable}/>
                <TitleFrame onClick={onClickCollapsable} layer={layer}/>
                <div ref={layersRef} className="frame-layer-container">
                </div>
            </div>
            <div className={`layer-object-container ${isCollapsable ? "collapsed" : ""}`}>
                {layer.objects.map((obj, idx) =>
                    <div key={obj._id} className="layer-container">
                        <div className="title-object-container">
                            {obj.type}
                        </div>
                        <div className="frame-object-container">
                            {objectTemplate(layersWidth, layerIdx, idx)}
                        </div>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
}