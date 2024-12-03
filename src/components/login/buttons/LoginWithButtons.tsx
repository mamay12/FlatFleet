import {Space} from "antd";
import LoginWithGoogle from "./google-login";
import LoginWithApple from "./apple-login";
import LoginWithFacebook from "./facebook-login";

function LoginWithButtons() {

    return (
        <Space direction="vertical" style={{width: "100%"}}>
            <LoginWithGoogle/>
            <LoginWithFacebook/>
            <LoginWithApple/>
        </Space>
    )
}

export default LoginWithButtons
