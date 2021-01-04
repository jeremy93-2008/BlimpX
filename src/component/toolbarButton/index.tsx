import React from "react";
import { IconType } from "react-icons";

import "./toolbarButton.scss";

export interface IToolbarButton {
    icon: IconType;
    label: string;
}

export function ToolbarButton(props: IToolbarButton) {
    return (
      <div className="toolbar-button">
          <div title={props.label} className="icon-button">
              <props.icon color={"white"} size={24} />
          </div>
      </div>
    );
}