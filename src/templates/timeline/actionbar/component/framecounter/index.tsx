import React, {useContext} from "react";
import "./framecounter.scss";
import {BlimpContext} from "../../../../../blimpx";

export function FrameCounter() {
    const [store, setAction] = useContext(BlimpContext);
    return (
        <div className="framecounter-container">
            <input type="text" className="frame-input" value={store.currentFrame + 1} readOnly/>
            <span className="frame-text">frame</span>
        </div>
    )
}