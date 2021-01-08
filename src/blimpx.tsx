import React, { useReducer } from "react";
import {Toolbar} from "./templates/toolbar";
import {Container} from "./templates/container";
import {Canvas} from "./templates/canvas";
import {Inspector} from "./templates/inspector";
import {Timeline} from "./templates/timeline";

import {blimpActions, blimpStore} from "./blimpStore";

import "./blimpx.scss";

export const BlimpContext = React.createContext<any>(blimpStore);

export function BlimpX() {
    const [store, setBlimpStore] = useReducer(blimpActions, blimpStore)

    return (
            <BlimpContext.Provider value={[store, setBlimpStore]}>
                <div className="blimpx-container">
                    <Toolbar/>
                    <Container>
                        <Canvas />
                        <Inspector />
                    </Container>
                    <Timeline />
                </div>
            </BlimpContext.Provider>);
}