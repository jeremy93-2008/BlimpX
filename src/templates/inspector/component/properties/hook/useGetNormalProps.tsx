import {IBlimpFrameWithCurrentFrame, IBlimpObjectType} from "@source/blimpx.typing";
import {IPropObject} from "../index";
import React, {useContext, useMemo} from "react";
import {BlimpContext} from "../../../../../blimpx";
import {FaRulerCombined} from "react-icons/fa";

export function useGetNormalProps(objectPropsWithFrames:
                                      IBlimpFrameWithCurrentFrame | null): IPropObject[] {
    const [store] = useContext(BlimpContext)
    return useMemo(() => {
        return [
            getPositionProps(objectPropsWithFrames?.type!, {
                x: objectPropsWithFrames?.params.x || 0,
                y: objectPropsWithFrames?.params.y || 0,
                width: objectPropsWithFrames?.params.width || 0,
                height: objectPropsWithFrames?.params.height || 0,
                rotation: objectPropsWithFrames?.params.rotation || 0
            }),

        ]
    }, [store])
}

interface IPositionPropsValue {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    rotation?: number;
}

export function getPositionProps(type: IBlimpObjectType, value: IPositionPropsValue): IPropObject {
    return {
        name: "Position",
        content: [
            {
                propName: "x",
                header: "X",
                value: `${value.x}`,
                type: "text"
            },
            {
                propName: "y",
                header: "Y",
                value: `${value.y}`,
                type: "text"
            },
            {
                propName: "width",
                header: "Width",
                disabled: type === "Circle",
                value: `${value.width}`,
                type: "text"
            },
            {
                propName: "height",
                header: "Height",
                disabled: type === "Circle",
                value: `${value.height}`,
                type: "text"
            },
            {
                propName: "rotation",
                header: <FaRulerCombined/>,
                value: `${value.rotation}`,
                type: "text"
            }
        ]
    }
}

export function getBackgroundProps(type: IBlimpObjectType, value: IPositionPropsValue): IPropObject {
    return {
        name: "Background",
        content: []
    }
}