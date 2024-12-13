import "@styles/account/tenant-registration/_status-check.sass"
import BackButton from "@components/BackButton.tsx";
import StatusCheckIcon from "@assets/status-check-icon.svg"
import {Button, Typography} from "antd";
import FlatFleetUpload from "@components/account/upload-files/FlatFleetUpload.tsx";
import {useState} from "react";
import {UploadFileStructure} from "@components/account/upload-files/types.ts";
import UploadFiles from "../management-company/steps/upload-files";

const {Title, Text, Link} = Typography

interface StatusCheckProps {
    handleBackClick: () => void
}

function StatusCheck({handleBackClick}: Readonly<StatusCheckProps>) {
    const [files, setFiles] = useState<UploadFileStructure>({})
    const [completed, setCompleted] = useState(false)

    const handleSubmit = () => setCompleted(true)

    if (completed) {
        const handleBack = () => setCompleted(false)

        return <UploadFiles files={files} handleBack={handleBack} setFiles={setFiles}/>
    }

    return (
        <div className="page">
            <div className="content">
                <div className="back">
                    <BackButton onClick={handleBackClick}/>
                </div>
                <div className="icon">
                    <img src={StatusCheckIcon} alt={"StatusCheckLogo"}/>
                </div>

                <div className="title">
                    <Title level={1}>Status Check</Title>
                </div>

                <FlatFleetUpload files={files} setFiles={setFiles}/>
            </div>
            <div className="footer">
                <Button className="submit" onClick={handleSubmit} size="large">Complete onboarding</Button>

                <Text type="secondary">
                    If your apartment was previously registered
                    <br/>in the system, but you cannot access the QR
                    <br/>code, send us an email
                </Text>
                <Link>Send Email</Link>

            </div>
        </div>
    )
}

export default StatusCheck
