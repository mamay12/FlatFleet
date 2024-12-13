import {PropsWithChildren} from "react";

import {useNavigate} from "react-router";
import {useUser} from "../../contexts/UserContext.tsx";

function AuthFilter({children}: PropsWithChildren<object>) {
    const {userData} = useUser()
    const navigate = useNavigate()

    if (!userData) {
        navigate('/login')
    }

    return userData ? children : null
}

export default AuthFilter
