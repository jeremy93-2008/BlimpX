import {useCallback} from "react";
import {IBlimpObjectRender, IBlimpState} from "../blimpx.typing";

export function useGetObjectByFrame(store: IBlimpState) {
    return useCallback((frame: number) => {
        return store.layers.map((layer) => {
            return layer.objects.map((obj): IBlimpObjectRender | null => {
                const { onionLayersShown } = store.timeline
                const frameObj = obj.frames.find(f => f.frame == frame)
                const newFrames = obj.frames.filter(f => f.frame <= frame + onionLayersShown &&
                    f.frame >= frame - onionLayersShown && frame != f.frame)
                return {...obj, frames: {currentFrame: frameObj, nextFrames: newFrames}}
            })
        }).flat()
    }, [store])
}