import {Typography, Upload, UploadProps} from "antd";
import AttachIcon from "@components/account/AttachIcon.tsx";
import {totalUploadedFilesCount} from "@components/account/upload-files/totalUploadedFilesCount.ts";
import {Dispatch, SetStateAction} from "react";
import {UploadFileStructure} from "@components/account/upload-files/types.ts";
import {UploadChangeParam} from "antd/es/upload/interface";
import "@styles/upload/_flat-fleet-upload.sass"

const {Text} = Typography

interface FlatFleetUploadProps {
    files: UploadFileStructure
    setFiles: Dispatch<SetStateAction<UploadFileStructure>>
}

function FlatFleetUpload({files, setFiles}: Readonly<FlatFleetUploadProps>) {
    const handleChange = ({fileList}: UploadChangeParam): void => {
        const groupedFiles: UploadFileStructure = {};

        fileList.forEach((file) => {
            if (file.originFileObj!.webkitRelativePath) {
                const pathParts = file.originFileObj!.webkitRelativePath.split("/");
                const directory = pathParts.slice(0, -1).join("/") || "Root Directory";

                if (!groupedFiles[directory]) {
                    groupedFiles[directory] = [];
                }

                groupedFiles[directory].push(file);
            }
        });

        setFiles(groupedFiles);
    };

    const uploadConfig: UploadProps = {
        directory: true,
        multiple: true,
        onChange: handleChange,
        showUploadList: false,
        beforeUpload: () => false
    }


    return (
        <div className="attach">
            <Text>Attach documents providing your status</Text>
            <div className="upload">
                <Upload {...uploadConfig}>
                    <AttachIcon/>
                </Upload>
            </div>
            <Text
                className="upload-text">{`${totalUploadedFilesCount(files)}/${totalUploadedFilesCount(files)} files ready`}</Text>
        </div>
    )
}

export default FlatFleetUpload
