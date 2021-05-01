import React, {useCallback, useState} from "react";

import "./color.scss";
import {HueSlider} from "./component/hueSlider";
import {ChromaPicker} from "./component/chromaPicker";
import {SaturateSlider} from "./component/saturateSlider";

interface IColorProps {
    value?: string;
    disabled?: boolean;
    onChange?: (newValue: string) => void;
}

export function ColorInput(props: IColorProps) {
    const {value: defaultValue, disabled, onChange} = props;
    const [isVisible, setVisible] = useState(false);
    const [value, setValue] = useState(defaultValue ? defaultValue : "black");

    const onColorClick = useCallback(() => {
        setVisible(true)
    }, [])

    console.log(value)

    return (
        <div className="color-input-container">
            <div onClick={onColorClick} className="color-selected-input" style={{background: value}}/>
            {isVisible && <div className="color-modal-container">
                <ChromaPicker color={value}/>
                <HueSlider x={0}/>
                <SaturateSlider x={0} color={value}/>
            </div>}
        </div>
    )
}