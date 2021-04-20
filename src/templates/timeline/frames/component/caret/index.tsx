import React from "react";
import {FaCaretRight} from "react-icons/fa";

import "./caret.scss";

interface ICollapsableArrowProps {
    isCollapsable: boolean;
    onClick: (isCollapsable: boolean) => void;
}

export function CollapsableArrow(props: ICollapsableArrowProps) {
    const {isCollapsable, onClick} = props;
    return <div className="collapsable-container">
        <FaCaretRight/>
    </div>
}