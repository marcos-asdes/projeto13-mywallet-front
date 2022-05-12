import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import UserContext from './../contexts/UserContext';

export default function HomePage() {

    const { APILink, user } = useContext(UserContext);
    const [transactions, setTransactions] = useState([]);
    
    useEffect(() => {
    console.log('user is ', user);
    async function getUserData() {
        try {
        const response = await axios.get(APILink+'transactions', {
            headers: {
            'Authorization': `Bearer ${user.token}`
            }
        });
        console.log(response);
        setTransactions(response.data);
        } catch (error) {
            alert('Ocorreu um erro! Tente novamente mais tarde.');
            console.log(error.response);
        }
    }
        getUserData();
    }, []);

    function buildTransactions() {
        if(transactions.length > 0) {
            return transactions.map((transaction, index) => {
                const {type, date, description, value} = transaction;
                return (
                    <Transaction key={index} type={type} date={date} description={description} value={value} />
                )
            })
        } else return <p>Não há registros de entrada ou saída</p>
    }

    function Transaction (props) {
        const {type, date, description, value} = props;
        return (
            <div>
                <div>
                    <p>{date}</p>
                    <p>{description}</p>
                </div>
                <p>{value}</p> {/* type => deposit/withdraw */}
            </div>
        )
    }

    function buildBalance() {
        if(transactions.length > 0) {
            return transactions.reduce((previous, current) => {
            if(current.type === 'deposit') {
                return previous + current.value;
            }

            return previous - current.value;
            }, 0)
        } else return 0;
    }

    const transacationsSection = buildTransactions();
    const balanceSection = buildBalance();

    return (
        <HomePage>
            <TopBar>
                <h1>Olá, {user.name}</h1>
                <LogoutButton></LogoutButton>
            </TopBar>
            <div>
                <div>{transacationsSection}</div>
                <div>Saldo: {balanceSection}</div>
            </div>
            <div>
                <Link to="/deposit"><button>Nova Entrada</button></Link>
                <Link to="/withdrawal"><button>Nova Saída</button></Link>
            </div>
        </HomePage>
    )
}