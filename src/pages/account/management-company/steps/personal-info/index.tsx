import {Button, Input, Typography} from 'antd';
import "@styles/account/managements-company/steps/_personal-info.sass"
import {useNavigate} from "react-router";
import ApartmentLogo from "@components/account/ApartmentLogo.tsx";
import {useState} from "react";
import UploadFiles from "../../../../upload-files";
import {UploadFileStructure} from "@components/account/upload-files/types.ts";
import BackButton from "@components/BackButton.tsx";
import AccountIcon from "@assets/account.svg"
import FlatFleetUpload from "@components/account/upload-files/FlatFleetUpload.tsx";
import {useUser} from "../../../../../contexts/UserContext.tsx";

const {Title, Text} = Typography;


const AddFilesData = () => {
    const [name, setName] = useState("")
    const [files, setFiles] = useState<UploadFileStructure>({});
    const [completed, setCompleted] = useState(false);
    const navigate = useNavigate()
    const {updateManagementCompany, updateFiles} = useUser()

    const handleConfirm = () => {
        setCompleted(true)
        updateManagementCompany({companyName: name})
    }

    if (completed) {
        const handleBack = () => setCompleted(false)
        return <UploadFiles files={files} handleBack={handleBack} setFiles={setFiles}
                            handleSubmit={() => updateFiles(files)}/>
    }

    return (
        <div className="page">
            <div>
                <BackButton onClick={() => navigate(-1)}/>

                <div className="avatar">
                    <div className="avatar-circle">
                        <img src={AccountIcon} alt="Account"/>
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
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <FlatFleetUpload files={files} setFiles={setFiles}/>
            </div>
            <Button type="primary" block size="large" className="submit" onClick={handleConfirm}>
                Complete onboarding
            </Button>
        </div>
    );
};

export default AddFilesData;
