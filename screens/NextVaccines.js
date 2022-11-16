import React, {useEffect} from 'react'
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native'

import CardNextVaccines from '../components/CardNextVaccines';
import MyButtons from '../components/MyButtons';

const NextVaccines = (props) => {

    //const {item} = props.route.params;

    const goToNewVaccine = () => {
        props.navigation.navigate('NewVaccine', {idTela: 2})
    }

    return(

        <View style={styles.container}>

            <View>
                <CardNextVaccines label="BCG" data="20/09/2022" />
            </View>

            <View>
                <CardNextVaccines label="DTpa" data="20/09/2024" />
            </View>
            <View>

                <CardNextVaccines label="Sarampo" data="03/04/2026" />
            </View>

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