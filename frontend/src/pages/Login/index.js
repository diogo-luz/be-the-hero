//o import do reactt é obrigatório mesmo que nunca se utilize a variável
//React porque ao utilizar JSX precisamos do react obrigatóriamente
import React, { useState } from 'react'; // importa o react
import { Link, useHistory } from 'react-router-dom'; //importa o componente link que permite abrir links mudando apenas a rota para nao recarregar toda a página (SPA)
import { FiLogIn } from 'react-icons/fi'; //importa o feather icons da package react icons

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Login(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault(); //necessário em todos os forms em React para prevenir que faça o comportamento normal do HTML de refresh

        try {
            const response = await api.post('/sessions', { id });

            //como precisamos destes dados disponíveis em toda a aplicação vamos guardar no storage
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch(err) {
            alert('Ocorreu um erro ao iniciar sessão, tente novamente.');
        }
    }

    return(
        <div className="login-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Efetue o seu Login</h1>

                    <input
                        placeholder="O seu ID"
                        value={id}
                        onChange={e => setId(e.target.value)} //arrow function para alterar o state do id
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho um ID
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}

//export default Login; colocou-se o export junto da declaração da função