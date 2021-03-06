import React, {useContext} from "react";
import {Layer, Stage} from "react-konva";

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
    const context = useContext(BlimpContext)
    const [store] = context

    const getObjectByFrame = useGetObjectByFrame(store)
    const getComponentByObject = useGetComponentByObject(context)

    return (
        <Stage width={width} height={height} className="konva-stage-container">
            <Layer>
                {getObjectByFrame(store.currentFrame).map(object => {
                    if (!object) return;
                    const {CurrentComponent, NextComponents} = getComponentByObject(object)
                    return <>
                        {CurrentComponent}
                        {NextComponents}
                    </>
                })}
            </Layer>
        </Stage>
    )
}