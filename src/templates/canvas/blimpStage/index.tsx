import React, {useContext} from "react";
import {Layer, Rect, Stage, Text} from "react-konva";

import "./stage.scss";
import {BlimpContext} from "../../../blimpx";
import {useGetObjectByFrame} from "../../../hook/useGetObjectByFrame";
import {useGetComponentByObject} from "../../../hook/useGetComponentByObject";

interface IBlimpStageProps {
    width: number;
    height: number;
}

export function BlimpStage(props: IBlimpStageProps) {
    const {width, height} = props;
    const [store] = useContext(BlimpContext)

    const getObjectByFrame = useGetObjectByFrame(store)
    const getComponentByObject = useGetComponentByObject(store)

    return (
        <Stage width={width} height={height} className="konva-stage-container">
            <Layer>
                {getObjectByFrame(store.currentFrame).map(object => {
                    if (!object) return;
                    const { CurrentComponent, NextComponent } = getComponentByObject(object)
                    return CurrentComponent
                })}
            </Layer>
        </Stage>
    )
}