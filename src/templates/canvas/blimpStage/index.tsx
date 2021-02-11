import React, {useContext} from "react";
import {Layer, Stage, Text} from "react-konva";

import "./stage.scss";
import {BlimpContext} from "../../../blimpx";
import {useGetObjectByFrame} from "../../../hook/useGetObjectByFrame";

interface IBlimpStageProps {
    width: number;
    height: number;
}

export function BlimpStage(props: IBlimpStageProps) {
    const {width, height} = props;
    const [store] = useContext(BlimpContext)

    const getObjectByFrame = useGetObjectByFrame(store)
    const getComponentByObject = () => {}

    return (
        <Stage width={width} height={height} className="konva-stage-container">
            <Layer>
                {getObjectByFrame(store.currentFrame).map(object => {
                    if (!object) return;
                    return <Text key={object._id} text={object.type}/>
                })}
            </Layer>
        </Stage>
    )
}