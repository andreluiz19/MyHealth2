import React from 'react'

import {
    Text,
    View,
    StyleSheet,
} from 'react-native'

const CardNextVaccines = (props) => {

    const {label, data, style} = props

    return(

        <View style={[styles.container, style]}>
            <View style={styles.box}>
                <Text style={styles.texto}>{label}</Text>
                <Text style={styles.data}>{data}</Text>
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
        height: 60,
        width: '100%'
    },
    texto: {
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 22,
        color: '#3F92C5',
        paddingTop: 10,
        paddingLeft: 10
    },
    data: {
        paddingLeft: 10,
        color: 'gray'
    }
})

export default CardNextVaccines