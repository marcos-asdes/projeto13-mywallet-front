import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';

import UserContext from '../contexts/UserContext';

export default function SignIn() {

    const {token, setToken, APILink} = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/wallet');
        }
    },[token]);

   function setStateOnChange(event, setStateFunction) {
        setStateFunction(event.target.value);
    }

/*     async function logIn() {
        setIsLoading(true)
        try {
            const link = APILink + "signIn";
            const answer = await axios.post(link, {email, password});
            const receivedToken = answer.data;
            localStorage.setItem('mywallet_token', JSON.stringify(receivedToken));
            setToken(receivedToken);
            setIsLoading(false)
        } catch {
            setIsLoading(false)
        }
    } */

    return (
        <FirstScreen>
            <Logo>MyWallet</Logo>
            <InputContainer> 
                <Input type="email" placeholder="E-mail" value={email} disabled={isLoading} onChange={e => { setStateOnChange(e, setEmail) }}/>
                <Input type="password" placeholder="Senha" value={password} disabled={isLoading} onChange={e => { setStateOnChange(e, setPassword) }}/>
                <SubmitButton disabled={isLoading} /* onClick={e => logIn()} */>
                    {isLoading ? <ThreeDots color="#fff" height={50} width={50} /> : "Entrar"}
                </SubmitButton>
            </InputContainer>
            <SignUpContainer>
                    {isLoading ? "Pera, estamos checando..." : <Link to={"/signup"} >Primeira vez? Cadastre-se!</Link>}
            </SignUpContainer>
        </FirstScreen>
    )
}

const FirstScreen = styled.main`
    & {
        width: 100%;
        height: 100%;
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        background: #8C11BE;
    }
    

`
const Logo = styled.div`    
    & {
        font-family: 'Saira Stencil One', cursive;
        font-size: 32px;
        line-height: 50px;
        color: #FFFFFF;
        margin-bottom: 24px;
    }
`
const InputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
    
    padding: 0 25px;
    * {
        font-weight: 400;
        font-size: 20px;
        color: #000000;
    }
`
const Input = styled.input`
    &{
    width: 100%;
    height: 58px;
    font-size: 20px;
    line-height: 23px;
    border: none;
    border-radius: 5px;
    color: black;
    padding-left: 15px;
    color: #000000;
    }

    &::placeholder {
        color: #000000;
    }

    &:disabled,
    &[disabled]{}

    background: #FFFFFF;
`
const SubmitButton = styled.button`
    width: 100%;
    height: 46px;
    background-color: #A328D6;
    border: none;
    border-radius: 5px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #FFFFFF;
`
const SignUpContainer = styled.button`
    margin-top: 32px;
    a {
        font-size: 15px;
        font-weight: 700;
    }
`