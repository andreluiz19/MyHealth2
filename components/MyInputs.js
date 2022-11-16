import React from 'react';

import {
    Text,
    View,
    TextInput,
    StyleSheet
} from 'react-native';

const MyInputs = (props) => {

    const {placeholder, label, value, setValue, secure, style, styleText, styleInput} = props;

    return (
        <View style={[styles.screen, style]}>
            <Text style={[styles.texto, styleText]}>{label}</Text>
            <TextInput placeholder={placeholder} 
                        style={[styles.input, styleInput]}
                        value={value} 
                        onChangeText={setValue}
                        secureTextEntry={secure}
            />
            
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
        height: 60,
    },
    texto: {
        fontSize: 22,
        color: 'white',
        padding: 5,
        fontFamily: 'AveriaLibre-Regular',
    },
    input: {
        fontSize: 18,
        backgroundColor: 'white',
        color: '#419ED7',
        width: '80%',
        fontFamily: 'AveriaLibre-Regular',
    },
})
export default MyInputs;