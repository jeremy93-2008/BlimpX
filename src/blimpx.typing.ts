export interface IBlimpXAction {
    type: "setUser" | "setLayer" |
        "setTimeline" | "setName" | "setFps" | "setCurrentFrame";
    state: Partial<IBlimpXState>;
}

export interface IBlimpXState {
    _id: string;
    name: string;
    currentFrame: number;
    currentLayer: string;
    layers: IBlimpLayer[];
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
    timer: number;
    maxTimer: number;
    selectedElements: { id: number }[];
}

export type IBlimpObjectType = "Rectangle" | "Circle" |
    "Path" | "Image" | "Text";

export interface IBlimpLayer {
    _id: string;
    name: string;
    color: string;
    isHide: boolean;
    isLock: boolean
    objects: IBlimpObject[]
}

export interface IBlimpObject {
    _id: string;
    type: IBlimpObjectType;
    frames: IBlimpFrame[]
}

export interface IBlimpFrame {
    _id: string;
    frame: number;
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

export interface IBlimpUser {
    name: string;
    imageURL: string;
}