import React, {useCallback, useContext, useMemo} from "react";
import {FaTrash} from "react-icons/fa";
import {BlimpContext} from "../../../../../blimpx";

import "./deleteframe.scss";
import {IBlimpFrame} from "../../../../../blimpx.typing";

export function DeleteFrame() {
    const [store, setStore] = useContext(BlimpContext)

    const isObjectSelected = useMemo(() => {
        return store.currentObject != null && store.currentLayer != null
    }, [store])

    const isMinFrame = useMemo(() => {
        return store.currentFrame > 0
    }, [store])

    const onDeleteFrameClick = useCallback(() => {
        if (!isObjectSelected) return

        const frameSelected = store.layers.reduce((frameSelected, layer) => {
            const currentObject = layer.objects.find(obj => obj._id == store.currentObject)
            if (!currentObject) return frameSelected
            return currentObject.frames.find((f) => f.frame == store.currentFrame)
        }, undefined as IBlimpFrame | undefined)

        let newCurrentFrame: number | null = null

        const newLayers = store.layers.map((layer, idx) => {
            if (store.currentLayer !== idx) return layer
            const objects = layer.objects.map(object => {
                if (object._id !== store.currentObject) return object
                newCurrentFrame = store.currentFrame ? store.currentFrame - 1 : store.currentFrame
                const newFrames = object.frames.filter(frame => frame._id != frameSelected?._id)
                return {...object, frames: [...newFrames]}
            })
            return {...layer, objects}
        })

        setStore({
            type: "setLayer",
            state: {...store, layers: newLayers}
        })

        if (!newCurrentFrame) return
        setStore({
            type: "setCurrentFrame",
            state: {...store, currentFrame: newCurrentFrame}
        })
    }, [store])

    return (
        <div className="delete-frame-container">
            <div onClick={onDeleteFrameClick}
                 className={`delete-frame-button ${!isObjectSelected && !isMinFrame ? "disabled" : ""}`}
                 title="Delete the current frame of the selected object">
                <FaTrash/>
            </div>
        </div>
    )
}