import React, {useCallback, useRef, useState} from "react";

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
    const refColorModal = useRef<HTMLDivElement>(null);
    const [isVisible, setVisible] = useState(false);
    const [value, setValue] = useState(defaultValue ? defaultValue : "rgb(0, 0, 0)");

    const onColorClick = useCallback(() => {
        setVisible(true)
    }, [])

    return (
        <div className="color-input-container">
            <div onClick={onColorClick} className="color-selected-input" style={{background: value}}/>
            {isVisible && <div ref={refColorModal} className="color-modal-container" style={{top: refColorModal.current ? refColorModal.current.clientTop : 0}}>
                <ChromaPicker color={value}/>
                <HueSlider x={0}/>
                <SaturateSlider x={0} color={value}/>
            </div>}
        </div>
    )
}