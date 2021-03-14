import React, {useContext} from "react";
import {Layer, Stage} from "react-konva";
import {BlimpContext} from "../../../blimpx";
import {useGetObjectByFrame} from "../../../hook/useGetObjectByFrame";
import {useGetComponentByObject} from "../../../hook/useGetComponentByObject";
import "./stage.scss";
import {useDrawComponent} from "./hook/useDrawComponent";

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

    const {
        drawComponent,
        onMouseDownNewDrawObject,
        onMouseMoveNewDrawObject,
        onMouseUpNewDrawObject
    } = useDrawComponent(context)

    return (
        <Stage width={width} height={height}
               onMouseDown={onMouseDownNewDrawObject}
               onMouseMove={onMouseMoveNewDrawObject}
               onMouseUp={onMouseUpNewDrawObject}
               className={`konva-stage-container ${store.mode !== "Default" ? `create` : ""}`}>
            <Layer>
                {getObjectByFrame(store.currentFrame).map(object => {
                    if (!object) return;
                    const {CurrentComponent, NextComponents} = getComponentByObject(object)
                    return <>
                        {CurrentComponent}
                        {NextComponents}
                    </>
                })}
                {drawComponent}
            </Layer>
        </Stage>
    )
}