interface IHSLObject {
    Hue: string;
    Saturation: string;
    Lightning: string;
}

export function getHSLObject(hsl: string): IHSLObject {
    const hslWithoutText = hsl.replace("hsl", "")
        .replace(/\(/gi, "")
        .replace(/\)/gi, "");
    const hslArray = hslWithoutText.split(",");
    return {
        Hue: hslArray[0].trim(),
        Lightning: hslArray[1].trim(),
        Saturation: hslArray[2].trim()
    }
}

export function transformRGBINHSL(color: string) {

}