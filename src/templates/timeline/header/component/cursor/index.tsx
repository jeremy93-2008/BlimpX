import React, {MouseEvent as MouseEvt, useContext, useEffect, useState} from "react";

import "./cursor.scss";
import {BlimpContext} from "../../../../../blimpx";

interface ICursorProps {
    frame: number;
    refCursor?: React.RefObject<HTMLDivElement>
    onMouseDown?: (evt: MouseEvt<HTMLDivElement, MouseEvent>) => void;
}

export function Cursor(props: ICursorProps) {
    const {frame, onMouseDown, refCursor} = props;
    const [context] = useContext(BlimpContext)
    const [isCursorVisible, setCursorVisible] = useState(true)

    useEffect(() => {
        const initialVisibleFrame = Math.round(context.timeline.scroll.x / context.frameWidth)
        setCursorVisible(context.currentFrame >= initialVisibleFrame)
    }, [context])


    return (
        <div ref={refCursor}
             className="cursor-container"
             style={{
                 left: (frame * context.frameWidth + (context.frameWidth / 2) - Math.round(context.timeline.scroll.x)),
                 display: isCursorVisible ? "block" : "none"
             }}>
            <div onMouseDown={onMouseDown} className="cursor-header"/>
        </div>
    )
}