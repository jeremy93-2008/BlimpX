import {pad} from "./pad";

export function formatTimeFromMilliseconds(milliseconds: number) {
    const ms = milliseconds % 1000;
    milliseconds = (milliseconds - ms) / 1000;
    const secs = milliseconds % 60;
    milliseconds = (milliseconds - secs) / 60;
    const mins = milliseconds % 60;

    return pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3)
}