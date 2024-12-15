import {Button, Checkbox, Divider, Form, Input, message, Space, Typography} from "antd";
import {LockOutlined, MailOutlined,} from "@ant-design/icons";
import HeaderImage from "../../components/login/HeaderImage.tsx";
import LoginWithButtons from "../../components/login/buttons/LoginWithButtons.tsx";
import {NavLink, useNavigate} from "react-router";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "../../utils/firebase";
import {doc, getDoc} from "firebase/firestore";
import "@styles/sign-in/_sign-in.sass"
import { useUser } from "../../contexts/UserContext.tsx";
import {useEffect} from "react";

import('../../styles/_vars.sass')

const {Title, Text} = Typography;

interface FormData {
    email: string
    password: string
}

const SignInPage = () => {
    const { setAuthenticated, updateUserData } = useUser();

    const handleLogin = async ({password, email}: FormData) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
                const userData = auth.currentUser;
                updateUserData({
                    email: userData?.email || '',
                    fullName: userData?.displayName || ''
                });
                setAuthenticated(true);
                message.success(`Welcome, ${userData?.displayName}!`);

            } else {
                message.error("User not exists");
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    const {isAuthenticated} = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        if(isAuthenticated){
            navigate('/account-type')
        }
    }, [isAuthenticated, navigate]);

    return (
        <>
            <HeaderImage/>
            <div
                className="screen-container"
            >
                <div className="formContainer">
                    <Title level={3}>Welcome</Title>
                    <Text type="secondary">Sign in to continue</Text>
                    <div>
                        <LoginWithButtons/>
                    </div>
                    <Divider>
                        <Text>or</Text>
                    </Divider>
                    <Form
                        layout="vertical"
                        onFinish={handleLogin}
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
                                <NavLink to="/recover-password">Forgot password?</NavLink>
                            </Space>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block size="large">
                                Continue
                            </Button>
                        </Form.Item>
                    </Form>
                    <Text>
                        Don’t have an account? <NavLink to='/register'>Sign up</NavLink>
                    </Text>
                </div>
            </div>
        </>
    );
};

export default SignInPage;
