import React, {useCallback, useContext} from "react";
import {FaFastBackward, FaFastForward, FaPlay} from "react-icons/fa";

import "./playcontrol.scss";
import {BlimpContext} from "../../../../../blimpx";

export function PlayControl() {
    const [store, setStore] = useContext(BlimpContext)

    const onFrameChange = useCallback((newCurrentFrame: number) => {
        if (newCurrentFrame < 0) newCurrentFrame = 0
        if (newCurrentFrame > store.timeline.maxTimeline) newCurrentFrame = store.timeline.maxTimeline
        setStore({type: "setCurrentFrame", state: {currentFrame: newCurrentFrame}})
    }, [store])

    return (
        <div className="playcontrol-container">
            <FaFastBackward onClick={() => onFrameChange(store.currentFrame - 1)}/>
            <FaPlay/>
            <FaFastForward onClick={() => onFrameChange(store.currentFrame + 1)}/>
        </div>
    )
}