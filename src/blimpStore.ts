import { v4 as uuidv4 } from 'uuid';
import {IBlimpXAction, IBlimpXState} from "./blimpx.typing";

export const blimpStore: IBlimpXState = {
    _id: uuidv4(),
    name: "Untitled",
    currentFrame: 0,
    currentLayer: "",
    layers: [],
    timeline: {
        scroll: {
            x: 0,
            y: 0
        },
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

export const blimpActions = (state: IBlimpXState, action: IBlimpXAction): IBlimpXState => {
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