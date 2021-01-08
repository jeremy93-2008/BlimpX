import React from "react";
import "./container.scss";

interface IContainerProps {
    children: JSX.Element | JSX.Element[] | string;
}

export function Container(props: IContainerProps) {
    const { children } = props;
    return (
        <div className="main-container">
            {children}
        </div>
    )
}