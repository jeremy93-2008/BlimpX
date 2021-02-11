import React from "react";
import {useCallback} from "react";
import {IBlimpObjectRender, IBlimpParams, IBlimpState} from "../blimpx.typing";
import {Circle, Image, Path, Rect, Text} from "react-konva";

const RectAttrs = (params: IBlimpParams) => ({
    x: params.x as number,
    y: params.y as number,
    width: params.width,
    height: params.height
});

const CircleAttrs = (params: IBlimpParams) => ({
    x: params.x,
    y: params.y,
    radius: params.width,
})

const ImageAttrs = (params: IBlimpParams) => ({
    x: params.x,
    y: params.y,
    radius: params.width,
})

const TextAttrs = (params: IBlimpParams) => ({
    x: params.x,
    y: params.y,
    text: params.label
})

const PathAttrs = (params: IBlimpParams) => ({
    x: params.x,
    y: params.y,
    radius: params.width,
})

export function useGetComponentByObject(store: IBlimpState) {
    return useCallback((obj: IBlimpObjectRender) => {
        const [CurrentComponent, NextComponent] = getComponentByType(obj)
    }, [])
}

function getComponentByType(obj: IBlimpObjectRender) {
    const {currentFrame, nextFrames} = obj.frames
    const currentParams = currentFrame.params
    const nextParams = nextFrames ? nextFrames.params : null
    switch(obj.type) {
        case "Rectangle":
            return [<Rect {...RectAttrs(currentParams)}/>, <Rect />];
        case "Circle":
            return [<Circle />, <Circle />];
        case "Image":
            return [<Image />, <Image />];
        case "Text":
            return [<Text />, <Text />];
        default:
            return [<Path />, <Path />]
    }
}