import React, {useContext} from "react";
import "./fpscounter.scss";
import {BlimpContext} from "../../../../../blimpx";

export function FpsCounter() {
    const [store, setAction] = useContext(BlimpContext);
    return (
        <div className="fpscounter-container">
            <input type="text" className="fps-input" defaultValue={store.fps} readOnly/>
            <span className="fps-text">fps</span>
        </div>
    )
}