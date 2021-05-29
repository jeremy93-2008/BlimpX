import {useCallback} from "react";
import {IBlimpContext} from "@source/blimpx";
import {IDrawComponent, ISetDrawComponentByMode} from "../useDrawComponent";
import {KonvaEventObject} from "konva/types/Node";
import {v4 as uuidv4} from "uuid";
import {IBlimpLayer} from "@source/blimpx.typing";

export function useDrawPathHelper(context: IBlimpContext,
                                  [drawComponent, setDrawComponent]: IDrawComponent,
                                  setDrawComponentByMode: ISetDrawComponentByMode) {
    const [store, setStore] = context;

    const onClickPathNewObject = useCallback((konvaEvt: KonvaEventObject<MouseEvent>) => {
        if (store.mode != "Path" && store.mode != "Bezier") return;
        const target = (konvaEvt.evt.target as unknown as HTMLCanvasElement).getBoundingClientRect();
        const baseX = konvaEvt.evt.x - target.x
        const baseY = konvaEvt.evt.y - target.y
        const {x, y, data} = drawComponent?.props || {
            x: 0,
            y: 0,
            data: `M ${baseX} ${baseY} ${store.mode == "Bezier" ? "T" : "L"}`
        };
        const moveX = (konvaEvt.evt.x - target.x) - (x || 0)
        const moveY = (konvaEvt.evt.y - target.y) - (y || 0)
        const initialData = `${data} ${moveX} ${moveY}`
        setDrawComponentByMode({
            x,
            y,
            strokeWidth: 2,
            stroke: "rgb(255,165,0)",
            data: initialData,
            movePathData: initialData
        })
    }, [context, drawComponent]);

    const onDblClickPathNewObject = useCallback((konvaEvt: KonvaEventObject<MouseEvent>) => {
        if ((store.mode != "Path" && store.mode != "Bezier") || !drawComponent) return;
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
    }, [context, drawComponent])

    return {
        onClickPathNewObject,
        onDblClickPathNewObject
    }

}