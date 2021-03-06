import React, {useCallback} from "react";
import {Circle, Image, KonvaNodeComponent, Path, Rect, Text} from "react-konva";
import {IBlimpFrame, IBlimpObjectRender, IBlimpParams} from "../blimpx.typing";
import {CircleConfig} from "konva/types/shapes/Circle";
import {PathConfig} from "konva/types/shapes/Path";
import {ImageConfig} from "konva/types/shapes/Image";
import {IBlimpContext} from "../blimpx";
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
    const currentParams = currentFrame ? currentFrame.params : {};

    const onDragEnd = useCallback((obj: IBlimpObjectRender, e: KonvaEventObject<DragEvent>) => {
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
    }, [context])

    switch (obj.type) {
        case "Rectangle":
            return [currentFrame ?
                <Rect draggable onDragEnd={(e) => onDragEnd(obj, e)}
                      key={obj._id} {...getAttrs(currentParams)}/> : null,
                nextFrames!.map(f => getOnionComponents(Rect, store.currentFrame, f))];
        case "Circle":
            return [currentFrame ?
                <Circle draggable onDragEnd={(e) => onDragEnd(obj, e)}
                        key={obj._id}  {...getAttrs(currentParams) as CircleConfig} /> : null,
                nextFrames!.map(f => getOnionComponents(Circle, store.currentFrame, f))];
        case "Image":
            return [currentFrame ?
                <Image draggable onDragEnd={(e) => onDragEnd(obj, e)}
                       key={obj._id} {...getAttrs(currentParams) as ImageConfig} /> : null,
                nextFrames!.map(f => getOnionComponents(Image, store.currentFrame, f))];
        case "Text":
            return [currentFrame ?
                <Text draggable onDragEnd={(e) => onDragEnd(obj, e)}
                      key={obj._id} {...getAttrs(currentParams)} /> : null,
                nextFrames!.map(f => getOnionComponents(Text, store.currentFrame, f))];
        default:
            return [currentFrame ?
                <Path draggable onDragEnd={(e) => onDragEnd(obj, e)}
                      key={obj._id} {...getAttrs(currentParams) as PathConfig} /> : null,
                nextFrames!.map(f => getOnionComponents(Path, store.currentFrame, f))]
    }
}