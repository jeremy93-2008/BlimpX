import React, {useMemo} from "react";
import {TabInspector} from "./component/tab";

import "./inspector.scss";
import {IBlimpTabsInspector} from "@source/blimpx.typing";

export function Inspector() {
    const TabsContent: IBlimpTabsInspector[] = useMemo(() => {
        return [
            {
                title: "Properties",
                content: <div>Properties</div>,
                active: true
            },
            {
                title: "Document",
                content: <div>Document</div>,
                active: false
            },
            {
                title: "Scheme",
                content: <div>Scheme</div>,
                active: false
            }
        ]
    }, [])
    return (
        <div className="inspector-container">
            <TabInspector tabs={TabsContent}/>
        </div>
    )
}