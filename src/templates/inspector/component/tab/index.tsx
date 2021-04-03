import React from "react";
import {IBlimpTabsInspector} from "@source/blimpx.typing";

import "./tab.scss";

interface ITabInspectorProps {
    tabs: IBlimpTabsInspector[]
}

export function TabInspector(props: ITabInspectorProps) {
    const {tabs} = props;
    return (
        <div className="tab-inspector-container">
            {tabs.map(tab => <div
                className={`tab-inspector-header ${!tab.active ? "disabled" : ""}`}>{tab.title}</div>)}
        </div>
    );
}