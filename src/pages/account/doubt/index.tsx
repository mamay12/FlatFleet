import {useState} from "react";
import {UploadFileStructure} from "@components/account/upload-files/types.ts";
import BackButton from "@components/BackButton.tsx";
import AccountIcon from "@assets/account.svg";
import {Button, Divider, Select, Typography} from "antd";
import FlatFleetUpload from "@components/account/upload-files/FlatFleetUpload.tsx";
import {useNavigate} from "react-router";
import UploadFiles from "../../upload-files";
import {useUser} from "../../../contexts/UserContext.tsx";

const {Text, Title} = Typography

const professions = [
    {label: 'Profession 1', value: 'profession1' },
    {label: 'Profession 2', value: 'profession2' },
    {label: 'Profession 3', value: 'profession3' },
]

function Doubt() {
    const [files, setFiles] = useState<UploadFileStructure>({});
    const [profession, setProfession] = useState<string>();
    const navigate = useNavigate()
    const [completed, setCompleted] = useState(false);
    const {updateFiles, updateDoubt} = useUser()

    const handleConfirm = () => {
        setCompleted(true)
        updateDoubt({profession})
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

                <Select
                    size="large"
                    placeholder="Your profession"
                    style={{width:'100%'}}
                    className="input"
                    options={professions}
                    onChange={(e) => setProfession(e)}
                    value={profession}
                />
                <Divider type="horizontal"/>
                <FlatFleetUpload files={files} setFiles={setFiles}/>
            </div>
            <Button type="primary" block size="large" className="submit" onClick={handleConfirm}>
                Complete onboarding
            </Button>
        </div>
    )
}

export default Doubt
