import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('PT');

    const history = useHistory();
    
    async function handleRegister(e) {
        e.preventDefault(); //necessário em todos os forms em React para prevenir que faça o comportamento normal do HTML de refresh
        
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };
        
        try{
            //não é necessário fazer nada na const data porque por padrão o axio ja vai enviar os dados no formato json
            const response = await api.post('/ongs', data);
            
            //utilização da crase (`) ao invés das aspas porque assim podemos colocar variáveis lá dentro
            alert(`O seu ID de acesso: ${response.data.id}`);

            //voltar a enviar o user para a rota raiz
            history.push('/');
        } catch (err) {
            alert('Erro no registo, tente novamente.');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Registo</h1>
                    <p>Efetue o seu registo, entre na plataforma e ajude as pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para o login
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)} //arrow function para alterar o state do name
                    />
                    <input 
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)} //arrow function para alterar o state do email    
                    />
                    <input 
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)} //arrow function para alterar o state do whatsapp 
                    />

                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)} //arrow function para alterar o state do campo city
                        />
                        <input 
                            readOnly
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)} //arrow function para alterar o uf (caso seja preciso)
                        />
                    </div>

                    <button className="button" type="submit">Registar</button>
                </form>
            </div>
        </div>
    );
}