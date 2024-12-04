import { useLayoutEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import NotFound from "./NotFound";
import OnboardingPage from "./Onboarding";
import Loading from "./Loading";
import Welcome from "./Welcome";


const ScrollToTop: React.FC<{children: JSX.Element}> = ({children}) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children
}

const Router: React.FC<{}> = () => {
    return (
        <ScrollToTop>
            <Routes>
                <Route
                    path="/onboarding"
                    element={<OnboardingPage />}
                />
                <Route
                    path="/loading"
                    element={ <Loading /> } 
                />
                <Route
                    path="/welcome"
                    element={ <Welcome /> } 
                />
                <Route
                    path="*" 
                    element={ <NotFound /> }
                />
            </Routes>
        </ScrollToTop>
    )
}

export default Router;