import React from "react";
import { isTemplateSpan } from "typescript";

export interface IMenuItemDropdown {
    key: string;
    value: string;
    separator: boolean;
    children: IMenuItemDropdown[];
    onClick: () => void;
}

interface IMenuDropdown {
    items: IMenuItemDropdown[]
}

export function MenuDropdown(props: IMenuDropdown) {
    const { items } = props;
    return (<div className="menu-dropdown">
        <ul className="dropdown-list">
            {items.map(item => {
                <li onClick={item.onClick} key={item.key} className="dropdown-item">{item.value}</li>
                {item.children && <MenuDropdown items={item.children}></MenuDropdown>}
            })}
        </ul>
    </div>);
}