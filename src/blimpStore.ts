import { v4 as uuidv4 } from 'uuid';
import {IBlimpXAction, IBlimpXState} from "./blimpx.typing";

export const blimpStore: IBlimpXState = {
    _id: uuidv4(),
    name: "Untitled",
    frames: [],
    folders: [],
    timeline: {},
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
        case "setFolder":
            return {...state, folders: action.state.folders!};
        case "setFrames":
            return {...state, frames: action.state.frames!};
        case "setTimeline":
            return {...state, timeline: action.state.timeline!};
        default:
            return state;
    }
};