import {Button, Input, message, Typography} from 'antd';
import {LeftOutlined, LockOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router';
import {CircledIcon} from '../../components/CircledIcon.tsx';

import "../../styles/_recoverPassword.sass";
import {useState} from 'react';
import {UserInfo} from 'firebase/auth';
import SetPasswordSuccess from "./SetPasswordSuccess.tsx";
import {collection, getDocs, getFirestore, query, updateDoc, where} from "firebase/firestore";

const {Title, Text} = Typography;

const getUserByEmail = async (email: string) => {
    const db = getFirestore();
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("email", "==", email));

    try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            return {id: userDoc.id, ...userDoc.data()} as unknown as UserInfo;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching user by email:", error);
        throw error;
    }
};

const updatePasswordByEmail = async (email: string, newPassword: string): Promise<void> => {
    const db = getFirestore();
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("email", "==", email));

    try {
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userDocRef = userDoc.ref;

            await updateDoc(userDocRef, { password: newPassword });
            console.log("Password updated successfully!");
        } else {
            console.log("No user found with this email.");
        }
    } catch (error) {
        console.error("Error updating password:", error);
        throw error;
    }
};


function SetPassword({email}:{email: string}) {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [repeat, setRepeat] = useState("")
    const [loading, setLoading] = useState(false);
    const [updated, setUpdated] = useState(false);

    const isPasswordsValid = password === repeat && password.length > 8

    const submitPassword = async () => {
        setLoading(true)
        if (isPasswordsValid) {
            await getUserByEmail(email)
            await updatePasswordByEmail(email, password)
            setUpdated(true)
        } else {
            message.error("Passwords don't match");
        }
    }

    return updated ? <SetPasswordSuccess/> : (
        <div className="recover-password set-password">
            <div className="header">
                <button className="back-button" onClick={() => navigate('/login')}>
                    <LeftOutlined/> Log in
                </button>
                <button className="help-button" onClick={() => {
                }}>?
                </button>
            </div>

            <div className="content">
                <CircledIcon src="/assets/lock.svg"/>
                <Title level={2}>Create new password</Title>
                <Text>Your new password must be different from previously use password</Text>
                <Input.Password
                    size="large"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    prefix={<LockOutlined/>}
                />
                <Input.Password
                    size="large"
                    value={repeat}
                    onChange={e => setRepeat(e.target.value)}
                    placeholder="Confirm password"
                    prefix={<LockOutlined/>}
                />
                <Button
                    type="primary"
                    block
                    size="large"
                    loading={loading}
                    disabled={!isPasswordsValid}
                    onClick={submitPassword}
                    children="Reset Password"
                />
            </div>
        </div>
    );
}

export default SetPassword; 
