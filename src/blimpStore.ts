import {v4 as uuidv4} from 'uuid';
import {IBlimpState, IBlimpXAction} from "./blimpx.typing";
import {mockLayers} from "../test/mockLayers";

export const blimpStore: IBlimpState = {
    _id: uuidv4(),
    name: "Untitled",
    currentFrame: 0,
    currentLayer: 0,
    frameWidth: 11,
    layers: (process.env.NODE_ENV) ? mockLayers : [],
    timeline: {
        scroll: {
            x: 0,
            xFrame: 0,
            y: 0,
            yFrame: 0
        },
        onionLayersShown: 2,
        timer: 0,
        maxTimer: 0,
        maxTimeline: 2880,
        selectedElements: [],
        zoom: 0
    },
    isPlaying: false,
    fps: 24,
    mode: "Default",
    user: {
        name: "",
        imageURL: ""
    }
};

export const blimpActions = (state: IBlimpState, action: IBlimpXAction): IBlimpState => {
    switch (action.type) {
        case "setName":
            return {...state, name: action.state.name!};
        case "setUser":
            return {...state, user: action.state.user!};
        case "setFps":
            return {...state, fps: action.state.fps!};
        case "setPlaying":
            return {...state, isPlaying: action.state.isPlaying!};
        case "setMode":
            return {...state, mode: action.state.mode!};
        case "setCurrentFrame":
            return {...state, currentFrame: action.state.currentFrame!};
        case "setLayer":
            return {...state, layers: action.state.layers!};
        case "setTimeline":
            return {...state, timeline: action.state.timeline!};
        default:
            return state;
    }
};