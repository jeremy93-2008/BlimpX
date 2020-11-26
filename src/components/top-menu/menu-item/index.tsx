import React from "react";
import { IMenuItemDropdown, MenuDropdown } from "../menu-dropdown";

export interface IMenuItem {
    text: string;
    items: IMenuItemDropdown[]
}

export function MenuItem(props: IMenuItem) {
    const { text, items } = props;
    return (<div className="menu-item">
        <span className="menu-text">{text}</span>
        <MenuDropdown items={items}></MenuDropdown>
    </div>)
}