import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native'

import { useDispatch } from 'react-redux';
import { reducerSetVacina } from '../redux/vacinaSlice';
import { reducerSetCoords } from '../redux/coordsSlice';

const CardVacina = (props) => {

    const { item } = props;
    const dispatch = useDispatch();

    const proxDose = (() => {
        if(item.proximaDose === ''){
            return 'Não há próxima dose';
        }else{
            return 'Próxima dose em: '
        }
    })
    const goToEditVaccine = (id, latitude, longitude) => {
        dispatch(reducerSetVacina({
            id: id
        }))
        dispatch(reducerSetCoords({
            latitude: latitude,
            longitude: longitude
        }))
        props.navigation.navigate('EditCreateVaccine');
    }
    return(
        
        <TouchableOpacity onPress={() => goToEditVaccine(item.id, item.latitude, item.longitude)}>
            
            <View style={styles.card}>
                <Text style={{fontSize: 22, color: '#3F92C5', fontFamily: 'AveriaLibre-Regular', marginTop: 5}}>{item.vacina}</Text>
                <Text style={{fontSize: 16, color: 'white', backgroundColor: '#3F92C5', paddingHorizontal: 10, marginTop: 5, 
                    fontFamily: 'AveriaLibre-Regular'}}>{item.dose}
                </Text>
                <Text style={{fontSize: 14, fontFamily: 'AveriaLibre-Regular', marginVertical: 5, color: 'gray'}}>{item.data}</Text>
                <Image style={styles.image} source={{ uri: item.urlImage }}></Image>
                <Text style={{fontSize: 14, color: '#FD7979', fontFamily: 'AveriaLibre-Regular'}}>{proxDose()}{item.proximaDose}</Text>
            </View>

        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
    image: {
        width: 180,
        height: 90
    },
    card: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        width: Dimensions.get('window').width/2-10,
        height: 200,
        borderRadius: 10,
        marginHorizontal: 5,
        marginVertical: 5,
    },
})

export default CardVacina