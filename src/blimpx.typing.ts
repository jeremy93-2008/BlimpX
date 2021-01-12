export interface IBlimpXAction {
    type: "setUser" | "setFolder" | "setFrames" |
        "setTimeline" | "setName" | "setFps" | "setCurrentFrame";
    state: Partial<IBlimpXState>;
}

export interface IBlimpXState {
    _id: string;
    name: string;
    currentFrame: number;
    frames: IBlimpFrame[];
    folders: IBlimpFolder[];
    timeline: IBlimpTimeline;
    fps: number;
    user: IBlimpUser;
}

export type IScrollTimeline = {
    x: number;
    y: number;
};

export interface IBlimpTimeline {
    zoom: number;
    scroll: IScrollTimeline;
    selectedElements: { id: number }[];
}

export interface IBlimpFrame {
    _id: string;
    name: string;
    frame: number;
    objects: IBlimpObject[];
    _idFolder?: string;
}

export type IBlimpObjectType = "Rectangle" | "Circle" |
    "Path" | "Image" | "Text";

export interface IBlimpObject {
    type: IBlimpObjectType;
    params: {
        x: number | number[];
        y: number | number[];
        label?: string;
        fontSize?: number;
        path?: { x: number, y: number, radius?: number }[];
        source?: string;
        width?: number;
        height?: number;
        style?: any;
    }
}

export interface IBlimpFolder {
    _id: string;
    name: string;
    color: string;
    open: boolean;
}

export interface IBlimpUser {
    name: string;
    imageURL: string;
}