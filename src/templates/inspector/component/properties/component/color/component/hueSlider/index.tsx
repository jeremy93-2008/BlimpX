import React, {MouseEvent, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {getRGBString, IHSLObject, toHSLinRGB} from "../../../../../../../../util/color";
import {IBlimpPropsOnChange} from "../../../../../../../../blimpx.typing";

interface IHueSliderProps {
    color: IHSLObject;
    onChange: IBlimpPropsOnChange;
}

export function HueSlider(props: IHueSliderProps) {
    const {color, onChange} = props;
    const refSlide = useRef<HTMLDivElement>(null)
    const [x, setX] = useState(0)

    const linearGradient = useMemo(() => {
        let linear = "linear-gradient(to right, ";
        [...new Array(360)].map((_c, idx) => {
            linear += `hsl(${idx + 1}, 100%, 50%),`
        })
        return `${linear.slice(0, linear.length - 1)})`;
    }, []);

    const onMouseColorDown = useCallback((evt: MouseEvent<HTMLDivElement>) => {
        if (!refSlide.current) return;
        const boundingRect = refSlide.current!.getBoundingClientRect()
        const newX = evt.clientX - boundingRect.x
        setX(newX)
        onChange(getRGBString(toHSLinRGB({
            Hue: `${(360 - (newX * 2)) / 360}`,
            Saturate: `${Number(color.Saturate.replace("%", "")) / 100}`,
            Lightning: `${Number(color.Lightning.replace("%", "")) / 100}`
        })))
    }, [])

    useEffect(() => {
        if (!refSlide.current) return
        setX((Number(color.Hue) / 2))
    }, [])

    return (<div onMouseDown={onMouseColorDown} ref={refSlide} className="hue-slider-container"
                 style={{background: linearGradient}}>
        <div className="picker-pointer-hue" style={{left: x}}/>
    </div>)
}