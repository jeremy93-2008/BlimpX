import React, {useCallback, useState} from "react";
import {FaEye, FaEyeSlash, FaLock, FaLockOpen} from "react-icons/fa";
import {ColorIcon} from "../colorIcon";
import {noop} from "../noop";

import "./frameOptions.scss";

interface IHeaderFramesOptionsProps {
    onVisibility: (value: boolean) => boolean;
    onLock: (value: boolean) => boolean;
    onColor?: (value: string) => string
}

export function FrameOptions(props: IHeaderFramesOptionsProps) {
    const {onColor, onVisibility, onLock} = props;
    const [option, setOption] = useState({
        visible: true,
        lock: false,
        color: "white"
    })

    const Eye = option.visible ? FaEye : FaEyeSlash;
    const Lock = option.lock ? FaLock : FaLockOpen;

    const onChange = useCallback(
        <T extends unknown>(
            callback: (val: T) => T | void,
            key: "visible" | "lock" | "color",
            param: T) => {
        return () => {
            let newOption = {...option}
            const result = callback(param);
            if(result == undefined) return
            newOption[key] = callback(param) as never
            setOption(newOption)
        };
    }, [])

    return (
        <>
            <Eye className="frame-option" onClick={onChange<boolean>(onVisibility, "visible", option.visible)} />
            <Lock className="frame-option" onClick={onChange<boolean>(onLock, "lock", option.lock)} />
            <ColorIcon className="frame-option" onClick={onChange<string>(onColor ? onColor : noop, "color", option.color)} color={option.color} />
        </>
    )
}