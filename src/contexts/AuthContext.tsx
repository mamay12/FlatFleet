import {UserInfo} from "firebase/auth";
import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useContext, useEffect,
    useMemo,
    useState
} from "react";
import {useLocalStorage} from "usehooks-ts";
import {useNavigate} from "react-router";

interface AuthContext {
    user: UserInfo | null
    setUser: Dispatch<SetStateAction<UserInfo | null>>
}

const fallback: AuthContext = {
    user: null,
    setUser: () => {
    }
}

const Context = createContext(fallback)

Context.displayName = "Auth Context";

export const useAuthContext = () => useContext(Context);

function AuthContextProvider({children}: PropsWithChildren<object>) {
    const [user, setUser] = useState<UserInfo | null>(null);
    const [value, setValue] = useLocalStorage<UserInfo | null>('user-storage', null)
    const navigate = useNavigate()
    useEffect(() => {
        if (user) {
            setValue(user)
        }
    }, [setValue, user]);

    useEffect(() => {
        if(value){
            navigate('/chooseType')
        }
    }, [navigate, value]);

    const ctx: AuthContext = useMemo(() => ({
        user,
        setUser
    }), [user])

    return <Context.Provider value={ctx}>{children}</Context.Provider>

}

export default AuthContextProvider
