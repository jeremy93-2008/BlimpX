import React, {useContext, useEffect} from "react";
import {IBlimpObject} from "../blimpx.typing";
import {BlimpContext, IBlimpContext} from "../blimpx";

type layersType = "header" | "frames";

export const useWidthLayer = (layersRef: React.RefObject<HTMLElement>,
                              setLayersWidth: React.Dispatch<number>) => {
    const [store, setStore] = useContext(BlimpContext)
    const setLayersWidthFromRef = () => {
        setLayersWidth(layersRef.current!.offsetWidth + 25);
    }

    useEffect(() => {
        setLayersWidthFromRef()
        window.addEventListener("resize", () => {
            setLayersWidthFromRef()
        })
    }, [])

    useEffect(() => {
        setLayersWidthFromRef()
    }, [store])

    return null;
}

const onClickLayer = (context: IBlimpContext, newCurrentFrame: number,
                      newCurrentLayer?: number, newCurrentObject?: string) => {
    const [store, setStore] = context;
    if (store.isPlaying) return;
    setStore({
        type: "setCurrentFrame",
        state: {...store, currentFrame: newCurrentFrame}
    })
    if (newCurrentLayer)
        setStore({
            type: "setCurrentLayer",
            state: {...store, currentLayer: newCurrentLayer}
        })
    if (newCurrentObject)
        setStore({
            type: "setCurrentObject",
            state: {...store, currentObject: newCurrentObject}
        })
}

const getHeaderTemplate = (context: IBlimpContext, idx: number, xForLayer: number) => {
    const [store] = context
    const {currentFrame, timeline} = store;
    const {onionLayersShown} = store.timeline;
    const isFrameShown = idx <= currentFrame + onionLayersShown && idx >= currentFrame - onionLayersShown;
    return (<div onClick={() => onClickLayer(context, idx)}
                 className={`line-container ${isFrameShown ? "onion" : ""}`}
                 key={idx}>
        <div className={`line ${idx % store.fps == 0 ? "second" : ""}`}/>
        {idx > 0 && idx % store.fps == 0 ?
            <div className="timespan"
                 style={{left: store.frameWidth * idx - (xForLayer * store.frameWidth)}}>{idx / store.fps}s</div> : ""}
    </div>)
}

const getFrameTemplate = (context: IBlimpContext, object: IBlimpObject, layerIdx: number, idx: number) => {
    const [store] = context;
    const currentFrame = idx;
    const isFrameExist = object.frames.find(frame => frame.frame === currentFrame)
    const isFrameSelected = store.currentFrame === idx && store.currentObject === object._id
    return (<>
        <div onClick={() => onClickLayer(context, currentFrame, layerIdx, object._id)} key={idx} className="line">
            <div className={`frame-content ${isFrameSelected ? "frame-selected" : ""}`}
                 style={{width: store.frameWidth}}/>
            <span className="is-frame-exist">{isFrameExist ? "●" : ""}</span>
        </div>
    </>)
}

export const getLayersByWidth = (name: layersType, context: IBlimpContext, layersWidth: number,
                                 layerIdx?: number, objectIdx?: number) => {
    const [store, setStore] = context;
    const {timeline} = store;
    let layersWidthDOM = layersWidth;
    return [...new Array(store.timeline.maxTimeline)].map((_s, idx) => {
        if (layersWidthDOM < store.frameWidth) return;
        if ((timeline.scroll.xFrame * store.frameWidth) > idx * store.frameWidth) return;
        layersWidthDOM -= store.frameWidth;
        if (name == "header")
            return getHeaderTemplate(context, idx, timeline.scroll.xFrame)
        else if (name == "frames" && layerIdx != undefined && objectIdx != undefined)
            return getFrameTemplate(context, store.layers[layerIdx].objects[objectIdx], layerIdx, idx)
        return null;
    });
}


