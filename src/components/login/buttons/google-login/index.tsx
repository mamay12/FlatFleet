import {GoogleOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {signInWithPopup} from 'firebase/auth'
import {auth, googleProvider} from "../../../../utils/firebase";

function LoginWithGoogle() {
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            console.log("User info:", user);
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
