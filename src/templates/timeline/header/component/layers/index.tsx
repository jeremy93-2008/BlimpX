import React, {useCallback, useContext, useRef, useState} from "react";

import "./layers.scss";
import {BlimpContext} from "../../../../../blimpx";
import {getLayersByWidth, useWidthLayer} from "../../../../../util/layers";
import {Cursor} from "../cursor";

export function HeaderLayers() {
    const [ store, setStore ] = useContext(BlimpContext);
    const [isCursorMoving, setCursorMoving] = useState(false);
    const cursorRef = useRef<HTMLDivElement>(null);

    const layersRef = useRef<HTMLDivElement>(null);
    const [layersWidth, setLayersWidth] = useState(0);

    const onCursorDown = useCallback(() => {
        if(isCursorMoving) return;
        setCursorMoving(true)
    }, []);

    const onCursorMove = useCallback(event => {
        if(!isCursorMoving) return;
        const header = cursorRef.current!.getBoundingClientRect();
        const cursor = event.target.getBoundingClientRect();
        console.log(Math.trunc((cursor.x - header.x) / 11) + 1)
        setStore({
            type:"setCurrentFrame",
            state: {
                currentFrame: Math.trunc((cursor.x - header.x) / 11)
            }
        });
    }, [isCursorMoving])

    const onCursorUp = useCallback(() => {
        if(!isCursorMoving) return;
        setCursorMoving(false)
    }, [isCursorMoving])

    useWidthLayer(layersRef, setLayersWidth, store)

    return (
        <div ref={layersRef}
             className="layers-header-container"
             onMouseMove={onCursorMove}
             onMouseUp={onCursorUp}
        >
            <Cursor
                refCursor={cursorRef}
                frame={store.currentFrame}
                onMouseDown={onCursorDown}
            />
            {getLayersByWidth("header", store, layersWidth)}
        </div>
    )
}