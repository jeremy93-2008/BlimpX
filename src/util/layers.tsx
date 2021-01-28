import React, {useEffect} from "react";
import {IBlimpLayer, IBlimpState} from "../blimpx.typing";

type layersType = "header" | "frames";

export const useWidthLayer = (layersRef: React.RefObject<HTMLElement>,
                              setLayersWidth: React.Dispatch<number>,
                              store: IBlimpState) => {
    const setLayersWidthFromRef = () => {
        setLayersWidth(layersRef.current!.offsetWidth + 25);
    }

    useEffect(() => {
        setLayersWidthFromRef()
        window.onresize = () => {
            setLayersWidthFromRef()
        }
    }, [])

    useEffect(() => {
        setLayersWidthFromRef()
    }, [store])

    return null;
}

export const frameWidth = 11;

export const getLayersByWidth = (name: layersType, store: IBlimpState, layersWidth: number, layerIdx?: number) => {
    let layersWidthDOM = layersWidth;
    return [...new Array(store.timeline.maxTimeline)].map((_s, idx) => {
        if(layersWidthDOM < frameWidth) return;
        layersWidthDOM -= frameWidth;
        if(name == "header")
            return getHeaderLayers(store, idx)
        if(name == "frames" && layerIdx != undefined)
            return getFrameLayers(store.layers[layerIdx], idx)
        return null;
    });
}

const getHeaderLayers = (store: IBlimpState, idx: number) => {
    return (<div key={idx}>
        <div className={`line ${idx % store.fps == 0 ? "second" : ""}`}/>
        {idx > 0 && idx % store.fps == 0 ?
            <div className="timespan" style={{left: frameWidth * idx}}>{idx / store.fps}s</div> : ""}
    </div>)
}

const getFrameLayers = (layer: IBlimpLayer, idx: number) => {
    const currentFrame = idx + 1;
    const isFrameExist = layer.objects.map(obj =>
        obj.frames.find(frame => frame.frame === currentFrame)).filter(f => f !== undefined)
    return (<>
        <div key={idx} className="line">
            <span className="is-frame-exist">{isFrameExist.length > 0 ? "●" : ""}</span>
        </div>
    </>)
}