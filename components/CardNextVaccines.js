import React from 'react'

import {
    Text,
    View,
    StyleSheet,
} from 'react-native'

const CardNextVaccines = (props) => {

    const {item, label, data, style} = props
    return(

        <View style={[styles.container, style]}>
            <View style={styles.box}>
                <Text style={styles.texto}>{item.vacina}</Text>
                <Text style={styles.data}>{item.data}</Text>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    box: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '100%',
        padding: 10
    },
    texto: {
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 24,
        color: '#3F92C5',
    },
    data: {
        fontSize: 18,
        color: 'gray'
    }
})

export default CardNextVaccines