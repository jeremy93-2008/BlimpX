import React from "react";
import {FaCaretDown} from "react-icons/fa";

import "./caret.scss";

interface ICollapsableArrowProps {
    isCollapsable: boolean;
    onClick: () => void;
}

export function CollapsableArrow(props: ICollapsableArrowProps) {
    const {isCollapsable, onClick} = props;
    return <div onClick={onClick} className="collapsable-container">
        <FaCaretDown className={isCollapsable ? "collapsed" : ""}/>
    </div>
}