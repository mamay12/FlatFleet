import {PropsWithChildren} from "react";
import {useAuthContext} from "../../contexts/AuthContext.tsx";
import {useNavigate} from "react-router";

function AuthFilter({children}: PropsWithChildren<object>) {
    const {user} = useAuthContext()
    const navigate = useNavigate()

    if (!user) {
        navigate('/login')
    }

    return user ? children : null
}

export default AuthFilter
