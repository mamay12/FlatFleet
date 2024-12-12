import {Button, Input, Typography, Upload, UploadFile, UploadProps} from 'antd';
import '../../../../../styles/account/managements-company/steps/_personal-info.sass';
import {useNavigate} from "react-router";
import ApartmentLogo from "../../../../../components/account/ApartmentLogo.tsx";
import AttachIcon from "../../../../../components/account/AttachIcon.tsx";
import {useState} from "react";
import {UploadChangeParam} from "antd/es/upload";
import UploadFiles from "../upload-files";
import {UploadFileStructure} from "../../../../../components/account/upload-files/types.ts";
import {totalUploadedFilesCount} from "../../../../../components/account/upload-files/totalUploadedFilesCount.ts";
import BackButton from "../../../../../components/BackButton.tsx";

const {Title, Text} = Typography;


const ManagementCompanyRegistration = () => {
    const [files, setFiles] = useState<UploadFileStructure>({});
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate()

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

    const handleConfirm = () => {
        setCompleted(true)
    }

    const uploadConfig: UploadProps = {
        directory: true,
        multiple: true,
        onChange: handleChange,
        showUploadList: false,
        beforeUpload: () => false
    }

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


    if (completed) {
        const handleBack = () => setCompleted(false)
        return <UploadFiles files={files} handleBack={handleBack} handleRemove={handleRemove} handleAdd={handleAdd}/>
    }

    return (
        <div className="onboarding-form">
            <BackButton onClick={() => navigate(-1)}/>

            <div className="avatar">
                <div className="avatar-circle">
                    TBD: LOGO
                </div>
            </div>

            <Title level={2} className="title">
                Your data
            </Title>
            <Text className="subtitle">
                Fill in the fields with personal information
            </Text>

            <Input
                size="large"
                placeholder="Company Name"
                prefix={<ApartmentLogo/>}
                className="input"
            />
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

            <Button type="primary" block size="large" className="submit" onClick={handleConfirm}>
                Complete onboarding
            </Button>
        </div>
    );
};

export default ManagementCompanyRegistration;
