import React, {useCallback} from "react";
import {Circle, Image, KonvaNodeComponent, Path, Rect, Text} from "react-konva";
import {IBlimpFrame, IBlimpObjectRender, IBlimpParams} from "../../../../../blimpx.typing";
import {IBlimpContext} from "../../../../../blimpx";
import Konva from "konva";
import KonvaEventObject = Konva.KonvaEventObject;

const getAttrs = (params: IBlimpParams | null) => {
    if (!params) return {};
    return {...params};
}

const getOpacityNumber = (defaultValue: number, frame: IBlimpFrame, currentFrame: number) => {
    const currentFrameBasedOne = currentFrame + 1;
    const frameBasedOne = frame.frame + 1;
    const firstFrameNumber = Math.min(currentFrameBasedOne, frameBasedOne)
    const secondFrameNumber = Math.max(currentFrameBasedOne, frameBasedOne)
    return (firstFrameNumber / secondFrameNumber) * 0.5
}

const getOnionComponents = (Component: KonvaNodeComponent<any, any>, currentFrame: number, frame: IBlimpFrame) => {
    const opacityNumber = getOpacityNumber(0.2, frame, currentFrame)
    const isPrevFrame = frame.frame < currentFrame;
    return <Component key={frame._id} {...getAttrs(frame.params)}
                      opacity={opacityNumber} stroke={isPrevFrame ? "green" : "red"}/>
}

export function useGetComponentByObject(context: IBlimpContext) {
    return useCallback((obj: IBlimpObjectRender) => {
        const [CurrentComponent, NextComponents] = getComponentByType(context, obj)
        return {
            CurrentComponent,
            NextComponents
        }
    }, [context])
}

function getComponentByType(context: IBlimpContext, obj: IBlimpObjectRender) {
    const [store, setStore] = context
    const {currentFrame, nextFrames} = obj.frames
    const currentParams = (currentFrame ? currentFrame.params : {}) as IBlimpParams;

    const isDefaultMode = store.mode === "Default";

    const onDragEnd = (obj: IBlimpObjectRender, e: KonvaEventObject<DragEvent>) => {
        if (store.mode !== "Default") return;
        const newLayers = store.layers.map(layer => {
            return {
                ...layer,
                objects: layer.objects.map(_obj => {
                    if (_obj._id == obj._id) {
                        const frames = _obj.frames.map(frame => {
                            if (frame._id == obj.frames.currentFrame!._id) {
                                frame.params.x = e.target.x()
                                frame.params.y = e.target.y()
                            }
                            return frame;
                        })
                        return {..._obj, frames}
                    }
                    return _obj
                })
            }
        })
        setStore({
            type: "setLayer",
            state: {...store, layers: newLayers}
        })
    }

    const CanvasAttributeObject = {
        draggable: isDefaultMode,
        onDragEnd: (e: KonvaEventObject<DragEvent>) => onDragEnd(obj, e),
        key: obj._id,
        onMouseDown: (evt: KonvaEventObject<MouseEvent>) => {
            setStore({
                type: "setCurrentObject",
                state: {
                    ...store,
                    currentObject: obj._id
                }
            })
            evt.cancelBubble = true;
        },
        ...getAttrs(currentParams)
    }


    switch (obj.type) {
        case "Rectangle":
            return [currentFrame ?
                <Rect {...CanvasAttributeObject as any}/> : null,
                nextFrames!.map(f => getOnionComponents(Rect, store.currentFrame, f))];
        case "Circle":
            return [currentFrame ?
                <Circle {...CanvasAttributeObject as any} /> : null,
                nextFrames!.map(f => getOnionComponents(Circle, store.currentFrame, f))];
        case "Image":
            return [currentFrame ?
                <Image {...CanvasAttributeObject as any} /> : null,
                nextFrames!.map(f => getOnionComponents(Image, store.currentFrame, f))];
        case "Text":
            return [currentFrame ?
                <Text {...CanvasAttributeObject as any} /> : null,
                nextFrames!.map(f => getOnionComponents(Text, store.currentFrame, f))];
        default:
            return [currentFrame ?
                <Path {...CanvasAttributeObject as any} /> : null,
                nextFrames!.map(f => getOnionComponents(Path, store.currentFrame, f))]
    }
}