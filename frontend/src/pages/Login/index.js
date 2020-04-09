//o import do reactt é obrigatório mesmo que nunca se utilize a variável
//React porque ao utilizar JSX precisamos do react obrigatóriamente
import React from 'react'; // importa o react
import { Link } from 'react-router-dom'; //importa o componente link que permite abrir links mudando apenas a rota para nao recarregar toda a página (SPA)
import { FiLogIn } from 'react-icons/fi'; //importa o feather icons da package react icons

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Login(){
    return(
        <div className="login-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form>
                    <h1>Efetue o seu Login</h1>

                    <input placeholder="O seu ID" />
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