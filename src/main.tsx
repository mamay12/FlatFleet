import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from "react-router";
import Router from './pages/router.tsx';
import { UserProvider } from './contexts/UserContext';

import "./styles/index.sass";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <UserProvider>
                <Router/>
            </UserProvider>
        </BrowserRouter>
    </StrictMode>,
)
