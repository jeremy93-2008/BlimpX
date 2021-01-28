import React from "react";

interface IColorIconProps {
    color: string;
    className?: string;
    onClick?: (value: string) => void;
}

export function ColorIcon(props: IColorIconProps) {
    const { color, className, onClick } = props;
    return (
        <div className={`coloricon-container ${className}`}
             onClick={() => onClick && onClick(color)}
             style={{
                 display: "inline-block",
                 backgroundColor: color,
                 height: 16,
                 width: 8
             }} />
    )
}