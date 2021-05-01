import React from "react";

interface IChromaProps {
    color: string;
}

export function ChromaPicker(props: IChromaProps) {
    const {color} = props;

    const gradientChroma = `linear-gradient(to bottom, transparent, black), 
    linear-gradient(to right, white, transparent), ${color ?? "rgb(255,0,0)"}`

    return (<div className="chroma-container" style={{background: gradientChroma}}/>)
}