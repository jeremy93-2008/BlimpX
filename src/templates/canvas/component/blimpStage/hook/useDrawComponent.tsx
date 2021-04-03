import React, {useCallback, useState} from "react";
import {Circle, Image as KonvaImage, Path, Rect, Text} from "react-konva";
import {IBlimpParams} from "@source/blimpx.typing";
import {IBlimpContext} from "@source/blimpx";
import {useDrawGenericHelper} from "./helper/useDrawGenericHelper";
import {useDrawPathHelper} from "./helper/useDrawPathHelper";

export type IBlimpDrawParams = Partial<IBlimpParams & { movePathData: string }>
export type ISetDrawComponentByMode = (params: IBlimpDrawParams) => void;
export type IDrawComponent = [JSX.Element | null, React.Dispatch<React.SetStateAction<JSX.Element | null>>]

export function useDrawComponent(context: IBlimpContext) {
    const [store] = context;
    const [drawComponent, setDrawComponent] = useState<JSX.Element | null>(null)

    const setDrawComponentByMode = useCallback((commonParam: IBlimpDrawParams) => {
        switch (store.mode) {
            case "Circle":
                return setDrawComponent(<Circle {...commonParam as IBlimpParams} />)
            case "Image":
                return setDrawComponent(<KonvaImage {...commonParam as IBlimpParams & { image: any }} />)
            case "Brush":
            case "Bezier":
            case "Path":
                return setDrawComponent(<Path data="" {...commonParam} />)
            case "Rectangle":
                return setDrawComponent(<Rect  {...commonParam}/>)
            case "Text":
                return setDrawComponent(<Text {...commonParam} />)
        }
    }, [store, drawComponent])
    
    const {
        onMouseUpNewGenericDrawObject,
        onMouseMoveNewGenericDrawObject,
        onMouseDownNewGenericDrawObject
    } = useDrawGenericHelper(context, [drawComponent, setDrawComponent], setDrawComponentByMode)

    const {
        onClickPathNewObject,
        onDblClickPathNewObject
    } = useDrawPathHelper(context, [drawComponent, setDrawComponent], setDrawComponentByMode)

    return {
        drawComponent,
        onMouseDownNewGenericDrawObject,
        onMouseMoveNewGenericDrawObject,
        onMouseUpNewGenericDrawObject,
        onClickPathNewObject,
        onDblClickPathNewObject
    }
}