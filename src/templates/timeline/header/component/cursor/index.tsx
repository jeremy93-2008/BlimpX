import React, {MouseEvent as MouseEvt} from "react";

import "./cursor.scss";

interface ICursorProps {
    frame: number;
    refCursor?: React.RefObject<HTMLDivElement>
    onMouseDown?: (evt: MouseEvt<HTMLDivElement, MouseEvent>) => void;
}

export function Cursor(props: ICursorProps) {
    const { frame, onMouseDown, refCursor } = props;

    return (
        <div ref={refCursor} className="cursor-container" style={{left: frame * 11 + 5.5}}>
            <div onMouseDown={onMouseDown} className="cursor-header" />
        </div>
    )
}