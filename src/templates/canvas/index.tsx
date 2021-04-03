import React, {useEffect, useRef, useState} from "react";

import "./canvas.scss"
import {BlimpStage} from "./component/blimpStage";

export function Canvas() {
    const refCanvas = useRef<HTMLDivElement>(null);
    const [{width, height}, setCanvasSize] = useState({width: 0, height: 0});

    useEffect(() => {
        if (!refCanvas.current) return;
        const onResize = () => {
            const newWidth = refCanvas.current!.offsetWidth / 1.5
            const newHeight = refCanvas.current!.offsetHeight / 1.5
            // We check if the width and height are not the same to avoid useless render
            if (width + height == newWidth + newHeight) return;
            setCanvasSize({width: newWidth, height: newHeight})
        }

        window.addEventListener("resize", onResize)
        onResize()

        return () => {
            window.removeEventListener("resize", onResize)
        }
    }, [])

    return (
        <div ref={refCanvas} className="canvas-container">
            <BlimpStage width={width} height={height}/>
        </div>
    )
}