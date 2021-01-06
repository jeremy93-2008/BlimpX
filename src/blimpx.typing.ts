export interface IBlimpXAction {
    type: "setUser" | "setFolder" | "setFrames" |
        "setTimeline" | "setName" | "setFps";
    state: Partial<IBlimpXState>;
}

export interface IBlimpXState {
    _id: string;
    name: string;
    frames: IBlimpTimeline[];
    folders: IBlimpFolder[];
    timeline: any;
    fps: number;
    user: IBlimpUser;
}

export interface IBlimpTimeline {
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
}

export interface IBlimpUser {
    name: string;
    imageURL: string;
}