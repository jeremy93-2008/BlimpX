import React, {useContext, useEffect, useRef, useState} from "react";

import "./layers.scss";
import {BlimpContext} from "../../../../../blimpx";

const frameWidth = 11;

export function HeaderLayers() {
    const [ store ] = useContext(BlimpContext);
    const layersRef = useRef<HTMLDivElement>(null);
    const [layersWidth, setLayersWidth] = useState(0);

    const setLayersWidthFromRef = () => {
        setLayersWidth(layersRef.current!.offsetWidth);
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

    const getLayersByWidth = () => {
        let layersWidthDOM = layersWidth;
        return [...new Array(store.timeline.maxTimeline)].map((_s, idx) => {
            if(layersWidthDOM < frameWidth) return;
            layersWidthDOM -= frameWidth;
            return (<div key={idx}>
                <div className={`line ${idx % store.fps == 0 ? "second" : ""}`}/>
                {idx > 0 && idx % store.fps == 0 ?
                    <div className="timespan" style={{left: frameWidth * idx}}>{idx / store.fps}s</div> : ""}
            </div>)
        });
    }

    return (
        <div ref={layersRef} className="layers-header-container">
            {getLayersByWidth()}
        </div>
    )
}