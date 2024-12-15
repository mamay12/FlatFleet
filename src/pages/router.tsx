import {FC, useEffect} from "react";
import {Route, Routes, useLocation} from "react-router";
import NotFound from "./NotFound.tsx";
import OnboardingPage from "./Onboarding";
import Loading from "./Loading.tsx";
import Welcome from "./Welcome.tsx";
import RecoverPassword from "./password-recovery";
import SetPasswordSuccess from "./password-recovery/SetPasswordSuccess.tsx";
import StartScreenPage from "./StartScreen.tsx";
import HouseCommittee from "./account/house-committee";
import AccountTypeSelector from "./account/AccountTypeSelector.tsx";
import SignInPage from "./sign-in";
import SignUpPage from "./sign-up";
import AddFilesData from "./account/management-company/steps/personal-info";
import TenantOfHouseRegistration from "./account/tenant-registration";
import BuildingDefinitions from "./building-definition/BuildingDefinitions.tsx";
import FloorDefinition from "./building-definition/FloorDefinition.tsx";
import FinalStatusCheck from "./final-status-check";
import Doubt from "./account/doubt";

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
                        path="account-type"
                        element={<AccountTypeSelector/>}
                    />
                    <Route
                        path="management-company"
                        element={<AddFilesData/>}
                    />
                    <Route
                        path="tenant-of-house"
                        element={<TenantOfHouseRegistration/>}
                    />
                    <Route
                        path="house-committee"
                        element={<HouseCommittee/>}
                    />
                    <Route
                        path="doubt"
                        element={<Doubt/>}
                    />
                    <Route
                        path="building-definitions"
                        element={<BuildingDefinitions/>}
                    />
                    <Route
                        path="floor-definition"
                        element={<FloorDefinition/>}
                    />
                    <Route
                        path="final-status-check"
                        element={<FinalStatusCheck/>}/>
                    <Route
                        path="*"
                        element={<NotFound/>}
                    />
                </Route>
            </Routes>
        </ScrollToTop>
    )
}


export default Router;
