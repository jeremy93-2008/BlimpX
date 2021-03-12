import React, {useCallback, useContext, useState} from "react";
import Konva from "konva";
import {Circle, Layer, Path, Rect, Text, Image, Stage} from "react-konva";
import KonvaEventObject = Konva.KonvaEventObject;
import { v4 as uuidv4 } from 'uuid';

import {BlimpContext} from "../../../blimpx";
import {useGetObjectByFrame} from "../../../hook/useGetObjectByFrame";
import {useGetComponentByObject} from "../../../hook/useGetComponentByObject";
import "./stage.scss";
import {IBlimpLayer} from "../../../blimpx.typing";

interface IBlimpStageProps {
    width: number;
    height: number;
}

interface ICommonParams {
    strokeWidth: number;
    x: number;
    width: number;
    y: number;
    radius: number;
    stroke: string;
    height: number
}

export function BlimpStage(props: IBlimpStageProps) {
    const {width, height} = props;
    const context = useContext(BlimpContext)
    const [store, setStore] = context
    const [drawComponent, setDrawComponent] = useState<JSX.Element | null>(null)

    const getObjectByFrame = useGetObjectByFrame(store)
    const getComponentByObject = useGetComponentByObject(context)

    const setDrawComponentByMode = useCallback((commonParam: ICommonParams) => {
        switch (store.mode) {
            case "Circle":
                return setDrawComponent(<Circle {...commonParam} />)
            case "Image":
                return setDrawComponent(<Image image={new HTMLImageElement()} {...commonParam} />)
            case "Path":
                return setDrawComponent(<Path data="" {...commonParam} />)
            case "Rectangle":
                return setDrawComponent(<Rect  {...commonParam}/>)
            case "Text":
                return setDrawComponent(<Text {...commonParam} />)
        }
    }, [store, drawComponent])

    const onMouseDownNewDrawObject = useCallback((konvaEvt: KonvaEventObject<MouseEvent>) => {
        const target = (konvaEvt.evt.target as unknown as HTMLCanvasElement).getBoundingClientRect();
        const commonParam = {
            x: konvaEvt.evt.x - target.x,
            y: konvaEvt.evt.y - target.y,
            stroke: "orange",
            strokeWidth: 2,
            width: 20,
            height: 20,
            radius: 20
        }
        return setDrawComponentByMode(commonParam);
    }, [store])

    const onMouseMoveNewDrawObject = useCallback((konvaEvt: KonvaEventObject<MouseEvent>) => {
        if(!drawComponent) return;
        const { x, y } = drawComponent?.props;
        const target = (konvaEvt.evt.target as unknown as HTMLCanvasElement).getBoundingClientRect();
        const moveX = (konvaEvt.evt.x - target.x) - x
        const moveY = (konvaEvt.evt.y - target.y) - y
        const commonParam = {
            x,
            y,
            stroke: "orange",
            strokeWidth: 2,
            width: moveX,
            height: moveY,
            radius: Math.sqrt(Math.pow(moveX, 2) + Math.pow(moveY, 2))
        }
        return setDrawComponentByMode(commonParam);
    }, [store, drawComponent])

    const onMouseUpNewDrawObject = useCallback(() => {
        if (store.mode === "Default" || !drawComponent) return;
        const newLayer = {
            ...store.layers[store.currentLayer],
            objects: [...store.layers[store.currentLayer].objects, {
                _id: uuidv4(),
                type: store.mode,
                frames: [
                    {
                        _id: uuidv4(),
                        frame: store.currentFrame,
                        params: {...drawComponent.props}
                    }
                ]
            }]
        } as IBlimpLayer
        setDrawComponent(null)
        setStore({
            type: "setLayer",
            state: {
                ...store,
                layers: store.layers.map(l => l._id == store.layers[store.currentLayer]._id ? newLayer : l)
            }
        })
        setStore({
            type: "setMode",
            state: {
                ...store,
                mode: "Default"
            }
        })
    }, [store, drawComponent])

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