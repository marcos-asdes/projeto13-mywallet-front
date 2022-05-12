import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContext from '../contexts/UserContext.js';

import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import Deposit from './Deposit.js';
import Withdrawal from './Withdrawal';

const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none !important;
        font-family: 'Lexend Deca', sans-serif;
        /* letter-spacing: 1px; */
        font-weight: 300;
        cursor: default;
        -ms-overflow-style: none; /* for IE, Edge */
        scrollbar-width: none; /* for Firefox */
        transition: all 200ms ease-in-out 0s;
    }
    ::-webkit-scrollbar {
        display: none;
        appearance: none;
    }
    *.hidden {
        display: none !important;
    }
    *.disabled {
        opacity: 0.4;
        pointer-events: none;
    }
    div.root {
        height: 100vh;
        width: 100vw;
        overflow-x: hidden;
    }
`
export default function App() {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const APILink = "http://localhost:5000/";

    return (
        <React.Fragment>
            <GlobalStyle />
            <UserContext.Provider value={{APILink, user, setUser, token, setToken}}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/deposit" element={<Deposit />} />
                        <Route path="/withdrawal" element={<Withdrawal />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </React.Fragment>
    )
}