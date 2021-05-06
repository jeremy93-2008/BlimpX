import React, {useCallback, useContext, useMemo} from "react";
import {BlimpContext} from "../../../../blimpx";
import {IBlimpFrameWithCurrentFrame, IBlimpPropsInspector} from "@source/blimpx.typing";
import {useGetSpecialProps} from "./hook/useGetSpecialProps";
import {useGetNormalProps} from "./hook/useGetNormalProps";
import {useGetAdditionalProps} from "./hook/useGetAdditionalProps";

import {FaHashtag} from "react-icons/fa";

import "./properties.scss";

export type IPropObject = {
    name: string,
    special?: boolean;
    content: IBlimpPropsInspector[]
}

export function Properties() {
    const [store, setStore] = useContext(BlimpContext)

    const currentObjectProperties = useMemo(() => {
        const currentLayer = store.layers.find((layer) =>
            layer.objects.find(obj => obj._id == store.currentObject))

        const currentObject = currentLayer ?
            currentLayer.objects.find(obj => obj._id === store.currentObject) : null;

        const objectPropsWithFrames = currentObject ?? null;

        return objectPropsWithFrames ? {
            ...objectPropsWithFrames,
            ...objectPropsWithFrames?.frames.find(f => f.frame == store.currentFrame)
        } as IBlimpFrameWithCurrentFrame : null;
    }, [store])

    const specialProps = useGetSpecialProps(currentObjectProperties);
    const normalProps = useGetNormalProps(currentObjectProperties);
    const additionalProps = useGetAdditionalProps(currentObjectProperties)

    const propObject: IPropObject[] = useMemo(() => {
        if (!specialProps || normalProps.length < 1) return [];
        return [
            specialProps,
            ...normalProps,
            ...additionalProps
        ]
    }, [store])

    const getValueByType = useCallback((type: "text" | "number", value: string | undefined) => {
        if (!value) return null;
        if (type == "number") return Number(value).toFixed(2);
        return value;
    }, [])

    const onChangeValue = useCallback((content: IBlimpPropsInspector) => (newValue: string) => {
        const newLayers = store.layers.map((layer, idx) => {
            if(layer._id != store.layers[store.currentLayer]._id) return layer;
            const newObjects = layer.objects.map(obj => {
                if(obj._id != store.currentObject) return obj;
                const newFrames = obj.frames.map(frame => {
                    if(frame._id != obj.frames[store.currentFrame]._id) return frame;
                    return {
                        ...frame,
                        params: {
                            ...frame.params,
                            [content.propName]: newValue
                        }
                    }
                })
                return {
                    ...obj,
                    frames: newFrames
                }
            })
            return {
                ...layer,
                objects: newObjects
            };
        })
        setStore({
            type: "setLayer",
            state: {...store, layers: newLayers}
        })
    }, [store])

    const getContentFieldByType = useCallback((content: IBlimpPropsInspector) => {
        const {type, custom, value, disabled} = content;
        const onChange = onChangeValue(content)
        if (type == "text" || type == "number")
            return <input disabled={disabled ?? false}
                          className="section-value-input"
                          type={type}
                          onChange={(evt) => onChange(evt.target.value)}
                          value={!disabled ?
                              getValueByType(type, value) ?? ""
                              : "None"}/>
        if (!custom) throw TypeError("You need to specify a custom prop if custom are used in the type prop")
        return custom(content, onChange);
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