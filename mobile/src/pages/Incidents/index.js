import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {
    const [incidents, setIncidents] = useState([]); //comecar um array vazio porque vai começar vazio
    const [total, setTotal] = useState([]);

    const [page, setPage] = useState(1); // para controlar o número da "página" onde estamos para realizar o scroll infinito de 5 em 5 casos
    const [loading, setLoading] = useState(); // para armazenar info quando estamos a ir buscar dados novos para evitar que procurem novamente pelos mesmos

    const navigation = useNavigation();

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents() {
        if (loading){
            return; //para evitar que enquanto uma requisição é feita, se faça uma nova requisição
            //ex: se o user puxar a lista duas vezes para atualizar, só vai atualizar uma vez e não duas
        }

        // se o total for maior que 0 porque ele começa como zero
        if (total > 0 && incidents.length === total){
            return; //caso já tenha os casos todos carregados para a const incidents, não vamos fazer mais nenhuma requisição
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: { page }
        });

        setIncidents([ ...incidents, ...response.data]); // anexar dois vetores
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }
    
    useEffect(() => {
        loadIncidents();
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Selecione um dos casos listados e salve o dia.</Text>

            <FlatList
                data={incidents}
                style={styles.incidentList} 
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>
                        
                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>{
                            Intl.NumberFormat('pt-PT', { 
                                style: 'currency', 
                                currency: 'EUR'
                            }).format(incident.value)}
                        </Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}