export interface IBlimpXAction {
    type: "setUser" | "setLayer" |
        "setTimeline" | "setName" | "setFps" | "setCurrentFrame";
    state: Partial<IBlimpState>;
}

export interface IBlimpState {
    _id: string;
    name: string;
    currentFrame: number;
    currentLayer: number;
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
    maxTimeline: number;
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
    params: IBlimpParams
}

export interface IBlimpParams {
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

export interface IBlimpObjectRender {
    _id: string;
    type: IBlimpObjectType;
    frames: {
        currentFrame: IBlimpFrame,
        nextFrames?: IBlimpFrame
    }
}

export interface IBlimpUser {
    name: string;
    imageURL: string;
}