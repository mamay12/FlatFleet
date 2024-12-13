import {UploadFileStructure} from "./types.ts";

export const totalUploadedFilesCount = (files: UploadFileStructure): number => {
    return Object.values(files).reduce((total, files) => total + files.length, 0);
}
