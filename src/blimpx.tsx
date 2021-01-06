import React, { useReducer } from "react";
import {Toolbar} from "./templates/toolbar";
import {blimpActions, blimpStore} from "./blimpStore";

import "./blimpx.scss";

export const BlimpContext = React.createContext<any>(blimpStore);

export function BlimpX() {
    const [store, setBlimpStore] = useReducer(blimpActions, blimpStore)

    return (
            <BlimpContext.Provider value={[store, setBlimpStore]}>
                <div className="blimpx-container">
                    <Toolbar/>
                </div>
            </BlimpContext.Provider>);
}