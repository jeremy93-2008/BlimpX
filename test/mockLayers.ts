import { v4 as uuidv4 } from 'uuid';
import {IBlimpLayer} from "../src/blimpx.typing";

export const mockLayers: IBlimpLayer[] = [
    {
        _id: uuidv4(),
        name: "",
        color: "",
        isHide: false,
        isLock: false,
        objects: []
    }
];