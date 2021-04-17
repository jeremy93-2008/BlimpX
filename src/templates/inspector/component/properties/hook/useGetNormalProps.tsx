import {IBlimpFrameWithCurrentFrame, IBlimpObjectType, IBlimpParams} from "@source/blimpx.typing";
import {IPropObject} from "../index";
import React, {useContext, useMemo} from "react";
import {BlimpContext} from "../../../../../blimpx";
import {FaRulerCombined} from "react-icons/fa";

export function useGetNormalProps(objectPropsWithFrames:
                                      IBlimpFrameWithCurrentFrame | null): IPropObject[] {
    const [store] = useContext(BlimpContext)
    return useMemo(() => {
            if (!objectPropsWithFrames?.params) return []
            return [
                getPositionProps(objectPropsWithFrames?.type!, {
                    x: objectPropsWithFrames?.params.x || 0,
                    y: objectPropsWithFrames?.params.y || 0,
                    width: objectPropsWithFrames?.params.width || 0,
                    height: objectPropsWithFrames?.params.height || 0,
                    rotation: objectPropsWithFrames?.params.rotation || 0
                }),
                getBackgroundProps(objectPropsWithFrames?.type!, {
                    image: objectPropsWithFrames?.params.fillPatternImage || null,
                    color: objectPropsWithFrames?.params.fill || "",
                    gradient: objectPropsWithFrames?.params || null
                }),
                getBorderProps(objectPropsWithFrames?.type!, {
                    width: objectPropsWithFrames?.params.strokeWidth || 0,
                    color: objectPropsWithFrames?.params.stroke || ""
                })
            ]
        }, [store]
    )
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
                type: "number"
            },
            {
                propName: "y",
                header: "Y",
                value: `${value.y}`,
                type: "number"
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

interface IBackgroundPropsValue {
    color: string;
    image: HTMLImageElement | null;
    gradient: IBlimpParams | null;
}

export function getBackgroundProps(type: IBlimpObjectType, value: IBackgroundPropsValue): IPropObject {
    return {
        name: "Background",
        content: [
            {
                propName: "fill",
                header: "Color",
                value: `${value.color}`,
                type: "custom",
                custom: () => <input type={"color"}/>
            },
            {
                propName: "fillPatternImage",
                header: "Image",
                value: `${value.image}`,
                type: "custom",
                custom: () => <input type={"file"}/>
            },
            {
                propName: "",
                header: "Gradient",
                value: `${value.gradient}`,
                type: "custom",
                custom: () => <input type={"number"}/>
            }
        ]
    }
}

interface IBorderPropsValue {
    color: string;
    width: number | undefined;
}

export function getBorderProps(type: IBlimpObjectType, value: IBorderPropsValue): IPropObject {
    return {
        name: "Border",
        content: [
            {
                propName: "stroke",
                header: "Color",
                value: `${value.color}`,
                type: "custom",
                custom: () => <input type="color"/>
            },
            {
                propName: "strokeWidth",
                header: "Width",
                value: `${value.width}`,
                type: "number"
            }
        ]
    }
}