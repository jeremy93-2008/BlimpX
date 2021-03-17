import Konva from "konva";
import React, {useCallback, useMemo, useState} from "react";
import {Circle, Image as KonvaImage, Path, Rect, Text} from "react-konva";
import {v4 as uuidv4} from "uuid";
import {IBlimpLayer, IBlimpParams} from "../../../../blimpx.typing";
import {IBlimpContext} from "../../../../blimpx";
import initialImageSrc from "../../../../images/default.jpg"
import KonvaEventObject = Konva.KonvaEventObject;

export function useDrawComponent(context: IBlimpContext) {
    const [store, setStore] = context;
    const [drawComponent, setDrawComponent] = useState<JSX.Element | null>(null)

    const initialImage = useMemo(() => {
        const image = new Image()
        image.src = initialImageSrc
        return image
    }, [])

    const getCommonParam = useCallback((x: number, y: number): IBlimpParams => ({
        x,
        y,
        stroke: "orange",
        strokeWidth: 2,
        width: 20,
        height: 20,
        radius: 20,
        text: "Default"
    }), []);

    const setDrawComponentByMode = useCallback((commonParam: IBlimpParams) => {
        switch (store.mode) {
            case "Circle":
                return setDrawComponent(<Circle {...commonParam} />)
            case "Image":
                return setDrawComponent(<KonvaImage {...commonParam as IBlimpParams & { image: any }} />)
            case "Path":
                return setDrawComponent(<Path data="" {...commonParam} />)
            case "Rectangle":
                return setDrawComponent(<Rect  {...commonParam}/>)
            case "Text":
                return setDrawComponent(<Text {...commonParam} />)
        }
    }, [store, drawComponent])

    const onMouseDownNewDrawObject = useCallback((konvaEvt: KonvaEventObject<MouseEvent>) => {
        if (store.mode == "Default" || store.mode == "Path") return;
        const target = (konvaEvt.evt.target as unknown as HTMLCanvasElement).getBoundingClientRect();
        const targetX = konvaEvt.evt.x - target.x;
        const targetY = konvaEvt.evt.y - target.y
        const x = targetX > 20 ? targetX : 20
        const y = targetY > 20 ? targetY : 20
        return setDrawComponentByMode({
            ...getCommonParam(x, y),
            image: initialImage
        });
    }, [store])

    const onMouseMoveNewDrawObject = useCallback((konvaEvt: KonvaEventObject<MouseEvent>) => {
        if (!drawComponent) return;
        const {x, y} = drawComponent?.props;
        const target = (konvaEvt.evt.target as unknown as HTMLCanvasElement).getBoundingClientRect();
        const moveX = (konvaEvt.evt.x - target.x) - x
        const moveY = (konvaEvt.evt.y - target.y) - y
        const hypotenuse = Math.sqrt(Math.pow(moveX, 2) + Math.pow(moveY, 2))

        return setDrawComponentByMode({
            ...getCommonParam(x, y),
            radius: hypotenuse,
            width: moveX,
            height: moveY,
            fontSize: hypotenuse / 4,
            image: initialImage
        });

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


    return {
        drawComponent,
        onMouseDownNewDrawObject,
        onMouseMoveNewDrawObject,
        onMouseUpNewDrawObject
    }
}