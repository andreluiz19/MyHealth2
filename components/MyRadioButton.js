import React, { useState } from 'react';
import { RadioButton } from 'react-native-paper';
import {
    View,
    StyleSheet,
    Text,
} from 'react-native'

const MyRadioButton = (props) => {

    const {label, value, setValue, style, styleText, whichSelected} = props
    
    const [checked, setChecked] = useState();

    return(

        <View style={styles.container}>
                <View style={styles.fundo}></View>
                <RadioButton
                    value={label}
                    uncheckedColor='white'
                    color='#419ED7'
                    status={ checked === true ? 'checked' : 'unchecked'}
                    onPress={() => setChecked(!checked)}
                />
                <Text style={[styles.texto, styleText]}>{label}</Text>

        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },  
    radio: {
        backgroundColor: 'white',
        height: 25,
        width: 25,
        borderRadius: 15,
        marginLeft: 10
    },
    button: {
        marginLeft: -15,
        height: 40,
    },
    texto: {
        fontSize: 18,
        fontFamily: 'AveriaLibre-Regular',
        color: 'white',
    },
    fundo: {
        backgroundColor: 'white',
        height: 18,
        width: 18,
        borderRadius: 10,
        position: 'absolute',
        marginLeft: 10,
        marginTop: 10,
    }
})

export default MyRadioButton