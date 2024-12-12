import {GoogleOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {signInWithPopup} from 'firebase/auth'
import {auth, googleProvider} from "../../../../utils/firebase";
import { useUser } from '../../../../contexts/UserContext';

function LoginWithGoogle() {
    const { setAuthenticated, updateUserData } = useUser();

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            updateUserData({
                email: user.email || '',
                fullName: user.displayName || ''
            });
            setAuthenticated(true);
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    return (
        <Button
            block
            icon={<GoogleOutlined/>}
            style={{marginBottom: 10}}
            size="large"
            onClick={handleGoogleLogin}
        >
            Login with Google
        </Button>
    )
}

export default LoginWithGoogle
