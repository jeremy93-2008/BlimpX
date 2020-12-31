import React, {useReducer} from "react";
import {IBlimpXAction} from "./blimpx.typing";

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
                    <h1>BlimpX</h1>
                </div>
            </BlimpContext.Provider>);
}