import {UploadFile} from "antd";

export interface UploadFileStructure {
    [directory: string]: UploadFile[];
}
