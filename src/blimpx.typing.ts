import {CircleConfig} from "konva/types/shapes/Circle";
import {RectConfig} from "konva/types/shapes/Rect";
import {ImageConfig} from "konva/types/shapes/Image";
import {TextConfig} from "konva/types/shapes/Text";
import {PathConfig} from "konva/types/shapes/Path";

export interface IBlimpXAction {
    type: "setUser" | "setLayer" | "setPlaying" |
        "setTimeline" | "setName" | "setFps" |
        "setCurrentFrame" | "setMode" | "setCurrentObject" | "setCurrentLayer";
    state: Partial<IBlimpState>;
}

export interface IBlimpState {
    _id: string;
    name: string;
    currentFrame: number;
    currentObject: string | null;
    currentLayer: number;
    frameWidth: number;
    layers: IBlimpLayer[];
    timeline: IBlimpTimeline;
    isPlaying: boolean;
    fps: number;
    mode: IBlimpMode;
    user: IBlimpUser;
}

export type IScrollTimeline = {
    x: number;
    xFrame: number;
    y: number;
    yFrame: number;
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
    "Path" | "Image" | "Text" | "Bezier" | "Brush";

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

export type IBlimpParams = Partial<IKonvaParams> & { radius: number }

export type IKonvaParams = RectConfig & CircleConfig & ImageConfig & TextConfig & PathConfig;

export interface IBlimpObjectRender {
    _id: string;
    type: IBlimpObjectType;
    frames: {
        currentFrame?: IBlimpFrame,
        nextFrames?: IBlimpFrame[]
    }
}

export interface IBlimpFrameWithCurrentFrame extends IBlimpFrame {
    type: IBlimpObjectType;
    frames: IBlimpFrame[];
}

export type IBlimpMode = "Default" | IBlimpObjectType;

export interface IBlimpUser {
    name: string;
    imageURL: string;
}

export interface IBlimpTabsInspector {
    id: string;
    title: string;
    content: JSX.Element
}

export type IBlimpPropsOnChange = (newValue: any | any[]) => void

export interface IBlimpPropsInspector {
    propName: string | string[];
    header: string | JSX.Element;
    type: "text" | "number" | "custom";
    disabled?: boolean;
    value?: any | any[];
    custom?: (props: IBlimpPropsInspector, onChange: IBlimpPropsOnChange) => JSX.Element;
    pattern?: RegExp;
}