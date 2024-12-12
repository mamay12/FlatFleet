import {Button, Typography, Upload, UploadFile} from "antd";
import {CameraOutlined, UploadOutlined} from "@ant-design/icons";
import "../../../../../styles/account/managements-company/steps/_upload-file-page.sass";
import UploadFilesList from "../../../../../components/account/upload-files/UploadFilesList.tsx";
import {UploadFileStructure} from "../../../../../components/account/upload-files/types.ts";
import {totalUploadedFilesCount} from "../../../../../components/account/upload-files/totalUploadedFilesCount.ts";
import BackButton from "../../../../../components/BackButton.tsx";

const {Title, Text, Link} = Typography;

interface Props {
    files: UploadFileStructure
    handleBack: () => void
    handleRemove: (directory: string, filename: string) => void
    handleAdd: (files: UploadFile[]) => void
}

const UploadFilePage = ({files, handleBack, handleRemove, handleAdd}: Props) => {


    return (
        <div className="upload-file-page">
            <div>
                <div style={{
                    display: "flex",
                    alignItems: 'center',
                    gap: '8px'
                }}>
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

                <Text type="secondary" className="or-text">or</Text>

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

export default UploadFilePage;
