import React from "react";
import { IBlimpXAction } from "../blimpx.typing";
import { noop } from "../component/noop";

interface IWindowCursorMove {
    isCursorMoving: boolean;
    setCursorMoving: React.Dispatch<React.SetStateAction<boolean>>
    layerRef: React.RefObject<HTMLDivElement>;
    cursorRef:  React.RefObject<HTMLDivElement>;
    setStore:  React.Dispatch<IBlimpXAction>;
}

export function onWindowCursorMove(param: IWindowCursorMove) {
    const { isCursorMoving } = param;
    if(!isCursorMoving) return () => noop();

    const onMouseMove = (evt: MouseEvent) => onCursorMove(evt, param);
    const onMouseUp = (evt: MouseEvent) => onCursorUp(evt, param)

    window.addEventListener("mousedown", onMouseMove);
    window.addEventListener("mouseup", onMouseUp)

    return () => {
        window.removeEventListener("mousedown", onMouseMove)
        window.removeEventListener("mouseup", onMouseUp)
    };
}

function onCursorMove(evt: MouseEvent, param: IWindowCursorMove) {
    const {layerRef, cursorRef, setStore} = param;
    // Need to do some calculation
    const header = cursorRef.current!.getBoundingClientRect();
    /*const cursor = event.target.getBoundingClientRect();
    console.log(Math.trunc((cursor.x - header.x) / 11) + 1)
    setStore({
        type:"setCurrentFrame",
        state: {
            currentFrame: Math.trunc((cursor.x - header.x) / 11)
        }
    });*/
}

function onCursorUp(evt: MouseEvent, param: IWindowCursorMove) {
    const { isCursorMoving, setCursorMoving } = param;
    if(!isCursorMoving) return;
    setCursorMoving(false)
}