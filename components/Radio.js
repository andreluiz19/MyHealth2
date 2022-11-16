import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Radio = ({options = [], 
    horizontal = false, 
    onChangeSelect, 
    selected,
}) => {

    return(
        <View style={horizontal ? styles.horizontal : styles.vertical}>
            {
                options.map((opt, index) => (
                    <TouchableOpacity onPress={() => onChangeSelect(opt, index)} 
                        style={[styles.container]}
                    >
                        <View style={styles.outlineCircle}>
                            {selected == index && <View style={styles.innerCircle}/>}
                        </View>
                        <Text style={styles.texto}>{opt}</Text>
                    </TouchableOpacity>        
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 6
    },
    horizontal: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    outlineCircle: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderColor: 'white',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#419ED7',
    },
    texto: {
        fontSize: 15,
        fontFamily: 'AveriaLibre-Regular',
        color: 'white',
        marginLeft: 4,
    }
})

export default Radio