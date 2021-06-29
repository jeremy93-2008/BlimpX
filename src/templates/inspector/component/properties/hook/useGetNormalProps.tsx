import {IBlimpFrameWithCurrentFrame, IBlimpObjectType, IBlimpParams} from "@source/blimpx.typing";
import {IPropObject} from "../index";
import React, {useContext, useMemo} from "react";
import {SizeInput} from "../component/size"
import {BlimpContext} from "../../../../../blimpx";
import {FaRulerCombined} from "react-icons/fa";
import {ColorInput} from "../component/color";

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
                    gradient: objectPropsWithFrames?.params || null,
                    repeat: objectPropsWithFrames.params.fillPatternRepeat || ""
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
                custom: (props, onChange) => <SizeInput disabled={props.disabled} value={props.value as string}
                                                        onChange={onChange} metrics={["px"]}/>,
                type: "custom"
            },
            {
                propName: "height",
                header: "Height",
                disabled: type === "Circle",
                value: `${value.height}`,
                custom: (props, onChange) => <SizeInput disabled={props.disabled} value={props.value as string}
                                                        onChange={onChange} metrics={["px"]}/>,
                type: "custom"
            },
            {
                propName: "rotation",
                header: <FaRulerCombined/>,
                value: `${value.rotation}`,
                custom: (props, onChange) => <SizeInput disabled={props.disabled} value={props.value as string}
                                                        onChange={onChange} metrics={["º"]}/>,
                type: "custom"
            }
        ]
    }
}

interface IBackgroundPropsValue {
    color: string;
    image: HTMLImageElement | null;
    gradient: IBlimpParams | null;
    repeat: string;
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
                custom: (props, onChange) =>
                    <ColorInput value={props.value as string} disabled={props.disabled} onChange={onChange}/>
            },
            {
                propName: "fillPatternImage",
                header: "Image",
                value: `${value.image}`,
                type: "custom",
                custom: () => <input type={"file"}/>
            },
            {
                propName: ["fillLinearGradientStartPoint", "fillLinearGradientEndPoint", "fillLinearGradientColorStops"],
                header: "Gradient",
                value: [
                    value.gradient?.fillLinearGradientStartPoint,
                    value.gradient?.fillLinearGradientEndPoint,
                    value.gradient?.fillLinearGradientColorStops
                ],
                type: "custom",
                custom: () => <div></div>
            },
            {
                propName: "fillPatternRepeat",
                header: "Repeat",
                value: `${value.repeat}`,
                type: "text"
            }
        ]
    }
}