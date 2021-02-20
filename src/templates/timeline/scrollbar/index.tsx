import React, {MouseEvent as MouseEvt, useCallback, useContext, useEffect, useRef, useState} from "react";
import {BlimpContext} from "../../../blimpx";

import "./scrollbar.scss"
import {onWindowThumbMove} from "../../../util/window";

export function ScrollBar() {
    const refFrame = useRef<HTMLDivElement>(null)
    const refCursor = useRef<HTMLDivElement>(null)
    const [thumbWidth, setThumbWidth] = useState(0)
    const [isThumbMoving, setThumbMoving] = useState(false)
    const [store, setStore] = useContext(BlimpContext);

    const onCursorDown = useCallback((evt: MouseEvt<HTMLDivElement, MouseEvent>) => {
        if (evt.buttons == 2 || isThumbMoving) return;
        setThumbMoving(true)
    }, []);

    useEffect(() => {
        if (!isThumbMoving) return;
        const removeEventListener = onWindowThumbMove(
            {
                isCursorMoving: isThumbMoving,
                setCursorMoving: setThumbMoving,
                layerRef: refFrame,
                cursorRef: refCursor,
                store,
                setStore
            });

        return () => {
            removeEventListener();
        }
    }, [isThumbMoving]);

    useEffect(() => {
        if (!refFrame.current) return;
        const timelineWidth = refFrame.current!.offsetWidth;
        setThumbWidth(timelineWidth / store.frameWidth)
    }, [])

    return (
        <div className="scrollbar-container">
            <div className="scrollbar-layer"/>
            <div ref={refFrame} className="scrollbar-frame">
                <div ref={refCursor} onMouseDown={onCursorDown} className="thumb-container"
                     style={{width: thumbWidth, left: store.timeline.scroll.x}}/>
            </div>
        </div>
    )
}