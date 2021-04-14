import {IBlimpFrameWithCurrentFrame, IBlimpPropsInspector} from "@source/blimpx.typing";
import React, {useContext, useMemo} from "react";
import {BlimpContext} from "../../../../../blimpx";
import {IPropObject} from "@source/templates/inspector/component/properties";

export function useGetSpecialProps(objectPropsWithFrames:
                                       IBlimpFrameWithCurrentFrame | null): IPropObject | null {
    const [store] = useContext(BlimpContext)

    const basicSpecialProps = {
        name: objectPropsWithFrames ? objectPropsWithFrames.type as string : "",
        special: true
    }

    const contentSpecialProps = useMemo(() => {
        if (!objectPropsWithFrames) return null;
        switch (objectPropsWithFrames.type) {
            case "Path":
                return {
                    content: [
                        {
                            propName: "d",
                            header: "Points",
                            type: "custom",
                            custom: () => <input type="text"/>
                        }
                    ]
                };
            case "Image":
                return {
                    content: [
                        {
                            propName: "image",
                            header: "Source",
                            type: "custom",
                            custom: () => <input type="file"/>
                        }
                    ]
                }
            case "Text":
                return {
                    content: [
                        {
                            propName: "text",
                            header: "Label",
                            type: "text",
                        }
                    ]
                };
            case "Circle":
                return {
                    content: [
                        {
                            propName: "radius",
                            header: "Radius",
                            type: "text"
                        }
                    ]
                }
            case "Rectangle":
                return {
                    content: []
                }
            case "Bezier":
                return {
                    content: [
                        {
                            propName: "d",
                            header: "Points",
                            type: "custom",
                            custom: () => <input type="text"/>
                        }
                    ]
                }
            case "Brush":
                return {
                    content: []
                }
        }
    }, [store])

    if (!contentSpecialProps) return null;

    return {...basicSpecialProps, content: contentSpecialProps.content as IBlimpPropsInspector[]}
}