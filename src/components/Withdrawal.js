import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import UserContext from "./../contexts/UserContext";

export default function Withdrawal() {

    const { APILink, user } = useContext(UserContext);
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");
    
    const navigate = useNavigate();

    function setStateOnChange(event, setStateFunction) {
        setStateFunction(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const body = { 
            description, 
            type: "withdrawal",
            value: parseFloat(value)
        };

        const headers = {
            headers: { 'Authorization': `Bearer ${user.token}`}
        };

        try {
            await axios.post(APILink+'transactions', body, headers);
            alert("Registro feito com sucesso!");
            navigate("/home");
        } catch (error) {
            alert('Ocorreu um erro! Tente novamente');
            console.log(error);
        }
    }

    return (
        <WidrawalPage>
            <h1>Nova saída</h1>
            <InputContainer>
                <Input type="number" placeholder="Valor" value={value} onChange={event => { setStateOnChange(event, setValue) }}/>
                <Input type="text" placeholder="Descrição" value={description} onChange={event => { setStateOnChange(event, setDescription) }}/>
                <SubmitButton onClick={event => handleSubmit()} >Salvar saída</SubmitButton>
            </InputContainer>
        </WidrawalPage>
    )
}