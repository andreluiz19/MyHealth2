import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    FlatList
} from 'react-native'

import CardNextVaccines from '../components/CardNextVaccines';
import MyButtons from '../components/MyButtons';

import { useSelector } from 'react-redux';
import { onSnapshot, query, collection } from 'firebase/firestore';
import { db } from '../config/firebase';

const NextVaccines = (props) => {
    
    const uid = useSelector((state) => state.login.idUser);
    const urlVacinas = "users/"+uid+"/vacinas";
    const q = query(collection(db, urlVacinas));
    const [vacinas, setVacinas] = useState([]);

    const goToNewVaccine = () => {
        props.navigation.navigate('EditCreateVaccine')
    }
    
    useEffect(() => {
        console.log("useEffect")
        onSnapshot(q, (result) => {
            const proximasVacinas = [];
            result.forEach((doc) => {
                const vet = doc.data().proximaDose.split('/');
                const proxDose = doc.data().proximaDose;
                const diaVac = vet[0];
                const mesVac = vet[1];
                const anoVac = vet[2];
                const date = new Date();
                const dia = date.getDate();
                const mes = date.getMonth() + 1;
                const ano = date.getFullYear();
                if(diaVac > dia && mesVac >= mes && anoVac >= ano){
                    proximasVacinas.push({
                        vacina: doc.data().vacina,
                        data: proxDose
                    })
                }else if((diaVac <= dia || diaVac >= dia) && (mesVac <= mes || mesVac >= mes) && anoVac > ano){
                    proximasVacinas.push({
                        vacina: doc.data().vacina,
                        data: proxDose
                    })
                }
            })
            console.log(proximasVacinas)
            setVacinas(proximasVacinas);
        })
    }, [])
    

    return(

        <View style={styles.container}>

            <FlatList data={vacinas}
                renderItem={({item}) => <CardNextVaccines item={item}/>} 
                keyExtractor={item => item.id}
            />
            <View style={styles.button}> 
                <MyButtons label="Nova vacina" style={styles.buttonVacina} onPress={goToNewVaccine} />
            </View>

        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ADD4D0',
        height: Dimensions.get('window').height,
    },
    buttonVacina: {
        backgroundColor: '#37BD6D',
        width: 160,
        padding: 10,
        elevation: 10,
    },
    button: {
        alignItems: 'center',
        marginTop: 260
    },
})

export default NextVaccines