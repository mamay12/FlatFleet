import {Button, Form, Input, message, Typography} from "antd";
import {
    EyeInvisibleOutlined,
    EyeTwoTone,
    LockOutlined,
    MailOutlined,
    PhoneOutlined,
    UserOutlined,
} from "@ant-design/icons";
import HeaderImage from "../../components/login/HeaderImage.tsx";
import "../../styles/_sign-up.sass"
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth, db} from "../../utils/firebase";
import {doc, setDoc } from "firebase/firestore";
import {NavLink} from "react-router";

const {Title, Text} = Typography;

import "../../styles/_sign-up.sass"

interface Form {
    fullName: string
    email: string
    password: string
    phoneNumber: string
}

const SignUpPage = () => {
    const onFinish = async (values: Form) => {
        const {fullName, email, password,phoneNumber} = values;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user

            await setDoc(doc(db, "users", user.uid), {fullname: fullName, email: email, password: password, phone: phoneNumber})

            await updateProfile(userCredential.user, {displayName: fullName});

            message.success("Account created successfully!");
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    return (
        <div className="screen-container">
            <HeaderImage/>
            <div className="formContainer">
                <Title level={3} className="title">
                    Sign up
                </Title>
                <Text className="description">
                    Looks like you don’t have an account. Let’s create a new account for
                    you.
                </Text>

                <Form onFinish={onFinish} className="form" layout="vertical">
                    <Form.Item
                        name="fullName"
                        rules={[{required: true, message: "Please enter your full name"}]}
                    >
                        <Input
                            prefix={<UserOutlined/>}
                            placeholder="Full name"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="phoneNumber"
                        rules={[{required: true, message: "Please enter your phone number"}]}
                    >
                        <Input
                            prefix={<PhoneOutlined/>}
                            placeholder="Phone number"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            {required: true, message: "Please enter your email"},
                            {type: "email", message: "Please enter a valid email"},
                        ]}
                    >
                        <Input prefix={<MailOutlined/>} placeholder="Email" size="large"/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{required: true, message: "Please enter your password"}]}
                    >
                        <Input.Password
                            prefix={<LockOutlined/>}
                            placeholder="Password"
                            size="large"
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>
                            }
                        />
                    </Form.Item>

                    <Text className="agreement">
                        By selecting Create Account below, I agree to{" "}
                        <a href="#">Terms of Service</a> & <a href="#">Privacy Policy</a>
                    </Text>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            className="createAccountButton"
                            block
                        >
                            Create account
                        </Button>
                    </Form.Item>
                </Form>

                <Text className="signInText">
                    Already have an account? <NavLink to='/login'>Sign in</NavLink>
                </Text>
            </div>
        </div>
    );
};

export default SignUpPage;
