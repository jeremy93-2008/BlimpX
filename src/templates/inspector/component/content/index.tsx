import React from "react";
import {IBlimpTabsInspector} from "@source/blimpx.typing";

import "./content.scss";

interface IContentInspectorProps {
    activeTab: IBlimpTabsInspector
}

export function ContentInspector(props: IContentInspectorProps) {
    const {activeTab} = props;
    return <div className="content-inspector-container">
        {activeTab.content}
    </div>;
}