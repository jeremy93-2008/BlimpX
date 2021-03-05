import React, {useContext, useEffect} from "react";
import {IBlimpLayer} from "../blimpx.typing";
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

const onClickLayer = (context: IBlimpContext, newCurrentFrame: number) => {
    const [store, setStore] = context;
    if (store.isPlaying) return;
    setStore({
        type: "setCurrentFrame",
        state: {...store, currentFrame: newCurrentFrame}
    })
}

const getHeaderLayers = (context: IBlimpContext, idx: number, xForLayer: number) => {
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

const getFrameLayers = (context: IBlimpContext, layer: IBlimpLayer, idx: number) => {
    const currentFrame = idx;
    const isFrameExist = layer.objects.map(obj =>
        obj.frames.find(frame => frame.frame === currentFrame)).filter(f => f !== undefined)
    return (<>
        <div onClick={() => onClickLayer(context, currentFrame)} key={idx} className="line">
            <span className="is-frame-exist">{isFrameExist.length > 0 ? "●" : ""}</span>
        </div>
    </>)
}

export const getLayersByWidth = (name: layersType, context: IBlimpContext, layersWidth: number, layerIdx?: number) => {
    const [store, setStore] = context;
    const {timeline} = store;
    let layersWidthDOM = layersWidth;
    return [...new Array(store.timeline.maxTimeline)].map((_s, idx) => {
        if (layersWidthDOM < store.frameWidth) return;
        if ((timeline.scroll.xFrame * store.frameWidth) > idx * store.frameWidth) return;
        layersWidthDOM -= store.frameWidth;
        if (name == "header")
            return getHeaderLayers(context, idx, timeline.scroll.xFrame)
        if (name == "frames" && layerIdx != undefined)
            return getFrameLayers(context, store.layers[layerIdx], idx)
        return null;
    });
}


