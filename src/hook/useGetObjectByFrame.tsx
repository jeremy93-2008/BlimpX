import {useCallback} from "react";
import {IBlimpObjectRender, IBlimpState} from "../blimpx.typing";

export function useGetObjectByFrame(store: IBlimpState) {
    return useCallback((frame: number) => {
        return store.layers.map((layer) => {
            return layer.objects.map((obj): IBlimpObjectRender | null => {
                const frameObj = obj.frames.find(f => f.frame == frame)
                const newFrameObj = obj.frames.find(f => f.frame == frame + 1)
                if (!frameObj) return null;
                return {...obj, frames: {currentFrame: frameObj, nextFrames: newFrameObj}}
            })
        }).flat()
    }, [])
}