import {FC, useEffect} from "react";
import {Route, Routes, useLocation} from "react-router";
import NotFound from "./NotFound";
import OnboardingPage from "./Onboarding";
import Loading from "./Loading";
import Welcome from "./Welcome";
import Login from "./login";


const ScrollToTop: FC<{children: JSX.Element}> = ({children}) => {
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
                <Route path='/login' element={<Login/>}/>
            </Routes>
        </ScrollToTop>
    )
}


export default Router;
