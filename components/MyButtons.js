import React, { useState } from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

const MyButtons = (props) =>{
    
    const {label, onPress, style, styleText} = props;

    
    return(
        <View>
            <TouchableOpacity style={style} onPress={onPress}>
                <Text style={[styles.texto, styleText]}>{label}</Text>
            </TouchableOpacity>
        </View>
    );
    
}

const styles = StyleSheet.create({
    texto: {
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 22,
        color: 'white',
        textAlign: 'center',
    },

})

export default MyButtons;
