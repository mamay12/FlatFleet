import {
    Button,
    Input,
    Form,
    Divider,
    Checkbox,
    Typography,
    Space
} from "antd";
import {
    MailOutlined,
    LockOutlined,
} from "@ant-design/icons";
import HeaderImage from "../../components/login/HeaderImage.tsx";
import LoginWithButtons from "../../components/login/buttons/LoginWithButtons.tsx";

import('../../styles/_vars.sass')


const {Title, Text, Link} = Typography;


const LoginPage = () => {
    const onFinish = (values: any) => {
        console.log("Form values: ", values);
    };

    return (
        <div
            style={{
                margin: "0 auto",
                padding: "20px",
                textAlign: "center",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
        >
            <HeaderImage/>
            <div style={{marginBottom: 20}}>
                <Title level={3}>Welcome</Title>
                <Text type="secondary">Sign in to continue</Text>
            </div>
            <LoginWithButtons/>
            <Divider>
                <Text>or</Text>
            </Divider>

            <Form
                layout="vertical"
                onFinish={onFinish}
                style={{textAlign: "left"}}
            >
                <Form.Item
                    name="email"
                    rules={[{required: true, message: "Please input your email!"}]}
                >
                    <Input
                        size="large"
                        placeholder="Email"
                        prefix={<MailOutlined/>}
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{required: true, message: "Please input your password!"}]}
                >
                    <Input.Password
                        size="large"
                        placeholder="Password"
                        prefix={<LockOutlined/>}
                    />
                </Form.Item>

                <Form.Item>
                    <Space
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 10,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                        <Link href="#">Forgot password?</Link>
                    </Space>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block size="large">
                        Continue
                    </Button>
                </Form.Item>
            </Form>

            <Text>
                Don’t have an account? <Link href="#">Sign up</Link>
            </Text>
        </div>
    );
};

export default LoginPage;
