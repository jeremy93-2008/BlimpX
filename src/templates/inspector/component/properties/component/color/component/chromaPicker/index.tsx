import React, {MouseEvent, useCallback, useEffect, useMemo, useRef, useState} from "react";
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
    const {color, onChange} = props;
    const refChroma = useRef<HTMLDivElement>(null)
    const [{x, y}, setPosition] = useState<IColorPosition>({x: 0, y: 0})

    const gradientChroma = useMemo(() => {
        return `linear-gradient(to bottom, transparent, black), 
    linear-gradient(to right, white, transparent), ${getHSLString(color, true) ?? "rgb(255,0,0)"}`
    }, [color])

    useEffect(() => {
        if (!refChroma.current) return;
        const boundingRect = refChroma.current!.getBoundingClientRect()

        const saturate = Number(color.Saturate.replace("%", "")) / 100
        const lightning = Number(color.Lightning.replace("%", "")) / 100
        const temperature = saturate * (lightning < 0.5 ? lightning : 1 - lightning)

        const newX = saturate * 180
        const newY = boundingRect.height - ((lightning + temperature) * boundingRect.height)
        setPosition({
            x: newX > boundingRect.width - 12 ? boundingRect.width - 12 : newX,
            y: newY > boundingRect.height - 12 ? boundingRect.height - 12 : newY
        })
    }, [color])

    const onMouseColorDown = useCallback((evt: MouseEvent<HTMLDivElement>) => {
        if (!refChroma.current) return;
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
    }, [color])

    return (<div onMouseDown={onMouseColorDown} ref={refChroma} className="chroma-container"
                 style={{background: gradientChroma}}>
        <div className="picker-pointer-chroma" style={{left: x, top: y}}/>
    </div>)
}