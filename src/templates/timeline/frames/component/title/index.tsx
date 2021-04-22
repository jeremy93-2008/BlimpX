import React from "react";
import {IBlimpLayer} from "../../../../../blimpx.typing";

import "./title.scss";
import {FrameOptions} from "../../../../../component/frameOptions";

interface ITitleProps {
    layer: IBlimpLayer;
    onClick: () => void;
}

export function TitleFrame(props: ITitleProps) {
    const {layer, onClick} = props;
    return (
        <div className="title-layer-container">
            <span onClick={onClick} className="title-layer">{layer.name}</span>
            <div className="frame-options-container">
                <FrameOptions onVisibility={() => true} onLock={() => false}/>
            </div>
        </div>
    )
}