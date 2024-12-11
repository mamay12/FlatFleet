import {useState} from 'react';
import {Button, Input, Typography} from 'antd';
import {LeftOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router';

import "../../styles/_verifyEmail.sass";
import {CircledIcon} from '../../components/CircledIcon.tsx';
import SetPassword from "./SetPassword.tsx";

const {Title, Text, Link} = Typography;

interface VerifyEmailProps {
    email: string;
}

function VerifyEmail({email}: VerifyEmailProps) {
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState(['', '', '', '']);
    const navigate = useNavigate();

    const [verified, setVerified] = useState(false);

    const handleCodeChange = (index: number, value: string) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            if (value && index < 3) {
                const nextInput = document.getElementById(`code-${index + 1}`);
                nextInput?.focus();
            }
        }
    };

    const submitCode = async () => {
        setLoading(true)
        setTimeout(() => {
            setVerified(true)
        }, 3000)
    };


    const isCodeValid = !code.some(c => c === "");

    return verified ? <SetPassword email={email}/> : (
        <div className="verify-email">
            <button className="back-button" onClick={() => navigate(-1)}>
                <LeftOutlined/> Back
            </button>

            <div className="content">
                <CircledIcon src="/assets/mail-at.svg"/>
                <Title level={2}>Verify your email</Title>
                <Text>Please enter the 4 code sent to</Text>
                <Text strong>{email}</Text>

                <div className="code-inputs">
                    {code.map((digit, index) => (
                        <Input
                            key={index}
                            id={`code-${index}`}
                            value={digit}
                            onChange={(e) => handleCodeChange(index, e.target.value)}
                            maxLength={1}
                        />
                    ))}
                </div>

                <Button
                    type="primary"
                    disabled={!isCodeValid}
                    block
                    size="large"
                    loading={loading}
                    onClick={submitCode}
                    children="Submit"
                />

                <Link className="resend-link">
                    Didn't receive the message, try again?
                </Link>
            </div>
        </div>
    );
}

export default VerifyEmail; 
