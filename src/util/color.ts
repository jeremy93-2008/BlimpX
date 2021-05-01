interface IRGBObject {
    Red: number;
    Green: number;
    Blue: number;
}

interface IHSLObject {
    Hue: string;
    Saturate: string;
    Lightning: string;
}

export function getRGBObject(rgb: string): IRGBObject {
    const hslWithoutText = rgb.replace("rgb", "")
        .replace(/\(/gi, "")
        .replace(/\)/gi, "");
    const hslArray = hslWithoutText.split(",");
    return {
        Red: Number(hslArray[0].trim()),
        Green: Number(hslArray[1].trim()),
        Blue: Number(hslArray[2].trim())
    }
}

export function transformRGBINHSL(rgb: IRGBObject): IHSLObject {
    let {Red: r, Blue: b, Green: g} = rgb;
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h: number = 0, s: number, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h = h / 6;
    }

    return {
        Hue: `${h * 360}`,
        Saturate: `${s * 100}%`,
        Lightning: `${l * 100}%`
    };
}