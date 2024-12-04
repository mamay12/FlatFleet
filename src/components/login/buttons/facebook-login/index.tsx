import {FacebookOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {auth, facebookProvider} from "../../../../utils/firebase";
import {signInWithPopup} from 'firebase/auth'

function LoginWithFacebook() {
    const handleFacebookLogin = async () => {
        try {
            const result = await signInWithPopup(auth, facebookProvider);
            const user = result.user;
            console.log("User info:", user);
        } catch (error) {
            console.error("Error during login:", error);
        }
    }

    return (
        <Button
            block
            icon={<FacebookOutlined/>}
            style={{
                marginBottom: 10,
                backgroundColor: "#3b5998",
                color: "#fff",
            }}
            size="large"
            onClick={handleFacebookLogin}
        >
            Login with Facebook
        </Button>
    )
}

export default LoginWithFacebook;
