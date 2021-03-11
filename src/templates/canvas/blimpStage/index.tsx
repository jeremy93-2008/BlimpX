import React, {useCallback, useContext, useState} from "react";
import {Circle, Layer, Path, Rect, Text, Image, Stage} from "react-konva";

import "./stage.scss";
import {BlimpContext} from "../../../blimpx";
import {useGetObjectByFrame} from "../../../hook/useGetObjectByFrame";
import {useGetComponentByObject} from "../../../hook/useGetComponentByObject";
import Konva from "konva";
import KonvaEventObject = Konva.KonvaEventObject;

interface IBlimpStageProps {
    width: number;
    height: number;
}

export function BlimpStage(props: IBlimpStageProps) {
    const {width, height} = props;
    const context = useContext(BlimpContext)
    const [store, setStore] = context
    const [drawComponent, setDrawComponent] = useState<JSX.Element | null>(null)

    const getObjectByFrame = useGetObjectByFrame(store)
    const getComponentByObject = useGetComponentByObject(context)

    const addNewDrawObject = useCallback((konvaEvt: KonvaEventObject<MouseEvent>) => {
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
        switch(store.mode) {
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
    }, [store])

    /*const onNewObject = useCallback((konvaEvt: KonvaEventObject<MouseEvent>) => {
        if (store.mode === "Default") return;
        console.log(konvaEvt)
        const target = (konvaEvt.evt.target as unknown as HTMLCanvasElement).getBoundingClientRect();
        const newLayer = {
            ...store.layers[store.currentLayer],
            objects: [...store.layers[store.currentLayer].objects, {
                _id: uuidv4(),
                type: store.mode,
                frames: [
                    {
                        _id: uuidv4(),
                        frame: store.currentFrame,
                        params: {
                            x: konvaEvt.evt.x - target.x,
                            y: konvaEvt.evt.y - target.y,
                            stroke: "orange",
                            strokeWidth: 2,
                            width: 20,
                            height: 20,
                            radius: 20
                        }
                    }
                ]
            }]
        } as IBlimpLayer

        setStore({
            type: "setLayer",
            state: {
                ...store,
                layers: store.layers.map(l => l._id == store.layers[store.currentLayer]._id ? newLayer : l)
            }
        })

    }, [store])*/

    return (
        <Stage width={width} height={height} onMouseDown={addNewDrawObject}
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