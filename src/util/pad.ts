export function pad(n: number, z?: number) {
    z = z || 2;
    return ('00' + n).slice(-z);
}