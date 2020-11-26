import React from "react";
import { observer, Observer, useLocalObservable } from "mobx-react";
import { TopMenu } from "./components/top-menu";
import { IMenuItem } from "./components/top-menu/menu-item";

interface IBlimpXStore {
    menu: {
        items: IMenuItem[],
        onClick: () => void;
    }
}

export const BlimpContext = React.createContext<IBlimpXStore | null>(null);

export function BlimpX() {
    const store = useLocalObservable<IBlimpXStore>(() => ({
        menu: {
            items:[
                {
                    text: "Archivo",
                    items: []
                },
                {
                    text: "Edición",
                    items: []
                }
            ],
            onClick: () => {
                store.menu.items.push({text: "Hola", items:[]})
            }
        }
    }));

    return (
            <BlimpContext.Provider value={store}>
                <div className="blimpx-container">
                    <button onClick={() => store.menu.onClick()}>hey</button>
                    <TopMenu items={store.menu.items}></TopMenu>
                </div>
            </BlimpContext.Provider>);
}