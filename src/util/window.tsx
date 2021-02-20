import React from "react";
import {IBlimpState, IBlimpXAction} from "../blimpx.typing";
import {noop} from "../component/noop";

interface IWindowMoveParams {
    isCursorMoving: boolean;
    setCursorMoving: React.Dispatch<React.SetStateAction<boolean>>
    layerRef: React.RefObject<HTMLDivElement>;
    cursorRef: React.RefObject<HTMLDivElement>;
    store: IBlimpState;
    setStore: React.Dispatch<IBlimpXAction>;
}

export function onWindowCursorMove(param: IWindowMoveParams) {
    return onWindowBaseMove(param, onCursorMove, onCursorUp)
}

export function onWindowThumbMove(param: IWindowMoveParams) {
    return onWindowBaseMove(param, onThumbMove, onCursorUp)
}

function onWindowBaseMove(param: IWindowMoveParams,
                          onMove: (evt: MouseEvent, param: IWindowMoveParams) => void,
                          onUp: (evt: MouseEvent, param: IWindowMoveParams) => void) {
    const {isCursorMoving} = param;
    if (!isCursorMoving) return () => noop();

    const onMouseMove = (evt: MouseEvent) => onMove(evt, param);
    const onMouseUp = (evt: MouseEvent) => onUp(evt, param)

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp)

    return () => {
        document.removeEventListener("mousemove", onMouseMove)
        document.removeEventListener("mouseup", onMouseUp)
    };
}

function onCursorMove(evt: MouseEvent, param: IWindowMoveParams) {
    const {layerRef, setStore, store} = param;
    const header = layerRef.current!.getBoundingClientRect().x;
    const cursor = evt.clientX;
    let newCurrentFrame = Math.trunc((cursor - header) / store.frameWidth);
    if (newCurrentFrame == store.currentFrame) return;
    if (newCurrentFrame <= 0) newCurrentFrame = 0;
    setStore({
        type: "setCurrentFrame",
        state: {
            currentFrame: newCurrentFrame
        }
    });
}

function onCursorUp(evt: MouseEvent, param: IWindowMoveParams) {
    const {isCursorMoving, setCursorMoving} = param;
    if (!isCursorMoving) return;
    setCursorMoving(false)
}

function onThumbMove(evt: MouseEvent, param: IWindowMoveParams) {
    const {layerRef, setStore, store, cursorRef} = param;
    const widthTimeline = layerRef.current!.offsetWidth - cursorRef.current!.offsetWidth + 1;
    const header = layerRef.current!.getBoundingClientRect().x;
    const cursor = evt.clientX;
    let newX = cursor - header - (cursorRef.current!.offsetWidth / 2)
    if (newX < -1) newX = 0;
    if (newX > widthTimeline) newX = widthTimeline
    setStore({
        type: "setTimeline", state: {
            timeline: {
                ...store.timeline,
                scroll: {
                    x: newX,
                    y: store.timeline.scroll.y
                }
            }
        }
    })
}