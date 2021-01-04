import React, { useReducer } from "react";
import { IBlimpXAction} from "./blimpx.typing";
import {Toolbar} from "./templates/toolbar";

import "./blimpx.scss";

const blimpStore = {};

export const BlimpContext = React.createContext<any>(blimpStore);

export function BlimpX() {
    const [store, setBlimpStore] = useReducer((state: any, action: IBlimpXAction) => {
        switch(action.type) {
            default:
                return state;
        }
    }, blimpStore)

    return (
            <BlimpContext.Provider value={[store, setBlimpStore]}>
                <div className="blimpx-container">
                    <Toolbar/>
                </div>
            </BlimpContext.Provider>);
}