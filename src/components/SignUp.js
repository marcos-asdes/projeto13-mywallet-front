import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';

import UserContext from '../contexts/UserContext';

export default function SignUp() {

    const { APILink } = useContext(UserContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    function setStateOnChange(event, setStateFunction) {
        setStateFunction(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            await axios.post(APILink+'signup', { name, email, password, confirmPassword });
            setIsLoading(false);
            alert('Cadastro feito com sucesso!');
            navigate("/");
        } catch (error) {
            alert('Ocorreu um erro! Tente novamente mais tarde.');
            setIsLoading(false);
            console.log(error);
        }
    }

    return (
        <SignUpPage>
            <Logo>MyWallet</Logo>
            <InputContainer> 
                <Input type="text" placeholder="Nome" value={name} disabled={isLoading} onChange={event => { setStateOnChange(event, setName) }}/>
                <Input type="email" placeholder="E-mail" value={email} disabled={isLoading} onChange={event => { setStateOnChange(event, setEmail) }}/>
                <Input type="password" placeholder="Senha" value={password} disabled={isLoading} onChange={event => { setStateOnChange(event, setPassword) }}/>
                <Input type="password" placeholder="Confirme a Senha" value={confirmPassword} disabled={isLoading} onChange={event => { setStateOnChange(event, setConfirmPassword) }}/>
                <SubmitButton disabled={isLoading} onClick={event => handleSubmit()} >
                    {isLoading ? <ThreeDots color="#fff" height={50} width={50} /> : "Cadastrar"}
                </SubmitButton>
            </InputContainer>
            <SignInContainer>
                {isLoading ? "Checando informações..." : <Link to={"/"} >Já tem uma conta? Entre agora!</Link>}
            </SignInContainer>
        </SignUpPage>
    )
}