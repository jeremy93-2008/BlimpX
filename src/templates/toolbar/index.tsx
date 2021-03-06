import React, {useContext, useMemo} from "react";
import "./toolbar.scss";
import {FaFont, FaImage, FaMousePointer, FaPenNib, FaRegCircle, FaRegSquare} from "react-icons/fa";
import {IToolbarButton, ToolbarButton} from "../../component/toolbarButton";
import {UserButton} from "../../component/userButton";
import {BlimpContext} from "../../blimpx";

export function Toolbar() {
    const [store] = useContext(BlimpContext)

    const toolbarData: IToolbarButton[] = useMemo(() => [
        {
            label: "Select Element",
            isActive: store.mode == "Default",
            icon: FaMousePointer
        },
        {
            label: "Create Rectangle",
            isActive: store.mode == "Rectangle",
            icon: FaRegSquare
        },
        {
            label: "Create Circle",
            isActive: store.mode == "Circle",
            icon: FaRegCircle
        },
        {
            label: "Create Path",
            isActive: store.mode == "Path",
            icon: FaPenNib
        },
        {
            label: "Create Text",
            isActive: store.mode == "Text",
            icon: FaFont
        },
        {
            label: "Create Image",
            isActive: store.mode == "Image",
            icon: FaImage
        }
    ], [store]);

    return (
        <div className="header-container">
            <div className="toolbar-container">
                {toolbarData.map(({label, isActive, icon}) =>
                    <ToolbarButton key={label} icon={icon} label={label} isActive={isActive}/>
                )}
            </div>
            <UserButton/>
        </div>

    )
}