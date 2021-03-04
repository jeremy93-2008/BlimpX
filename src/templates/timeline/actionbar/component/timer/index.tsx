import React, {useContext, useMemo} from "react";
import {BlimpContext} from "../../../../../blimpx";
import {formatTimeFromMilliseconds} from "../../../../../util/time";

import "./timer.scss";

export function Timer() {
    const [store, setStore] = useContext(BlimpContext)

    useMemo(() => {
        const newMaxTimer = (store.timeline.maxTimeline / store.fps) * 1000
        if (store.timeline.maxTimer == newMaxTimer) return;
        setStore({
            type: "setTimeline",
            state: {...store, timeline: {...store.timeline, maxTimer: newMaxTimer}}
        })
    }, [store])

    useMemo(() => {
        const timer = (store.currentFrame / store.fps) * 1000
        console.log(timer)
        if (store.timeline.timer == timer) return;
        setStore({
            type: "setTimeline",
            state: {...store, timeline: {...store.timeline, timer}}
        })
    }, [store])

    return (
        <div className="timer-container">
            <span className="current-timer">{formatTimeFromMilliseconds(store.timeline.timer)}</span>
            /
            <span className="max-timer">{formatTimeFromMilliseconds(store.timeline.maxTimer)}</span>
        </div>
    )
}