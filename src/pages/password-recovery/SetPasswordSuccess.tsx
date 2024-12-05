import {Button, Typography} from 'antd';
import {useNavigate} from 'react-router';
import {CircledIcon} from '../../components/CircledIcon.tsx';

import "../../styles/_recoverPassword.sass";

const {Title, Text} = Typography;

const SetPasswordSuccess: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="set-password-success">
            <div className="content">
                <CircledIcon src="/assets/lock-check.svg"/>
                <Title level={2}>Password Changed!</Title>
                <Text>Your account password has been update, you can already login with your new password.</Text>
                <Button
                    type="primary"
                    block
                    size="large"
                    onClick={() => navigate("/sign-in")}
                    children="Confirm"
                />
            </div>
        </div>
    );
};

export default SetPasswordSuccess; 
