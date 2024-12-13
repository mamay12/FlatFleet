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
import AccountTypeSelector from "./account/AccountTypeSelector.tsx";
import SignInPage from "./sign-in";
import SignUpPage from "./sign-up";
import AddFilesData from "./account/management-company/steps/personal-info";
import TenantOfHouseRegistration from "./account/tenant-registration";

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
                <Route path='/'>
                    <Route index element={<StartScreenPage/>}/>
                    <Route
                        path="onboarding"
                        element={<OnboardingPage/>}
                    />
                    <Route
                        path="loading"
                        element={<Loading/>}
                    />
                    <Route
                        path="welcome"
                        element={<Welcome/>}
                    />
                    <Route
                        path="recover-password"
                        element={<RecoverPassword/>}
                    />
                    <Route
                        path="set-password-success"
                        element={<SetPasswordSuccess/>}
                    />
                    <Route
                        path='login'
                        element={<SignInPage/>}
                    />
                    <Route
                        path='register'
                        element={<SignUpPage/>}
                    />
                    <Route
                        path="*"
                        element={<NotFound/>}
                    />
                    <Route path="account-type" element={<AccountTypeSelector/>}/>
                    <Route path="management-company" element={<AddFilesData/>}/>
                    <Route path="tenant-of-house" element={<TenantOfHouseRegistration/>}/>
                    <Route path="house-committee" element={<BuildingLocation/>}/>
                    <Route path="doubt" element={<AddFilesData/>}/>
                </Route>
            </Routes>
        </ScrollToTop>
    )
}


export default Router;
