import React from "react";

interface IColorIconProps {
    color: string;
}

export function ColorIcon(props: IColorIconProps) {
    const { color } = props;
    return (
        <div className="coloricon-container"
             style={{
                 backgroundColor: color,
                 height: 16,
                 width: 8
             }} />
    )
}