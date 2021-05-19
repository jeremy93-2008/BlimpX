import React, {useCallback, useState, MouseEvent, useRef} from "react";
import {IBlimpPropsOnChange} from "../../../../../../../../blimpx.typing";
import {getHSLString, getRGBString, IHSLObject, toHSLinRGB} from "../../../../../../../../util/color";

interface IChromaProps {
    color: IHSLObject;
    onChange: IBlimpPropsOnChange;
}

interface IColorPosition {
    x: number
    y: number
}

export function ChromaPicker(props: IChromaProps) {
    const { color, onChange } = props;
    const refChroma = useRef<HTMLDivElement>(null)
    const [{ x, y }, setPosition] = useState<IColorPosition>({x: 0, y: 0})

    const gradientChroma = `linear-gradient(to bottom, transparent, black), 
    linear-gradient(to right, white, transparent), ${getHSLString(color) ?? "rgb(255,0,0)"}`

    const onMouseColorDown = useCallback((evt: MouseEvent<HTMLDivElement>) => {
        if(!refChroma.current) return;
        const boundingRect = refChroma.current!.getBoundingClientRect()
        const newX = evt.clientX - boundingRect.x
        const newY = evt.clientY - boundingRect.y

        setPosition({
            x: newX > boundingRect.width - 12 ? boundingRect.width - 12 : newX,
            y: newY > boundingRect.height - 12 ? boundingRect.height - 12 : newY,
        })

        const saturate = (newX / boundingRect.width)
        const brightness = (boundingRect.height - newY) / boundingRect.height

        onChange(getRGBString(toHSLinRGB({
            Hue: `${(360 - Number(color.Hue)) / 360}`,
            Saturate: `${saturate}`,
            Lightning: `${(2 - saturate) * brightness / 2}`
        })))
    }, [])

    return (<div onMouseDown={onMouseColorDown} ref={refChroma} className="chroma-container" style={{background: gradientChroma}}>
        <div className="picker-pointer-chroma" style={{left: x, top: y}} />
    </div>)
}