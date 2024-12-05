import { Button, Input, Space, Typography } from 'antd';
import { LeftOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { CircledIcon } from '../components/CircledIcon';

import "../styles/_recoverPassword.sass";
import { useState } from 'react';

const { Title, Text } = Typography;

const SetPassword: React.FC = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [repeat, setRepeat] = useState("")
    const [loading, setLoading] = useState(false);

    const submitPassword = async () => {
        setLoading(true)
        console.log(`Password: ${password}`)
    }

    const isPasswordsValid = password === repeat && password.length > 8;
    
    return (
        <div className="recover-password set-password">
            <div className="header">
                <button className="back-button" onClick={() => navigate('/login')}>
                    <LeftOutlined /> Log in
                </button>
                <button className="help-button" onClick={() => {}}>?</button>
            </div>

            <div className="content">
                <CircledIcon src="/assets/lock.svg" />
                <Title level={2}>Create new password</Title>
                <Text>Your new password must be different from previously use password</Text>
                <Input.Password
                    size="large"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    prefix={<LockOutlined/>}
                />
                <Input.Password
                    size="large"
                    value={repeat}
                    onChange={e => setRepeat(e.target.value)}
                    placeholder="Confirm password"
                    prefix={<LockOutlined/>}
                />
                <Button
                    type="primary"
                    block
                    size="large"
                    loading={loading}
                    disabled={!isPasswordsValid}
                    onClick={submitPassword}
                    children="Reset Password"
                />
            </div>
        </div>
    );
};

export default SetPassword; 