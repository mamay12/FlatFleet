import { FC, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import NotFound from "./NotFound";
import OnboardingPage from "./Onboarding";
import Loading from "./Loading";
import Welcome from "./Welcome";
import Login from "./login";
import VerifyEmail from "./VerifyEmail";
import RecoverPassword from "./RecoverPassword";
import SetPassword from "./SetPassword";
import SetPasswordSuccess from "./SetPasswordSccess";
import StartScreenPage from "./StartScreen.tsx";
import SignUpPage from "./register";
import BuildingLocation from "./BuildingLocation.tsx";
import AccountTypeSelector from "./AccountTypeSelector.tsx";

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
                    path="/verify-email"
                    element={<VerifyEmail />}
                />
                <Route
                    path="/recover-password"
                    element={<RecoverPassword />}
                />
                <Route
                    path="/set-password"
                    element={<SetPassword />}
                />
                <Route
                    path="/set-password-success"
                    element={<SetPasswordSuccess />}
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
                    element={<Login/>}
                />
                <Route
                    path='/register'
                    element={<SignUpPage/>}
                />
                <Route
                    path="*"
                    element={<NotFound/>}
                />
            </Routes>
        </ScrollToTop>
    )
}


export default Router;
