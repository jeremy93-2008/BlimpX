import React, {ChangeEvent, useCallback, useEffect, useRef, useState} from "react";

import "./size.scss";

interface ISizeInputProps {
    value?: string;
    disabled?: boolean;
    onChange?: (newValue: string) => void;
    metrics?: string[];
}

export function SizeInput(props: ISizeInputProps) {
    const {value: defaultValue, onChange, disabled} = props;
    const inputMetrics = props.metrics ?? ["px", "%", "vw", "vh", "em"];
    const refSelectMetric = useRef<HTMLSelectElement>(null)
    const [value, setValue] = useState(defaultValue);

    const onChangeSize = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        if (!refSelectMetric.current && inputMetrics.length > 1) return;
        setValue(evt.target.value)
        onChange && onChange(evt.target.value + refSelectMetric.current!.value)
    }, [props]);

    useEffect(() => {
        setValue(defaultValue)
    }, [props])

    return (<div className={`size-input-container ${disabled ? "disabled" : ""}`}>
        <input type="number" className="size-input-text" value={value} onChange={onChangeSize}/>
        {inputMetrics.length > 1 && <select ref={refSelectMetric} className="size-input-select">
            {inputMetrics.map(metric => <option value={metric}>{metric}</option>)}
        </select>}
        {inputMetrics.length == 1 && <span className="size-input-label">
            {inputMetrics[0]}
        </span>}
    </div>)
}