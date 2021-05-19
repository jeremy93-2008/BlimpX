import React, { useCallback, useMemo, useRef, useState } from "react";
import {FaTimes} from "react-icons/fa";
import {HueSlider} from "./component/hueSlider";
import {ChromaPicker} from "./component/chromaPicker";

import "./color.scss";
import {getRGBObject, IHSLObject, toRGBinHSL} from "../../../../../../util/color";
import {IBlimpPropsOnChange} from "../../../../../../blimpx.typing";

interface IColorProps {
    value?: string;
    disabled?: boolean;
    onChange: IBlimpPropsOnChange;
}

export function ColorInput(props: IColorProps) {
    const {value: defaultValue, disabled, onChange} = props;
    const refColorButton = useRef<HTMLDivElement>(null);
    const [isVisible, setVisible] = useState(false);
    const [value, setValue] = useState(defaultValue ? defaultValue : "rgb(0, 0, 0)");

    const topStyle = useMemo(() => {
        return refColorButton.current ?
            refColorButton.current.getBoundingClientRect().top : 0
    }, [isVisible])

    const HSLColor: IHSLObject = useMemo(() => {
        const rgbObject = getRGBObject(value);
        return toRGBinHSL(rgbObject);
    }, [props])

    const onModalColorClick = useCallback(() => {
        setVisible(!isVisible)
    }, [isVisible])

    return (
        <div className="color-input-container">
            <div ref={refColorButton}
                 onClick={onModalColorClick}
                 className="color-selected-input"
                 style={{background: value}}/>
            {isVisible &&
            <div className="color-modal-container"
                 style={{top: topStyle}}>
                <div className="header-color-modal-container">
                    <div className="title-color-modal-container">Solid Color</div>
                    <FaTimes onClick={() => setVisible(false)} />
                </div>
                <ChromaPicker color={HSLColor} onChange={onChange} />
                <HueSlider color={HSLColor} onChange={onChange} />
            </div>}
        </div>
    )
}