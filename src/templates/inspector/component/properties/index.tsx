import React, {useCallback, useContext, useMemo} from "react";
import {BlimpContext} from "../../../../blimpx";
import {IBlimpFrameWithCurrentFrame, IBlimpPropsInspector} from "@source/blimpx.typing";
import {FaRulerCombined} from "react-icons/fa";

import "./properties.scss";
import {useGetSpecialProps} from "./hook/useGetSpecialProps";
import {useGetNormalProps} from "./hook/useGetNormalProps";

export type IPropObject = {
    name: string,
    special?: boolean;
    content: IBlimpPropsInspector[]
}

export function Properties() {
    const [store] = useContext(BlimpContext)

    const currentObjectProperties = useMemo(() => {
        const currentObject = store.layers.find((layer) =>
            layer.objects.find(obj => obj._id == store.currentObject))
        const objectPropsWithFrames = currentObject ? currentObject.objects[0] : null;

        return objectPropsWithFrames ? {
            ...objectPropsWithFrames,
            ...objectPropsWithFrames?.frames.find(f => f.frame == store.currentFrame)
        } as IBlimpFrameWithCurrentFrame : null;
    }, [store])

    const specialProps = useGetSpecialProps(currentObjectProperties);
    const normalProps = useGetNormalProps()

    const propObject: IPropObject[] = useMemo(() => {
        if (!specialProps) return [];
        return [
            specialProps,
            {
                name: "Position",
                content: [
                    {
                        propName: "x",
                        header: "X",
                        type: "text"
                    },
                    {
                        propName: "y",
                        header: "Y",
                        type: "text"
                    },
                    {
                        propName: "width",
                        header: "Width",
                        type: "text"
                    },
                    {
                        propName: "height",
                        header: "Height",
                        type: "text"
                    },
                    {
                        propName: "rotation",
                        header: <FaRulerCombined/>,
                        type: "text"
                    }
                ]
            },
            {
                name: "Background",
                content: [
                    {
                        propName: "fill",
                        header: "Color",
                        type: "custom",
                        custom: () => <input type="color"/>
                    },
                    {
                        propName: "fillPatternImage",
                        header: "Image",
                        type: "custom",
                        custom: () => <input type="file"/>
                    }
                ]
            }
        ]
    }, [store])

    const getContentFieldByType = useCallback((content: IBlimpPropsInspector) => {
        if (content.type == "text") return <input className="section-value-input" type="text" value="1515"/>
        if (!content.custom) throw TypeError("You need to specify a custom prop if custom are used in the type prop")
        return content.custom("", () => {
        });
    }, [store])

    return (
        <div className="properties-container">
            {propObject.map(obj =>
                (obj.content.length > 0 && <div className={`section-container ${obj.special ? "special" : ""}`}>
                    <span className="section-name">{obj.name}</span>
                    <div className={`section-content ${obj.content.length === 1 ? `one-row` : ""}`}>
                        {obj.content.map(content =>
                            <div className="section-inner">
                                <span className="section-inner-name">{content.header}</span>
                                <span className="section-inner-value">{getContentFieldByType(content)}</span>
                            </div>
                        )}
                    </div>
                </div>)
            )}
        </div>
    )
}