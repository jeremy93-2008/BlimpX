export function pad(number: number, precision?: number) {
    const precisionSanity = precision || 2;
    return `${Math.trunc(number)}`.padStart(precisionSanity, "0")
}