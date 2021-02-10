import { v4 as uuidv4 } from 'uuid';
import {IBlimpLayer} from "../src/blimpx.typing";

export const mockLayers: IBlimpLayer[] = [
    {
        _id: uuidv4(),
        name: "Layer 1",
        color: "red",
        isHide: false,
        isLock: false,
        objects: [
            {
                _id: uuidv4(),
                type: "Rectangle",
                frames: [
                    {
                        _id: uuidv4(),
                        frame: 0,
                        params: {
                            x: 50,
                            y: 50,
                            width: 250,
                            height: 150
                        }
                    },
                    {
                        _id: uuidv4(),
                        frame: 1,
                        params: {
                            x: 55,
                            y: 55,
                            width: 250,
                            height: 150
                        }
                    }
                ]
            }
        ]
    },
    {
        _id: uuidv4(),
        name: "Layer 2",
        color: "green",
        isHide: false,
        isLock: false,
        objects: [
            {
                _id: uuidv4(),
                type: "Circle",
                frames: [
                    {
                        _id: uuidv4(),
                        frame: 0,
                        params: {
                            x: 150,
                            y: 80,
                            width: 100
                        }
                    },
                    {
                        _id: uuidv4(),
                        frame: 1,
                        params: {
                            x: 150,
                            y: 100,
                            width: 100
                        }
                    }
                ]
            }
        ]
    }
];