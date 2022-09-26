import {FileTypes} from "../types/FileTypes";

export function isValideFile(filename: string): boolean {
    const fileExt = filename.split(".").pop();
    if (!fileExt) {
        return false;
    }

    return fileExt in FileTypes;
}