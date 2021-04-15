import React, {useCallback, useContext, useMemo} from "react";
import {BlimpContext} from "../../../../blimpx";
import {IBlimpFrameWithCurrentFrame, IBlimpPropsInspector} from "@source/blimpx.typing";

import "./properties.scss";
import {useGetSpecialProps} from "./hook/useGetSpecialProps";
import {useGetNormalProps} from "./hook/useGetNormalProps";
import {FaHashtag} from "react-icons/fa";

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
    const normalProps = useGetNormalProps(currentObjectProperties)

    const propObject: IPropObject[] = useMemo(() => {
        if (!specialProps) return [];
        return [
            specialProps,
            ...normalProps,
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
        if (content.type == "text") return <input disabled={content.disabled ?? false}
                                                  className="section-value-input"
                                                  type="text"
                                                  value={!content.disabled ? (content.value ?? "") : "None"}/>
        if (!content.custom) throw TypeError("You need to specify a custom prop if custom are used in the type prop")
        return content.custom(content, () => {
        });
    }, [store])

    return (
        <div className="properties-container">
            {propObject.length == 0 && <div className="no-props">
                <div className="icon">
                    <FaHashtag size={24}/>
                </div>
                <div className="title">No properties available</div>
                <div className="description">Select a elements to see properties</div>
            </div>}
            {propObject.length > 0 && propObject.map(obj =>
                (obj.content.length > 0 && <div className={`section-container ${obj.special ? "special" : ""}`}>
                    <span className="section-name">{obj.name}</span>
                    <div className={`section-content ${obj.content.length === 1 ? `one-row` : ""}`}>
                        {obj.content.map(content =>
                            <div className={`section-inner ${content.disabled ? "disabled" : ""}`}>
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