import React from "react";
import {IBlimpTabsInspector} from "@source/blimpx.typing";

import "./tab.scss";

interface ITabInspectorProps {
    tabs: IBlimpTabsInspector[];
    activeTabId: string;
    onTabHeaderClick: (activeTabId: string) => void;
}

export function TabInspector(props: ITabInspectorProps) {
    const {tabs, activeTabId, onTabHeaderClick} = props;
    return (
        <div className="tab-inspector-container">
            {tabs.map(tab =>
                <div onClick={() => onTabHeaderClick(tab.id)}
                     className={`tab-inspector-header ${tab.id !== activeTabId ? "disabled" : ""}`}
                >
                    {tab.title}
                </div>)
            }
        </div>
    );
}