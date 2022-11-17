import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';

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

const listaVacinas = [];

const newVac = {
    item: {
        id: '',
        vacina: '',
        data: '',
        dose: '',
        urlImage: '',
        proximaDose: '',
    }
}


const HomeContent = (props) => {

    const [isRefresh, isSetRefresh] = useState(false)

    const email = useSelector((state) => state.login.email);
    const password = useSelector((state) => state.login.password);
    const uid = useSelector((state) => state.login.idUser);

    const goToEditCreateVaccine = () => {
        isSetRefresh(!isRefresh)
        props.navigation.navigate('EditCreateVaccine', {item: newVac, idTela: 2});
    }
    useEffect(() => {
        if(props.route.params?.item && props.route.params?.screen == 1){
            isSetRefresh(!isRefresh)
            //console.log('Vim da tela de criar nova vacina!')
            const vac = props.route.params.item;
            listaVacinas.push(vac);
        }
        if(props.route.params?.item && props.route.params?.screen == 2){
            isSetRefresh(!isRefresh)
            //console.log('Vim da tela de editar vacina!')
            const vac = props.route.params.item;
            console.log(vac);
            listaVacinas.forEach( v => {
                if(v.id == vac.id){
                    //console.log(listaVacinas.indexOf(v));
                    let index = listaVacinas.indexOf(v)
                    listaVacinas.splice(index, 1); //Primeiro parâmetro o index segundo a quantida a remover
                }
            })
        }
    }, [props.route.params?.item, props.route.params?.screen])

    useEffect(() => {
    }, [isRefresh, listaVacinas])

    return(
        
        <ScrollView style={styles.container}>
            <View style={styles.inputContainer}>
                <IconSearch style={styles.icon}></IconSearch>
                <MyInputs styleInput={styles.input} placeholder="        PESQUISAR VACINA..." />
            </View>
            
            <FlatList data={listaVacinas} renderItem={(item) => <CardVacina item={item} 
                onPress={() => props.navigation.navigate('EditCreateVaccine', {item: item, idTela: 1})} />} numColumns={2} 
            />
            
            <View style={styles.button}>
                <MyButtons label="Nova vacina" style={styles.buttonVacina} onPress={goToEditCreateVaccine} />
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