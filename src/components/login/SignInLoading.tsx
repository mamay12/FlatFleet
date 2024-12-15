import {PropsWithChildren, useEffect, useState} from "react";
import Loading from "../../pages/Loading.tsx";
import Welcome from "../../pages/Welcome.tsx";
import { useUser } from '../../contexts/UserContext.tsx';
import { Navigate } from 'react-router';

const SignInLoading = ({children}: PropsWithChildren<object>) => {
    const { isAuthenticated } = useUser();
    const [stage, setStage] = useState("loading");

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setStage("welcome");
        }, 3000);

        const welcomeTimeout = setTimeout(() => {
            setStage("content");
        }, 4000);

        return () => {
            clearTimeout(loadingTimeout);
            clearTimeout(welcomeTimeout);
        };
    }, []);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (stage === "loading") {
        return <Loading/>;
    }

    if (stage === "welcome") {
        return <Welcome/>;
    }


    return <>{children}</>;
};

export default SignInLoading;
