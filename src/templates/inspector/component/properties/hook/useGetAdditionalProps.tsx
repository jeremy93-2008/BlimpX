import {IBlimpFrameWithCurrentFrame, IBlimpObjectType} from "@source/blimpx.typing";
import {IPropObject} from "@source/templates/inspector/component/properties";
import React, {useContext, useMemo} from "react";
import {BlimpContext} from "../../../../../blimpx";

export function useGetAdditionalProps(objectPropsWithFrames:
                                          IBlimpFrameWithCurrentFrame | null): IPropObject[] {
    const [store] = useContext(BlimpContext)
    return useMemo(() => {
            if (!objectPropsWithFrames?.params) return []
            return [
                getBorderProps(objectPropsWithFrames?.type!, {
                    width: objectPropsWithFrames?.params.strokeWidth || 0,
                    color: objectPropsWithFrames?.params.stroke || "",
                    radius: objectPropsWithFrames.params.cornerRadius || 0
                }),
                getShadowProps(objectPropsWithFrames.type!, {
                    color: objectPropsWithFrames.params.shadowColor || "",
                    blur: objectPropsWithFrames.params.shadowBlur || 0,
                    opacity: objectPropsWithFrames.params.shadowOpacity || 0,
                    position: {
                        x: objectPropsWithFrames.params.shadowOffsetX || 0,
                        y: objectPropsWithFrames.params.shadowOffsetY || 0
                    }
                })
            ]
        }, [store]
    )
}

interface IBorderPropsValue {
    color: string;
    width: number | undefined;
    radius: number | number[] | undefined;
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
            },
            {
                propName: "cornerRadius",
                header: "Radius",
                value: `${value.radius}`,
                type: "text"
            }
        ]
    }
}

interface IShadowPropsValue {
    color: string;
    position: { x: number, y: number }
    blur: number;
    opacity: number;
}

export function getShadowProps(type: IBlimpObjectType, value: IShadowPropsValue): IPropObject {
    return {
        name: "Shadow",
        content: [
            {
                propName: "shadowColor",
                header: "Color",
                value: `${value.color}`,
                type: "text"
            },
            {
                propName: "shadowOffset",
                header: "Position",
                value: `${value.position}`,
                type: "text"
            },
            {
                propName: "shadowBlur",
                header: "Blur",
                value: `${value.blur}`,
                type: "text"
            },
            {
                propName: "shadowOpacity",
                header: "Opacity",
                value: `${value.opacity}`,
                type: "text"
            }
        ]
    }
}