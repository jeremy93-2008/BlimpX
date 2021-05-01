import React, {useMemo} from "react";
import {getRGBObject, transformRGBINHSL} from "../../../../../../../../util/color";

interface ISaturateProps {
    x: number;
    color: string
}

export function SaturateSlider(props: ISaturateProps) {
    const {x, color} = props;

    const rgbColor = getRGBObject(color);
    const hueColor = transformRGBINHSL(rgbColor);

    const linearGradient = useMemo(() => {
        let linear = "linear-gradient(to right, ";
        [...new Array(100)].map((_c, idx) => {
            linear += `hsl(${hueColor.Hue}, ${idx + 1}%, ${hueColor.Lightning}),`
        })
        return `${linear.slice(0, linear.length - 1)})`;
    }, []);

    return (<div className="saturate-slider-container" style={{background: linearGradient}}/>)
}