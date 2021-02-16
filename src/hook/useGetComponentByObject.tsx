import React from "react";
import {useCallback} from "react";
import {IBlimpFrame, IBlimpObjectRender, IBlimpParams, IBlimpState} from "../blimpx.typing";
import {Circle, Image, KonvaNodeComponent, Path, Rect, Text} from "react-konva";
import {CircleConfig} from "konva/types/shapes/Circle";
import {PathConfig} from "konva/types/shapes/Path";
import {ImageConfig} from "konva/types/shapes/Image";

const getAttrs = (params: IBlimpParams | null) => {
    if(!params) return {};
    return {...params};
}

const getOnionComponents = (Component: KonvaNodeComponent<any, any>, currentFrame: number, frame: IBlimpFrame) => {
    const opacityNumber = Math.abs((frame.frame / (currentFrame || 1)) - 0.3);
    const isPrevFrame = frame.frame < currentFrame;
    return <Component key={frame._id} {...getAttrs(frame.params)}
                      opacity={opacityNumber} />
}

export function useGetComponentByObject(store: IBlimpState) {
    return useCallback((obj: IBlimpObjectRender) => {
        const [CurrentComponent, NextComponents] = getComponentByType(store, obj)
        return {
            CurrentComponent,
            NextComponents
        }
    }, [store])
}

function getComponentByType(store: IBlimpState ,obj: IBlimpObjectRender) {
    const {currentFrame, nextFrames} = obj.frames
    const currentParams = currentFrame ? currentFrame.params : {};
    switch(obj.type) {
        case "Rectangle":
            return [currentFrame ? <Rect key={obj._id} {...getAttrs(currentParams)}/> : null,
                nextFrames!.map(f => getOnionComponents(Rect, store.currentFrame, f))];
        case "Circle":
            return [currentFrame ? <Circle key={obj._id}  {...getAttrs(currentParams) as CircleConfig} /> : null,
                nextFrames!.map(f => getOnionComponents(Circle, store.currentFrame, f))];
        case "Image":
            return [currentFrame ? <Image key={obj._id} {...getAttrs(currentParams) as ImageConfig} /> : null,
                nextFrames!.map(f => getOnionComponents(Image, store.currentFrame, f))];
        case "Text":
            return [currentFrame ? <Text key={obj._id} {...getAttrs(currentParams)} /> : null,
                nextFrames!.map(f => getOnionComponents(Text, store.currentFrame, f))];
        default:
            return [currentFrame ? <Path key={obj._id} {...getAttrs(currentParams) as PathConfig} /> : null,
                    nextFrames!.map(f => getOnionComponents(Path, store.currentFrame, f))]
    }
}