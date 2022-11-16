import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native'

import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase';

import MyInputs from '../components/MyInputs';
import MyButtons from '../components/MyButtons';

const ForgotPassword = () =>{

    const [email, setEmail] = useState()

    const forgotPassword = () => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log("Email de redefinição enviado com sucesso!")
        })
        .catch(() => {
            console.log("Erro ao enviar email de redefinição!")
        })
    }

    return(
        <View style={styles.container}>

            <View style={styles.input}>
                <MyInputs placeholder="Digite seu email..." styleText={styles.texto} label="E-mail" value={email} setValue={setEmail} />
            </View>

            <View style={styles.center}>
                <MyButtons label="Recuperar senha" style={styles.buttonRecuperar} onPress={forgotPassword} />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ADD4D0',
        height: '100%',
        paddingTop: 200,
    },
    texto: {
        fontSize: 18,
        fontFamily: 'AveriaLibre-Regular',
    },
    buttonRecuperar: {
        marginTop: 170,
        backgroundColor: '#37BD6D',
        width: 200,
        padding: 10,
        elevation: 10,
    },
    center: {
        alignItems: 'center'
    },
    input: {
        width: '90%'
    }
})
export default ForgotPassword