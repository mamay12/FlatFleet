import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import BackButton from "@components/BackButton.tsx";
import {Button, Divider, message, Select, Typography} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import "@styles/_status-check.sass"
import {UploadFileStructure} from "@components/account/upload-files/types.ts";
import UploadFiles from "../account/management-company/steps/upload-files";
import FlatFleetUpload from "@components/account/upload-files/FlatFleetUpload.tsx";
import ElectedByVote from "./elected-by-vote";

const {Text, Title} = Typography

const types = [
    {value: 'document', label: 'I have a document', url: '/document'},
    {value: 'first-tenant', label: 'I am the first tenant to install the app', url: '/first-tenant'},
    {value: 'elected-by-vote', label: 'I was elected by vote', url: '/elected-by-vote'},
]

function FinalStatusCheck() {
    const navigate = useNavigate()
    const [selectedType, setSelectedType] = useState<string>()
    const [submitedType, setSubmitedType] = useState<string>()
    const [stepCompleted, setStepCompleted] = useState(false)

    const [files, setFiles] = useState<UploadFileStructure>({})
    const [documentsExistsCompleted, setDocumentsExistsCompleted] = useState(false)


    const handleSubmit = () => {
        if (stepCompleted) {
            message.success('Onboarding completed')
            return
        }
        setSubmitedType(selectedType)
    };

    const handleCompleted = () => {
        if (stepCompleted) {
            message.success('Onboarding completed')
            return
        }
        if (selectedType === "document") {
            setDocumentsExistsCompleted(true)
        }
        setStepCompleted(true)
    }

    useEffect(() => {
        if (selectedType !== submitedType) {
            setStepCompleted(false)
        }
    }, [selectedType, submitedType]);

    if (documentsExistsCompleted) {
        return <UploadFiles files={files} setFiles={setFiles} handleBack={() => setDocumentsExistsCompleted(false)}
                            handleSubmit={() => {
                                setDocumentsExistsCompleted(false);
                                setStepCompleted(true)
                            }}/>
    }

    const SwitchContent = () => {
        switch (submitedType) {
            case "document": {
                return <FlatFleetUpload files={files} setFiles={setFiles}/>
            }
            case "first-tenant": {
                return <Text type='secondary' style={{textAlign: "center"}}>The system will check if you are the
                    only tenant of</Text>
            }
            case "elected-by-vote": {
                return <ElectedByVote/>
            }
            default: {
                return null
            }
        }
    }

    return (
        <div className="status-check-page">
            <div className="content">
                <div className="back">
                    <BackButton onClick={() => navigate(-1)}/>
                </div>

                <div className="icon">
                    <img src="/assets/status-check-icon.svg" alt="Status check icon"/>
                </div>

                <div className="title">
                    <Title level={2}>Status Check</Title>
                </div>

                <Text className="description">
                    Fill in the field by selecting the condition that suits your case
                </Text>

                <Select
                    style={{
                        width: "100%"
                    }}
                    placeholder="Select category"
                    className="category-select"
                    onChange={(value) => setSelectedType(value)}
                    value={selectedType}
                    options={types}
                    size="large"
                    prefix={<SearchOutlined/>}
                />
                <Divider style={{
                    marginTop: 10,
                    padding: 1
                }}/>
            </div>
            <SwitchContent/>
            <div style={{
                position: "absolute",
                left: "10px",
                right: "10px",
                bottom: "10px"
            }}>
                {submitedType === selectedType ?
                    <Button
                        type="primary"
                        block
                        size="large"
                        disabled={!submitedType}
                        onClick={handleCompleted}>
                        Complete onboarding
                    </Button>
                    :
                    <Button
                        type="primary"
                        block
                        size="large"
                        disabled={!selectedType}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>

                }
            </div>
        </div>
    )

}

export default FinalStatusCheck
