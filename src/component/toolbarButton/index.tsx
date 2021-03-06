import React from "react";
import {IconType} from "react-icons";

import "./toolbarButton.scss";

export interface IToolbarButton {
    icon: IconType;
    label: string;
    isActive?: boolean;
    size?: number;
    gap?: number;
    onClick?: () => void;
}

export function ToolbarButton(props: IToolbarButton) {
    return (
        <div onClick={props.onClick} className={`toolbar-button ${props.isActive ? "active" : ""}`}
             style={!!props.gap ? {margin: `0 ${props.gap}px`} : {}}>
            <div title={props.label} className="icon-button">
                <props.icon color={"white"} size={props.size || 24}/>
            </div>
        </div>
    );
}