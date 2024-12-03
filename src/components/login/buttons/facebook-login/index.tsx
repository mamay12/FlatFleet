import {FacebookOutlined} from "@ant-design/icons";
import {Button} from "antd";

function LoginWithFacebook(){
    return (
        <Button
            block
            icon={<FacebookOutlined />}
            style={{
                marginBottom: 10,
                backgroundColor: "#3b5998",
                color: "#fff",
            }}
            size="large"
        >
            Login with Facebook
        </Button>
    )
}

export default LoginWithFacebook;
