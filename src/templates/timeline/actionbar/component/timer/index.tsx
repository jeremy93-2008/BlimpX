import React, {useContext} from "react";
import {BlimpContext} from "../../../../../blimpx";
import { formatTimeFromMilliseconds } from "../../../../../util/time";

import "./timer.scss";

export function Timer() {
    const [ store ] = useContext(BlimpContext)
    return (
        <div className="timer-container">
            <span className="current-timer">{formatTimeFromMilliseconds(store.timeline.timer)}</span>
            /
            <span className="max-timer">{formatTimeFromMilliseconds(store.timeline.maxTimer)}</span>
        </div>
    )
}