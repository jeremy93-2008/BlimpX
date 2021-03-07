import React, {useCallback, useContext, useMemo} from "react";
import "./toolbar.scss";
import {FaFont, FaImage, FaMousePointer, FaPenNib, FaRegCircle, FaRegSquare} from "react-icons/fa";
import {IToolbarButton, ToolbarButton} from "../../component/toolbarButton";
import {UserButton} from "../../component/userButton";
import {BlimpContext} from "../../blimpx";
import {IBlimpMode} from "../../blimpx.typing";

export function Toolbar() {
    const [store, setStore] = useContext(BlimpContext)

    const onClickToolbarButton = useCallback((mode: IBlimpMode) => {
        setStore({
            type: "setMode",
            state: {...store, mode}
        })
    }, [store])

    const toolbarData: IToolbarButton[] = useMemo(() => [
        {
            label: "Select Element",
            isActive: store.mode == "Default",
            icon: FaMousePointer,
            onClick: () => onClickToolbarButton("Default")
        },
        {
            label: "Create Rectangle",
            isActive: store.mode == "Rectangle",
            icon: FaRegSquare,
            onClick: () => onClickToolbarButton("Rectangle")
        },
        {
            label: "Create Circle",
            isActive: store.mode == "Circle",
            icon: FaRegCircle,
            onClick: () => onClickToolbarButton("Circle")
        },
        {
            label: "Create Path",
            isActive: store.mode == "Path",
            icon: FaPenNib,
            onClick: () => onClickToolbarButton("Path")
        },
        {
            label: "Create Text",
            isActive: store.mode == "Text",
            icon: FaFont,
            onClick: () => onClickToolbarButton("Text")
        },
        {
            label: "Create Image",
            isActive: store.mode == "Image",
            icon: FaImage,
            onClick: () => onClickToolbarButton("Image")
        }
    ], [store]);

    return (
        <div className="header-container">
            <div className="toolbar-container">
                {toolbarData.map(({label, isActive, icon, onClick}) =>
                    <ToolbarButton key={label} icon={icon} label={label} isActive={isActive} onClick={onClick}/>
                )}
            </div>
            <UserButton/>
        </div>

    )
}