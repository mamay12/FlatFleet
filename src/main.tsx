import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from "react-router";
import Router from './pages/index.tsx';

import "./styles/index.sass";
import AuthContext from "./contexts/AuthContext.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <AuthContext>
                <Router/>
            </AuthContext>
        </BrowserRouter>
    </StrictMode>,
)
