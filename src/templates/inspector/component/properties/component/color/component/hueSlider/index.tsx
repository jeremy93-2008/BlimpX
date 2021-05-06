import React, {useCallback, useMemo, useState} from "react";
import {IHSLObject} from "@source/util/color";

interface IHueSliderProps {
    color: IHSLObject;
}

export function HueSlider(props: IHueSliderProps) {
    const { color } = props;

    const linearGradient = useMemo(() => {
        let linear = "linear-gradient(to right, ";
        [...new Array(360)].map((_c, idx) => {
            linear += `hsl(${idx + 1}, 100%, 50%),`
        })
        return `${linear.slice(0, linear.length - 1)})`;
    }, []);

    return (<div className="hue-slider-container" style={{background: linearGradient}}>
        <div className="picker-pointer-hue" style={{marginLeft: 0}} />
    </div>)
}