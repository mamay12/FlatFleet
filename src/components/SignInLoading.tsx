import {PropsWithChildren, useEffect, useState} from "react";
import Loading from "../pages/shared/Loading.tsx";
import Welcome from "../pages/shared/Welcome.tsx";

const SignInLoading = ({children}: PropsWithChildren<object>) => {
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

    if (stage === "loading") {
        return <Loading/>;
    }

    if (stage === "welcome") {
        return <Welcome/>;
    }


    return <>{children}</>;
};

export default SignInLoading;
