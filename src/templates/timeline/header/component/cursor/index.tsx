import React from "react";

import "./cursor.scss";

interface ICursorProps {
    frame: number;
    refCursor?: React.RefObject<HTMLDivElement>
    onMouseDown?: () => void;
}

export function Cursor(props: ICursorProps) {
    const { frame, onMouseDown, refCursor } = props;

    return (
        <div ref={refCursor} className="cursor-container" style={{left: frame * 11}}>
            <div onMouseDown={onMouseDown} className="cursor-header" />
        </div>
    )
}