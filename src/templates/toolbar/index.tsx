import React from "react";
import "./toolbar.scss";
import {FaMousePointer, FaRegSquare, FaRegCircle, FaFont, FaImage, FaPenNib} from "react-icons/fa";
import {IToolbarButton, ToolbarButton} from "../../component/toolbarButton";
import {UserButton} from "../../component/userButton";

export const toolbarData: IToolbarButton[] = [
    {
        label: "Select Element",
        icon: FaMousePointer
    },
    {
        label: "Create Rectangle",
        icon: FaRegSquare
    },
    {
        label: "Create Circle",
        icon: FaRegCircle
    },
    {
        label: "Create Path",
        icon: FaPenNib
    },
    {
        label: "Create Text",
        icon: FaFont
    },
    {
        label: "Create Image",
        icon: FaImage
    }
];

export function Toolbar() {
    return (
        <div className="header-container">
            <div className="toolbar-container">
                {toolbarData.map(({label, icon}) =>
                    <ToolbarButton icon={icon} label={label} />
                )}
            </div>
            <UserButton />
        </div>

    )
}