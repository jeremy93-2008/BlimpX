import React, {useCallback, useContext, useEffect, useState} from "react";
import {FaFastBackward, FaFastForward, FaPause, FaPlay} from "react-icons/fa";

import "./playcontrol.scss";
import {BlimpContext} from "../../../../../blimpx";

export function PlayControl() {
    const [store, setStore] = useContext(BlimpContext)
    const [isPlaying, setPlaying] = useState(false)

    const maxFrameTimeline = useCallback(() => {
        let maxTimeline = 0
        store.layers.map(l => l.objects.map(obj => obj.frames.map(frame => {
            if (maxTimeline < frame.frame) {
                maxTimeline = frame.frame
            }
        })))
        return maxTimeline;
    }, [store])

    const onFrameChange = useCallback((newCurrentFrame: number, endFrame: number) => {
        if (newCurrentFrame < 0) newCurrentFrame = 0
        if (newCurrentFrame > endFrame) newCurrentFrame = endFrame
        setStore({type: "setCurrentFrame", state: {currentFrame: newCurrentFrame}})
    }, [store])

    useEffect(() => {
        if (!isPlaying) return
        const intervalPlaying = window.setInterval(() => {
            onFrameChange(store.currentFrame + 1, maxFrameTimeline())
        }, 1000 / store.fps)

        return () => {
            clearInterval(intervalPlaying)
        }
    }, [isPlaying, store])

    return (
        <div className="playcontrol-container">
            <FaFastBackward onClick={() =>
                onFrameChange(store.currentFrame - 1, store.timeline.maxTimeline)}
            />
            {isPlaying ? <FaPause onClick={() => {
                setPlaying(false)
            }}/> : <FaPlay onClick={() => {
                setPlaying(true)
            }}/>}
            <FaFastForward onClick={() =>
                onFrameChange(store.currentFrame + 1, store.timeline.maxTimeline)}
            />
        </div>
    )
}