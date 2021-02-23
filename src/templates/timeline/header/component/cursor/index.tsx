import React, {MouseEvent as MouseEvt, useContext} from "react";

import "./cursor.scss";
import {BlimpContext} from "../../../../../blimpx";

interface ICursorProps {
    frame: number;
    xFrame: number
    refCursor?: React.RefObject<HTMLDivElement>
    onMouseDown?: (evt: MouseEvt<HTMLDivElement, MouseEvent>) => void;
}

export function Cursor(props: ICursorProps) {
    const {frame, onMouseDown, refCursor, xFrame} = props;
    const [context] = useContext(BlimpContext)

    return (
        <div ref={refCursor}
             className="cursor-container"
             style={{
                 left: ((frame * context.frameWidth - xFrame) + (context.frameWidth / 2))
             }}>
            <div onMouseDown={onMouseDown} className="cursor-header"/>
        </div>
    )
}