import {CircleConfig} from "konva/types/shapes/Circle";
import {RectConfig} from "konva/types/shapes/Rect";
import {ImageConfig} from "konva/types/shapes/Image";
import {TextConfig} from "konva/types/shapes/Text";
import {PathConfig} from "konva/types/shapes/Path";

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
    frameWidth: number;
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
    onionLayersShown: number;
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

export type IBlimpParams = Partial<IKonvaParams>

export type IKonvaParams = RectConfig & CircleConfig & ImageConfig & TextConfig & PathConfig;

export interface IBlimpObjectRender {
    _id: string;
    type: IBlimpObjectType;
    frames: {
        currentFrame?: IBlimpFrame,
        nextFrames?: IBlimpFrame[]
    }
}

export interface IBlimpUser {
    name: string;
    imageURL: string;
}