import React, {useCallback, useContext, useEffect} from "react";
import {FaFastBackward, FaFastForward, FaPause, FaPlay} from "react-icons/fa";

import "./playcontrol.scss";
import {BlimpContext} from "../../../../../blimpx";
import {IconType} from "react-icons";

export function PlayControl() {
    const [store, setStore] = useContext(BlimpContext)

    const maxFrameTimeline = useCallback(() => {
        let maxTimeline = 0
        store.layers.map(l => l.objects.map(obj => obj.frames.map(frame => {
            if (maxTimeline < frame.frame) {
                maxTimeline = frame.frame
            }
        })))
        return maxTimeline;
    }, [store])

    const onFrameChange = useCallback((newCurrentFrame: number, endFrame: number, reload?: boolean) => {
        if (newCurrentFrame < 0) newCurrentFrame = 0
        if (newCurrentFrame > endFrame) newCurrentFrame = reload ? 0 : endFrame
        setStore({type: "setCurrentFrame", state: {currentFrame: newCurrentFrame}})
    }, [store])

    const PlayButton = useCallback((Component: IconType, isPlaying: boolean) => {
        return <Component onClick={() => {
            setStore({type: "setPlaying", state: {...store, isPlaying}})
        }}/>
    }, [])

    useEffect(() => {
        if (!store.isPlaying) return
        const intervalPlaying = window.setInterval(() => {
            onFrameChange(store.currentFrame + 1, maxFrameTimeline(), true)
        }, 1000 / store.fps)
        return () => {
            clearInterval(intervalPlaying)
        }
    }, [store])

    return (
        <div className="playcontrol-container">
            <FaFastBackward onClick={() =>
                onFrameChange(store.currentFrame - 1, store.timeline.maxTimeline)}
            />
            {PlayButton(store.isPlaying ? FaPause : FaPlay, !store.isPlaying)}
            <FaFastForward onClick={() =>
                onFrameChange(store.currentFrame + 1, store.timeline.maxTimeline)}
            />
        </div>
    )
}