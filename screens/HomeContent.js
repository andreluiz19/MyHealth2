import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { onSnapshot, query, collection } from 'firebase/firestore';
import { db } from '../config/firebase';

import {
    View,
    FlatList,
    StyleSheet,
    Dimensions,
    ScrollView,
} from 'react-native'

import CardVacina from '../components/CardVacina';
import IconSearch from '../components/IconSearch';
import MyButtons from '../components/MyButtons';
import MyInputs from '../components/MyInputs';

const HomeContent = (props) => {

    const email = useSelector((state) => state.login.email);
    const password = useSelector((state) => state.login.password);
    const uid = useSelector((state) => state.login.idUser);
    const [vacinas, setVacinas] = useState([]);
    const urlVacinas = "users/"+uid+"/vacinas";
    const q = query(collection(db, urlVacinas));

    const goToNewVaccine = () => {
        props.navigation.navigate('EditCreateVaccine', {idTela: 2})
    }
 
    useEffect(() => {
        onSnapshot(q, (result) => {
            const listaVacinas = [];
            result.forEach((doc) => {
                listaVacinas.push({
                    id: doc.id,
                    vacina: doc.data().vacina,
                    data: doc.data().dose,
                    proximaDose: doc.data().proximaDose,
                    dose: doc.data().dose,
                    urlImage: require('../images/comprovanteVacina.png'),
                })
            })
            setVacinas(listaVacinas);
        })
    }, [])

    return(
        
        <ScrollView style={styles.container}>
            <View style={styles.inputContainer}>
                <IconSearch style={styles.icon}></IconSearch>
                <MyInputs styleInput={styles.input} placeholder="        PESQUISAR VACINA..." />
            </View>
            
            <FlatList data={vacinas} renderItem={({item}) => <CardVacina item={item} 
                navigation={props.navigation}/>} keyExtractor={item => item.id} numColumns={2} 
            />
            
            <View style={styles.button}>
                <MyButtons label="Nova vacina" style={styles.buttonVacina} onPress={goToNewVaccine}/>
            </View>
        </ScrollView>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#ADD4D0',
        height: Dimensions.get('window').height,
    },
    buttonVacina: {
        backgroundColor: '#37BD6D',
        width: 160,
        height: 40,
        justifyContent: 'center',
        padding: 0,
        elevation: 10,
    },
    button: {
        alignItems: 'center',
        paddingVertical: 25,
        height: Dimensions.get('window').height * 0.17,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    input: {
        width: Dimensions.get('window').width * 0.95,
        color: 'gray',
        height: 30,
        padding: 0,
    },
    icon: {
        position: 'absolute',
        zIndex: 1,
    },
    inputContainer: {
       marginRight: 10
    }
})

export default HomeContent