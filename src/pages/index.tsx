import { useLayoutEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import NotFound from "./NotFound";


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
                    path="*" 
                    element={ <NotFound /> }
                />
            </Routes>
        </ScrollToTop>
    )
}

export default Router;