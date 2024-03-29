import React, {useCallback, useContext, useMemo} from "react";
import {v4 as uuidv4} from "uuid";
import {BlimpContext} from "../../../../../blimpx";
import {FaPlus} from "react-icons/fa";

import "./addnewframe.scss";
import {IBlimpFrame, IBlimpParams} from "../../../../../blimpx.typing";


export function AddNewFrame() {
    const [store, setStore] = useContext(BlimpContext)

    const isObjectSelected = useMemo(() => {
        return store.currentObject != null && store.currentLayer != null
    }, [store])

    const createNewFrame = useCallback((frame: number, params: IBlimpParams): IBlimpFrame => {
        return {
            _id: uuidv4(),
            frame,
            params: {...params, x: (params.x ?? 0) + 50, y: params.y ?? 0}
        }
    }, [])

    const onNewFrameClick = useCallback(() => {
        if (!isObjectSelected) return

        let newObjectId: string | null = null
        let newCurrentFrame: number | null = null

        const newLayers = store.layers.map((layer, idx) => {
            if (store.currentLayer !== idx) return layer
            const objects = layer.objects.map(object => {
                if (object._id !== store.currentObject) return object
                newObjectId = object._id
                const maxFrame = object.frames.reduce((acc, currentValue) => {
                    return Math.max(acc, currentValue.frame)
                }, 0)
                const lastFrameParams = object.frames[object.frames.length - 1].params
                const newFrame = createNewFrame(maxFrame + 1, lastFrameParams)
                newCurrentFrame = newFrame.frame
                return {...object, frames: [...object.frames, newFrame]}
            })
            return {...layer, objects}
        })

        setStore({
            type: "setLayer",
            state: {...store, layers: newLayers}
        })

        if (!newObjectId || !newCurrentFrame) return
        setStore({
            type: "setCurrentObject",
            state: {...store, currentObject: newObjectId}
        })
        setStore({
            type: "setCurrentFrame",
            state: {...store, currentFrame: newCurrentFrame}
        })
    }, [store])

    return (
        <div className="add-new-frame-container">
            <div onClick={onNewFrameClick}
                 className={`add-new-frame-button ${!isObjectSelected ? "not-allowed" : ""}`}
                 title="Add a new frame of the current selected object">
                <FaPlus/>
                Add New Frame
            </div>
        </div>
    )
}