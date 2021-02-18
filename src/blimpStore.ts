import { v4 as uuidv4 } from 'uuid';
import {IBlimpXAction, IBlimpState} from "./blimpx.typing";
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
            y: 0
        },
        onionLayersShown: 2,
        timer: 0,
        maxTimer: 0,
        maxTimeline: 2880,
        selectedElements: [],
        zoom: 0
    },
    fps: 24,
    user: {
        name: "",
        imageURL: ""
    }
};

export const blimpActions = (state: IBlimpState, action: IBlimpXAction): IBlimpState => {
    switch(action.type) {
        case "setName":
            return {...state, name: action.state.name!};
        case "setUser":
            return {...state, user: action.state.user!};
        case "setFps":
            return {...state, fps: action.state.fps!};
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