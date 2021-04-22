import React, {useContext} from "react";
import {BlimpContext} from "../../../blimpx";
import {SingleFrame} from "./component/singleFrame";

import "./frames.scss";

interface ILayerFramesProps {
    renderObjectTemplate: (layersWidth: number, layerIdx: number, objIdx: number) => JSX.Element
}

export function Frames(props: ILayerFramesProps) {
    const {renderObjectTemplate} = props;
    const [store] = useContext(BlimpContext);

    return (
        <div className="frames-container">
            {store.layers.map((layer, layerIdx) =>
                <SingleFrame key={layer._id} layer={layer} idx={layerIdx} objectTemplate={renderObjectTemplate}/>
            )}
        </div>
    )
}