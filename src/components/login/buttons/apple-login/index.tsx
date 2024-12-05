import {Button} from "antd";
import {AppleOutlined} from "@ant-design/icons";

function LoginWithApple() {
    return (
        <Button
            block
            icon={<AppleOutlined/>}
            style={{marginBottom: 10, backgroundColor: "#000", color: "#fff"}}
            size="large"
        >
            Continue with Apple
        </Button>
    )
}

export default LoginWithApple
