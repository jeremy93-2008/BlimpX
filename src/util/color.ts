export interface IRGBObject {
    Red: number;
    Green: number;
    Blue: number;
}

export interface IHSLObject {
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

export function toRGBinHSL(rgb: IRGBObject): IHSLObject {
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

export function toHSLinRGB(hsl: IHSLObject): IRGBObject {
    let {Hue, Saturate, Lightning} = hsl
    let r, g, b;

    const h = Number(Hue);
    const s = Number(Saturate);
    const l = Number(Lightning);

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        const hue2rgb = function hue2rgb(p: number, q: number, t: number){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return {
        Red: Math.round(r * 255),
        Green: Math.round(g * 255),
        Blue: Math.round(b * 255)
    };
}