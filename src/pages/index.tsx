import {FC, useEffect} from "react";
import {Route, Routes, useLocation} from "react-router";
import NotFound from "./shared/NotFound.tsx";
import OnboardingPage from "./Onboarding";
import Loading from "./shared/Loading.tsx";
import Welcome from "./shared/Welcome.tsx";
import RecoverPassword from "./password-recovery";
import SetPasswordSuccess from "./password-recovery/SetPasswordSuccess.tsx";
import StartScreenPage from "./StartScreen.tsx";
import BuildingLocation from "./BuildingLocation.tsx";
import AccountTypeSelector from "./AccountTypeSelector.tsx";
import ChooseAccountTypePage from "./account";
import SignInPage from "./sign-in";
import SignUpPage from "./sign-up";

const ScrollToTop: FC<{ children: JSX.Element }> = ({children}) => {
    const location = useLocation();
    useEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children
}

const Router: FC = () => {
    return (
        <ScrollToTop>
            <Routes>
                <Route index element={<StartScreenPage/>}/>
                <Route
                    path="/onboarding"
                    element={<OnboardingPage/>}
                />
                <Route
                    path="/loading"
                    element={<Loading/>}
                />
                <Route
                    path="/welcome"
                    element={<Welcome/>}
                />
                <Route
                    path="/recover-password"
                    element={<RecoverPassword/>}
                />
                <Route
                    path="/set-password-success"
                    element={<SetPasswordSuccess/>}
                />
                <Route
                    path="/account-type"
                    element={<AccountTypeSelector />}
                />
                <Route
                    path="/building-location"
                    element={<BuildingLocation />}
                />
                <Route
                    path='/login'
                    element={<SignInPage/>}
                />
                <Route
                    path='/register'
                    element={<SignUpPage/>}
                />
                <Route
                    path="*"
                    element={<NotFound/>}
                />
                <Route path="/chooseType" element={<ChooseAccountTypePage/>}/>
            </Routes>
        </ScrollToTop>
    )
}


export default Router;
