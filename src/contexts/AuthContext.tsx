import {UserInfo} from "firebase/auth";
import {
    createContext,
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";
import {useLocalStorage} from "usehooks-ts";

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

const userStorageKey = 'user-storage'

function AuthContextProvider({children}: PropsWithChildren<object>) {
    const [user, setUser] = useState<UserInfo | null>(null);
    const [_, setValue] = useLocalStorage<UserInfo | null>(userStorageKey, null)

    useEffect(() => {
        if (user) {
            setValue(user)
        }
    }, [setValue, user]);


    useEffect(() => {
        const storageInfo = localStorage.getItem(userStorageKey)
        if (storageInfo) {
            setUser(JSON.parse(storageInfo) as UserInfo)
        }
    }, []);

    const ctx: AuthContext = useMemo(() => ({
        user,
        setUser
    }), [user])

    return <Context.Provider value={ctx}>{children}</Context.Provider>

}

export default AuthContextProvider
