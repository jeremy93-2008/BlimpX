import React, {useCallback, useContext} from "react";
import {Layer, Stage, Text} from "react-konva";

import "./stage.scss";
import {BlimpContext} from "../../../blimpx";
import {IBlimpObjectRender} from "../../../blimpx.typing";

interface IBlimpStageProps {
    width: number;
    height:  number;
}

export function BlimpStage(props: IBlimpStageProps) {
    const { width, height } = props;
    const [ store ] = useContext(BlimpContext)

    const getObjectsByFrame = useCallback((frame: number) => {
        return store.layers.map((layer) => {
            return layer.objects.map((obj): IBlimpObjectRender | null => {
                const frameObj = obj.frames.find(f => f.frame == frame)
                if(!frameObj) return null;
                return {...obj, frame: frameObj}
            })
        }).flat()
    }, [])

    return (
        <Stage width={width} height={height} className="konva-stage-container">
            <Layer>
                {getObjectsByFrame(store.currentFrame).map(object => {
                    if(!object) return;
                    return <Text key={object._id} text={object.type} />
                })}
            </Layer>
        </Stage>
    )
}