import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { onSnapshot, query, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
import { reducerSetVacina } from '../redux/vacinaSlice';
import { reducerSetCoords } from '../redux/coordsSlice';
import { useDispatch } from 'react-redux';

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

    const dispatch = useDispatch();
    const uid = useSelector((state) => state.login.idUser);
    const [vacinas, setVacinas] = useState([]);
    const urlVacinas = "users/"+uid+"/vacinas";
    const q = query(collection(db, urlVacinas));
    const [searchString, setSearchString] = useState('');

    const goToNewVaccine = () => {
        dispatch(reducerSetVacina({
            id: null
        }))
        dispatch(reducerSetCoords({
            latitude: null,
            logintude: null
        }))
        props.navigation.navigate('EditCreateVaccine')
    }

    useEffect(() => {
        onSnapshot(q, (result) => {
            const listaVacinas = [];
            result.forEach((doc) => {
                listaVacinas.push({
                    id: doc.id,
                    vacina: doc.data().vacina,
                    data: doc.data().data,
                    proximaDose: doc.data().proximaDose,
                    dose: doc.data().dose,
                    urlImage: doc.data().urlImage,
                    latitude: doc.data().latitude,
                    longitude: doc.data().longitude
                })
            })
            setVacinas(listaVacinas);
        })
    }, [])
    
    return(
        
        <ScrollView style={styles.container}>
            <View style={styles.inputContainer}>
            <IconSearch style={styles.icon} />
                <MyInputs styleInput={styles.input} styleText={styles.text} placeholder="       PESQUISAR VACINA..." 
                    value={searchString} setValue={setSearchString}
                />
                
            </View>
            
            <FlatList data={vacinas.filter((vacina) => 
                    vacina.vacina.toLowerCase().includes(searchString.toLowerCase())
                )}
                renderItem={({item}) => <CardVacina item={item} navigation={props.navigation}/>} 
                keyExtractor={item => item.id} numColumns={2}
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
        marginTop: -3,
        marginLeft: -3
    },
    inputContainer: {
        flexDirection: 'row',
        marginRight: 10
    },
    text: {
        padding: 50
    }

})

export default HomeContent