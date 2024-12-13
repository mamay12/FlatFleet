import {Button, Typography, Upload, UploadFile} from "antd";
import {CameraOutlined, UploadOutlined} from "@ant-design/icons";
import "@styles/account/managements-company/steps/_upload-file-page.sass";
import UploadFilesList from "@components/account/upload-files/UploadFilesList.tsx";
import {UploadFileStructure} from "@components/account/upload-files/types.ts";
import {totalUploadedFilesCount} from "@components/account/upload-files/totalUploadedFilesCount.ts";
import BackButton from "@components/BackButton.tsx";
import {Dispatch, SetStateAction} from "react";

const {Title, Text, Link} = Typography;

interface Props {
    files: UploadFileStructure
    setFiles: Dispatch<SetStateAction<UploadFileStructure>>
    handleBack: () => void
}

const UploadFilesPage = ({files, setFiles, handleBack}: Props) => {
    const handleRemove = (directory: string, fileName: string): void => {
        setFiles((prev) => {
            const updatedStructure = {...prev};

            updatedStructure[directory] = updatedStructure[directory].filter(
                (file) => file.name !== fileName
            );

            if (updatedStructure[directory].length === 0) {
                delete updatedStructure[directory];
            }

            return updatedStructure;
        });
    };

    const handleAdd = (files: UploadFile[]): void => {
        setFiles((prev) => ({
            ...prev,
            additional: [...files],
        }));
    };


    return (
        <div className="upload-file-page">
            <div>
                <div className="content">
                    <BackButton onClick={handleBack}/>

                    <Title level={2} className="title">Upload File</Title>
                </div>
                <div className="dropzone">
                    <Upload.Dragger accept='.jpg,.pdf,.png' name="files" multiple showUploadList={false}
                                    onChange={(e) => handleAdd(e.fileList)}>
                        <p className="ant-upload-drag-icon">
                            <UploadOutlined/>
                        </p>
                        <p className="ant-upload-text">Drag and drop, or <Link>browse</Link> your files</p>
                        <p className="ant-upload-hint">Support, JPG, PDF, PNG</p>
                    </Upload.Dragger>
                </div>

                <div className="or-text">
                    <Text type="secondary">or</Text>
                </div>

                <Button icon={<CameraOutlined/>} style={{
                    display: 'flex',
                    justifyContent: 'center'
                }} type="primary" className="camera-button">
                    Use Camera
                </Button>

                <div className="list">
                    <Text type="secondary">Upload list</Text>
                    <Text type="secondary"
                          className="status">{` ${totalUploadedFilesCount(files)}/${totalUploadedFilesCount(files)} files ready`}</Text>
                    <div style={{marginTop: 20}}>
                        <UploadFilesList files={files} handleRemove={handleRemove}/>
                    </div>
                </div>
            </div>
            <Button type="primary" block className=".submit">
                Submit
            </Button>
        </div>
    );
};

export default UploadFilesPage;
