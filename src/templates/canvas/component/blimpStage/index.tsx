import React, {useContext} from "react";
import {Layer, Stage} from "react-konva";
import {BlimpContext} from "../../../../blimpx";
import {useGetObjectByFrame} from "./hook/useGetObjectByFrame";
import {useGetComponentByObject} from "./hook/useGetComponentByObject";
import "./stage.scss";
import {useDrawComponent} from "./hook/useDrawComponent";

interface IBlimpStageProps {
    width: number;
    height: number;
}

export function BlimpStage(props: IBlimpStageProps) {
    const {width, height} = props;
    const context = useContext(BlimpContext)
    const [store, setStore] = context

    const getObjectByFrame = useGetObjectByFrame(store)
    const getComponentByObject = useGetComponentByObject(context)

    const {
        drawComponent,
        onMouseDownNewGenericDrawObject,
        onMouseMoveNewGenericDrawObject,
        onMouseUpNewGenericDrawObject,
        onClickPathNewObject,
        onDblClickPathNewObject
    } = useDrawComponent(context)

    return (
        <Stage width={width} height={height}
               onMouseDown={(evt) => {
                   setStore({
                       type: "setCurrentObject",
                       state: {...store, currentObject: null}
                   })
                   onMouseDownNewGenericDrawObject(evt)
               }}
               onMouseMove={onMouseMoveNewGenericDrawObject}
               onMouseUp={onMouseUpNewGenericDrawObject}
               onClick={onClickPathNewObject}
               onDblClick={onDblClickPathNewObject}
               className={`konva-stage-container ${store.mode !== "Default" ? `create` : ""}`}>
            {getObjectByFrame(store.currentFrame).map(object => {
                if (!object) return;
                const {CurrentComponent, NextComponents} = getComponentByObject(object)
                return <>
                    <Layer>
                        {CurrentComponent}
                    </Layer>
                    <Layer>
                        {NextComponents}
                    </Layer>
                </>
            })}
            <Layer>
                {drawComponent}
            </Layer>
        </Stage>
    )
}