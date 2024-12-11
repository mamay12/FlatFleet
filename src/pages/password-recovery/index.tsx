import {Button, Input, Typography} from 'antd';
import {LeftOutlined, MailOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router';
import {CircledIcon} from '../../components/CircledIcon.tsx';

import "../../styles/_recoverPassword.sass";
import {useState} from 'react';
import VerifyEmail from "./VerifyEmail.tsx";

const {Title, Text, Link} = Typography;

export const validateEmail = (email: string): boolean => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const isValidLength = email.length <= 254; // Maximum allowed email length
    const hasValidDomain = email.split('@')[1]?.length <= 255; // Domain length check
    const noConsecutiveDots = !email.includes('..');
    const noStartEndDots = !email.startsWith('.') && !email.endsWith('.');

    return (
        emailPattern.test(email) &&
        isValidLength &&
        hasValidDomain &&
        noConsecutiveDots &&
        noStartEndDots
    );
};

const RecoverPassword: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false);
    const [submited, setSubmited] = useState(false);

    const isEmailValid = validateEmail(email)

    const submitEmail = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false);
            setSubmited(true)
        }, 2000);
    }

    return submited ? <VerifyEmail email={email}/> : (
        <div className="recover-password">
            <div className="header">
                <button className="back-button" onClick={() => navigate('/login')}>
                    <LeftOutlined/> Log in
                </button>
                <button className="help-button" onClick={() => {
                }}>?
                </button>
            </div>

            <div className="content">
                <CircledIcon src="/assets/lock-clock.svg"/>
                <Title level={2}>Recover password</Title>
                <Text>Forgot your password? Don't worry, enter your email to reset your current password</Text>

                <Input
                    size="large"
                    placeholder="Email"
                    value={email}
                    disabled={loading}
                    onChange={e => setEmail(e.target.value)}
                    prefix={<MailOutlined/>}
                />

                <Button
                    type="primary"
                    block
                    size="large"
                    loading={loading}
                    disabled={!isEmailValid}
                    onClick={submitEmail}
                    children="Submit"
                />

                <div className="signup-prompt">
                    <Text>Don't have an account? </Text>
                    <Link onClick={() => navigate('/login')}>Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default RecoverPassword; 
