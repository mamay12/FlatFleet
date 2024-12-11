import {GoogleOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {signInWithPopup} from 'firebase/auth'
import {auth, googleProvider} from "../../../../utils/firebase";
import {useAuthContext} from "../../../../contexts/AuthContext.tsx";

function LoginWithGoogle() {
    const {setUser} = useAuthContext()

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            setUser(auth.currentUser)
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
