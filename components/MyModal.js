import React from 'react'
import{
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native'

import MyButtons from '../components/MyButtons';

const MyModal = (props) => {

    const {onPress} = props

    closeModal = (bool) => {
        props.changeModalVisible(bool);
    }

    confirmDelete = () =>{
        closeModal(false);
        return true;
    }

    return(
        <TouchableOpacity style={styles.container} disabled={true}>
           
            <View style={styles.modal}>
                <View style={styles.textView}>
                    <Text style={styles.texto}>Tem certeza que deseja </Text>
                    <Text style={styles.texto}> remover essa vacina</Text>
                </View>

                <View style={styles.buttonView}>
                    <MyButtons label="SIM" styleText={[styles.texto, {color: 'white'}]} style={[styles.button, {backgroundColor: '#FF8383'}]} 
                        onPress={onPress}
                    />
                    <MyButtons label="CANCELAR" styleText={[styles.texto, {color: 'white'}]} style={[styles.button, {backgroundColor: '#3F92C5'}]} 
                        onPress={() => closeModal(false)}
                    />
                </View>
            </View>
            
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        height: 140,
        width: Dimensions.get('window').width - 80,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#B9DFDB'
    },
    texto: {
        color: '#FD7979',
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 20
    },
    textView: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10
    },
    buttonView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    button: {
        padding: 10,
        width: Dimensions.get('window').width / 2 - 66,
    }
})

export default MyModal