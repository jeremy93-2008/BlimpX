import React, {useCallback, useMemo} from "react";
import initialImageSrc from "../../../../../images/default.jpg";
import {IBlimpLayer, IBlimpParams} from "../../../../../blimpx.typing";
import {IBlimpContext} from "../../../../../blimpx";
import {KonvaEventObject} from "konva/types/Node";
import {v4 as uuidv4} from "uuid";
import {IDrawComponent, ISetDrawComponentByMode} from "../useDrawComponent";

export function useDrawGenericHelper(context: IBlimpContext,
                                     [drawComponent, setDrawComponent]: IDrawComponent,
                                     setDrawComponentByMode: ISetDrawComponentByMode) {
    const [store, setStore] = context;

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

    const onMouseDownNewGenericDrawObject = useCallback((konvaEvt: KonvaEventObject<MouseEvent>) => {
        if (store.mode == "Default" || store.mode == "Path" || store.mode == "Bezier") return;
        const target = (konvaEvt.evt.target as unknown as HTMLCanvasElement).getBoundingClientRect();
        const targetX = konvaEvt.evt.x - target.x;
        const targetY = konvaEvt.evt.y - target.y
        const x = targetX > 20 ? targetX : 20
        const y = targetY > 20 ? targetY : 20

        const dataBrush = store.mode == "Brush" ? {data: `M 0 0 L`} : {}

        return setDrawComponentByMode({
            ...getCommonParam(x, y),
            image: initialImage,
            ...dataBrush
        });
    }, [store])

    const onMouseMoveNewGenericDrawObject = useCallback((konvaEvt: KonvaEventObject<MouseEvent>) => {
        if (!drawComponent) return;
        const {x, y} = drawComponent?.props;
        const target = (konvaEvt.evt.target as unknown as HTMLCanvasElement).getBoundingClientRect();
        const moveX = (konvaEvt.evt.x - target.x) - x
        const moveY = (konvaEvt.evt.y - target.y) - y
        const hypotenuse = Math.sqrt(Math.pow(moveX, 2) + Math.pow(moveY, 2))

        const dataPath = `${drawComponent.props?.movePathData} ${moveX} ${moveY}`
        const dataBrush = `${drawComponent.props?.data} ${moveX} ${moveY}`

        return setDrawComponentByMode({
            ...drawComponent.props,
            ...getCommonParam(x, y),
            radius: hypotenuse,
            width: moveX,
            height: moveY,
            fontSize: hypotenuse / 4,
            image: initialImage,
            data: store.mode == "Brush" ? dataBrush : dataPath
        });

    }, [store, drawComponent])

    const onMouseUpNewGenericDrawObject = useCallback(() => {
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
        if (store.mode === "Path" || store.mode == "Bezier") return;
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
        onMouseDownNewGenericDrawObject,
        onMouseMoveNewGenericDrawObject,
        onMouseUpNewGenericDrawObject
    }
}