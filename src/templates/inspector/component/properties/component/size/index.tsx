import React, {ChangeEvent, useCallback, useState} from "react";

import "./size.scss";

interface ISizeInputProps {
    value?: string;
    disabled?: boolean
    onChange?: (newValue: string) => void;
}

export function SizeInput(props: ISizeInputProps) {
    const {value: defaultValue, onChange, disabled} = props;
    const [value, setValue] = useState(defaultValue);

    const onChangeSize = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        setValue(evt.target.value)
        onChange && onChange(evt.target.value)
    }, [props]);

    return (<div className={`size-input-container ${disabled ? "disabled" : ""}`}>
        <input type="text" className="size-input-text" value={value} onChange={onChangeSize} />
        <select className="size-input-select">
            {["px", "%", "vw", "vh", "em"].map(metric => <option value={metric}>{metric}</option>)}
        </select>
    </div>)
}