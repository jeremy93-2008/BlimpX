import React from "react";
import {useCallback} from "react";
import {IBlimpFrame, IBlimpObjectRender, IBlimpParams, IBlimpState} from "../blimpx.typing";
import {Circle, Image, Path, Rect, Text} from "react-konva";
import {CircleConfig} from "konva/types/shapes/Circle";
import {PathConfig} from "konva/types/shapes/Path";
import {ImageConfig} from "konva/types/shapes/Image";

const getAttrs = (params: IBlimpParams | null) => {
    if(!params) return {};
    return {...params};
}

const getOnionComponents = (Component: any, frame: IBlimpFrame) => {
    return <Component key={frame._id} {...getAttrs(frame.params)} />
}

export function useGetComponentByObject(store: IBlimpState) {
    return useCallback((obj: IBlimpObjectRender) => {
        const [CurrentComponent, NextComponent] = getComponentByType(obj)
        return {
            CurrentComponent,
            NextComponent
        }
    }, [])
}

function getComponentByType(obj: IBlimpObjectRender) {
    const {currentFrame, nextFrames} = obj.frames
    const currentParams = currentFrame.params
    switch(obj.type) {
        case "Rectangle":
            return [<Rect key={obj._id} {...getAttrs(currentParams)}/>,
                nextFrames!.map(f => getOnionComponents(Rect, f))];
        case "Circle":
            return [<Circle key={obj._id}  {...getAttrs(currentParams) as CircleConfig} />,
                nextFrames!.map(f => getOnionComponents(Circle, f))];
        case "Image":
            return [<Image key={obj._id} {...getAttrs(currentParams) as ImageConfig} />,
                nextFrames!.map(f => getOnionComponents(Image, f))];
        case "Text":
            return [<Text key={obj._id} {...getAttrs(currentParams)} />,
                nextFrames!.map(f => getOnionComponents(Text, f))];
        default:
            return [<Path key={obj._id} {...getAttrs(currentParams) as PathConfig} />,
                    nextFrames!.map(f => getOnionComponents(Path, f))]
    }
}