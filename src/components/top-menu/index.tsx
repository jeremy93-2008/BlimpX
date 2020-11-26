import React from "react";
import { IMenuItem, MenuItem } from "./menu-item";

interface ITopMenu {
    items: IMenuItem[]
}

export function TopMenu(props: ITopMenu) {
    const { items } = props;
    return (<div className="top-menu">
        {items.map(item => <MenuItem text={item.text} items={item.items}></MenuItem>)}
    </div>)
}