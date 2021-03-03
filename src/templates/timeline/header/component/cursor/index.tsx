import React, {MouseEvent as MouseEvt, useContext, useEffect, useState} from "react";

import "./cursor.scss";
import {BlimpContext} from "../../../../../blimpx";

interface ICursorProps {
    frame: number;
    xFrame: number
    refCursor?: React.RefObject<HTMLDivElement>
    onMouseDown?: (evt: MouseEvt<HTMLDivElement, MouseEvent>) => void;
}

export function Cursor(props: ICursorProps) {
    const {frame: frameCursor, onMouseDown, refCursor, xFrame} = props;
    const [context] = useContext(BlimpContext)
    const [isCursorVisible, setCursorVisible] = useState(true)

    useEffect(() => {
        setCursorVisible(xFrame <= frameCursor)
    }, [context])

    return (
        <div ref={refCursor}
             className="cursor-container"
             style={{
                 left: ((frameCursor * context.frameWidth
                     - (xFrame * context.frameWidth)) + (context.frameWidth / 2)),
                 display: isCursorVisible ? "block" : "none",
                 pointerEvents: context.isPlaying ? "none" : "auto"
             }}>
            <div onMouseDown={onMouseDown} className="cursor-header"/>
        </div>
    )
}