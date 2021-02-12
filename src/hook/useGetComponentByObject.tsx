import React from "react";
import {useCallback} from "react";
import {IBlimpObjectRender, IBlimpParams, IBlimpState} from "../blimpx.typing";
import {Circle, Image, Path, Rect, Text} from "react-konva";
import {CircleConfig} from "konva/types/shapes/Circle";
import {PathConfig} from "konva/types/shapes/Path";
import {ImageConfig} from "konva/types/shapes/Image";

const getAttrs = (params: IBlimpParams | null) => {
    if(!params) return {};
    return {...params};
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
    const nextParams = nextFrames ? nextFrames.params : null
    switch(obj.type) {
        case "Rectangle":
            return [<Rect key={obj._id} {...getAttrs(currentParams)}/>,
                <Rect key={obj._id}  {...getAttrs(nextParams)} />];
        case "Circle":
            return [<Circle key={obj._id}  {...getAttrs(currentParams) as CircleConfig} />,
                <Circle key={obj._id}  {...getAttrs(nextParams) as CircleConfig} />];
        case "Image":
            return [<Image key={obj._id} {...getAttrs(currentParams) as ImageConfig} />,
                <Image key={obj._id} {...getAttrs(nextParams) as ImageConfig} />];
        case "Text":
            return [<Text key={obj._id} {...getAttrs(currentParams)} />,
                <Text key={obj._id} {...getAttrs(nextParams)} />];
        default:
            return [<Path key={obj._id} {...getAttrs(currentParams) as PathConfig} />,
                <Path key={obj._id} {...getAttrs(nextParams) as PathConfig} />]
    }
}