import React, {useCallback, useMemo, useState} from "react";
import {TabInspector} from "./component/tab";

import "./inspector.scss";
import {IBlimpTabsInspector} from "@source/blimpx.typing";
import {ContentInspector} from "./component/content";

export function Inspector() {
    const [activeTabId, setActiveTabId] = useState("props")

    const TabsContent: IBlimpTabsInspector[] = useMemo(() => {
        return [
            {
                id: "props",
                title: "Properties",
                content: <div>Properties</div>,
            },
            {
                id: "documents",
                title: "Document",
                content: <div>Document</div>
            },
            {
                id: "scheme",
                title: "Scheme",
                content: <div>Scheme</div>
            }
        ]
    }, [])

    const onTabHeaderClick = useCallback((activeTabId: string) => {
        setActiveTabId(activeTabId)
    }, [])

    return (
        <div className="inspector-container">
            <TabInspector tabs={TabsContent}
                          activeTabId={activeTabId}
                          onTabHeaderClick={onTabHeaderClick}
            />
            <ContentInspector activeTab={TabsContent.find(tab => tab.id == activeTabId)!}/>
        </div>
    )
}