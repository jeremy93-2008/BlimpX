import React, {MouseEvent as MouseEvt, useCallback, useContext, useEffect, useRef, useState} from "react";

import "./layers.scss";
import {BlimpContext} from "../../../../../blimpx";
import {getLayersByWidth, useWidthLayer} from "../../../../../util/layers";
import {Cursor} from "../cursor";
import {onWindowCursorMove} from "../../../../../util/window";

export function HeaderLayers() {
    const blimpContext = useContext(BlimpContext);
    const [store, setStore] = blimpContext;
    const [isCursorMoving, setCursorMoving] = useState(false);
    const cursorRef = useRef<HTMLDivElement>(null);

    const layerRef = useRef<HTMLDivElement>(null);
    const [layersWidth, setLayersWidth] = useState(0);

    const onCursorDown = useCallback((evt: MouseEvt<HTMLDivElement, MouseEvent>) => {
        if (evt.buttons == 2 || isCursorMoving) return;
        setCursorMoving(true)
    }, []);

    useEffect(() => {
        if (!isCursorMoving) return;
        const removeEventListener = onWindowCursorMove(
            {
                isCursorMoving,
                setCursorMoving,
                layerRef,
                cursorRef,
                store,
                setStore
            });

        return () => {
            removeEventListener();
        }
    }, [isCursorMoving]);

    useWidthLayer(layerRef, setLayersWidth)

    return (
        <div ref={layerRef} className="layers-header-container">
            <Cursor
                refCursor={cursorRef}
                frame={store.currentFrame}
                onMouseDown={onCursorDown}
                xFrame={store.timeline.scroll.xFrame}
            />
            {getLayersByWidth("header", blimpContext, layersWidth)}
        </div>
    )
}