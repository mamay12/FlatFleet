import {CloseCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {Button, Input, Space, Typography} from "antd";
import {useState} from "react";

const {Text} = Typography

function ElectedByVote() {
    const [emails, setEmails] = useState<string[]>([""])

    const addEmailField = () => {
        setEmails([...emails, ""]);
    };

    const removeEmailField = (index: number) => {
        const newEmails = [...emails];
        newEmails.splice(index, 1);
        setEmails(newEmails);
    };

    const handleEmailChange = (index: number, value: string) => {
        const newEmails = [...emails];
        newEmails[index] = value;
        setEmails(newEmails);
    };

    return (
        <>
            <Text type="secondary" style={{textAlign: "center"}}>Specify tenant emails confirming your status</Text>
            <Space direction="vertical" size="middle" style={{width: "100%", marginTop: "8px"}}>
                {emails.map((email, index) => (
                    <div key={index} style={{display: "flex", alignItems: "center"}}>
                        <Input
                            placeholder={`Tenant Email #${index + 1}`}
                            value={email}
                            onChange={(e) => handleEmailChange(index, e.target.value)}
                            style={{flexGrow: 1}}
                        />
                        {emails.length > 1 && (
                            <CloseCircleOutlined
                                onClick={() => removeEmailField(index)}
                                style={{color: "rgba(0, 0, 0, 0.45)", marginLeft: "8px", cursor: "pointer"}}
                            />
                        )}
                    </div>
                ))}
            </Space>
            <div style={{display: "flex", justifyContent: "center", marginTop: "16px"}}>
                <Button type="link" onClick={addEmailField} icon={<PlusOutlined/>}>
                    Add values
                </Button>
            </div>
        </>
    )
}

export default ElectedByVote
