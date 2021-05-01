import React, {useMemo} from "react";

interface IHueSliderProps {
    x: number;
}

export function HueSlider(props: IHueSliderProps) {
    const {x} = props;
    const linearGradient = useMemo(() => {
        let linear = "linear-gradient(to right, ";
        [...new Array(360)].map((_c, idx) => {
            linear += `hsl(${idx + 1}, 100%, 50%),`
        })
        return `${linear.slice(0, linear.length - 1)})`;
    }, []);

    console.log(linearGradient)

    return (<div className="hue-slider-container" style={{background: linearGradient}}/>)
}