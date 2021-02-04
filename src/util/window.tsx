import React from "react";
import {IBlimpState, IBlimpXAction} from "../blimpx.typing";
import { noop } from "../component/noop";

interface IWindowCursorMove {
    isCursorMoving: boolean;
    setCursorMoving: React.Dispatch<React.SetStateAction<boolean>>
    layerRef: React.RefObject<HTMLDivElement>;
    cursorRef:  React.RefObject<HTMLDivElement>;
    store: IBlimpState;
    setStore:  React.Dispatch<IBlimpXAction>;
}

export function onWindowCursorMove(param: IWindowCursorMove) {
    const { isCursorMoving } = param;
    if(!isCursorMoving) return () => noop();

    const onMouseMove = (evt: MouseEvent) => onCursorMove(evt, param);
    const onMouseUp = (evt: MouseEvent) => onCursorUp(evt, param)

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp)

    return () => {
        document.removeEventListener("mousemove", onMouseMove)
        document.removeEventListener("mouseup", onMouseUp)
    };
}

function onCursorMove(evt: MouseEvent, param: IWindowCursorMove) {
    const {layerRef, setStore, store} = param;
    const header = layerRef.current!.getBoundingClientRect().x;
    const cursor = evt.clientX;
    const newCurrentFrame = Math.trunc((cursor - header) / 11);
    if (newCurrentFrame == store.currentFrame) return;
    setStore({
        type:"setCurrentFrame",
        state: {
            currentFrame: newCurrentFrame + 1
        }
    });
}

function onCursorUp(evt: MouseEvent, param: IWindowCursorMove) {
    const { isCursorMoving, setCursorMoving } = param;
    if(!isCursorMoving) return;
    setCursorMoving(false)
}