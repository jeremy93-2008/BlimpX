import React, {MouseEvent as MouseEvt, useContext} from "react";

import "./cursor.scss";
import {BlimpContext} from "../../../../../blimpx";

interface ICursorProps {
    frame: number;
    refCursor?: React.RefObject<HTMLDivElement>
    onMouseDown?: (evt: MouseEvt<HTMLDivElement, MouseEvent>) => void;
}

export function Cursor(props: ICursorProps) {
    const [context] = useContext(BlimpContext)
    const { frame, onMouseDown, refCursor } = props;

    return (
        <div ref={refCursor}
             className="cursor-container"
             style={{left: frame * context.frameWidth + (context.frameWidth / 2)}}>
            <div onMouseDown={onMouseDown} className="cursor-header" />
        </div>
    )
}