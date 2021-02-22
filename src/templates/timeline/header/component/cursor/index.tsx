import React, {MouseEvent as MouseEvt, useCallback, useContext, useEffect, useState} from "react";

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

    const getFrameBasedX = useCallback(() => {
        return Math.trunc(context.timeline.scroll.x / context.frameWidth)
    }, [context])

    useEffect(() => {
        const initialVisibleFrame = getFrameBasedX();
        setCursorVisible(context.currentFrame >= initialVisibleFrame)
    }, [context])

    return (
        <div ref={refCursor}
             className="cursor-container"
             style={{
                 left: ((frame * context.frameWidth - (getFrameBasedX()) * context.frameWidth) + (context.frameWidth / 2)),
                 display: isCursorVisible ? "block" : "none"
             }}>
            <div onMouseDown={onMouseDown} className="cursor-header"/>
        </div>
    )
}