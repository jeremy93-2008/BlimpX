import React, {useMemo} from "react";
import {getHSLObject} from "../../../../../../../../util/color";

interface ISaturateProps {
    x: number;
    color: string
}

export function SaturateSlider(props: ISaturateProps) {
    const {x, color} = props;

    const hslColor = getHSLObject(color);

    const linearGradient = useMemo(() => {
        let linear = "linear-gradient(to right, ";
        [...new Array(100)].map((_c, idx) => {
            linear += `hsl(${hslColor.Hue}, ${idx + 1}%, 50%),`
        })
        return `${linear.slice(0, linear.length - 1)})`;
    }, []);

    console.log(hslColor)


    return (<div className="saturate-slider-container" style={{background: linearGradient}}/>)
}