import {Button} from "antd";
import {AppleOutlined} from "@ant-design/icons";
import {signInWithPopup} from "firebase/auth";
import {appleProvider, auth} from "../../../../utils/firebase";

function LoginWithApple() {
    const handleAppleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, appleProvider);
            const user = result.user;
            console.log("User info:", user);
        } catch (error) {
            console.error("Error during login:", error);
        }
    }
    return (
        <Button
            block
            icon={<AppleOutlined/>}
            style={{marginBottom: 10, backgroundColor: "#000", color: "#fff"}}
            size="large"
            onClick={handleAppleLogin}
        >
            Continue with Apple
        </Button>
    )
}

export default LoginWithApple
