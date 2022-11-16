import React, { useState, useEffect } from 'react'
import {
    View,
    Image,
    StyleSheet,
    Text,
    ImageBackground,
    Dimensions
} from 'react-native'

import MyInputs from '../components/MyInputs';
import MyButtons from '../components/MyButtons';

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase';

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [errorAuth, setErrorAuth] = useState()

    const loginUser = () => {
        /*
        signInWithEmailAndPassword(auth, email, senha)
        .then( (userCredential) => {
            console.log("Usuário autenticado com sucesso!");
            setErrorAuth('');
            setEmail('');
            setSenha('');
            goToHome();
        })
        .catch( (error) => {
            console.log("Ocorreu um erro ao atuenticar!");
            console.log("Erro: " + error.message);
            setErrorAuth('E-mail e/ou senha inválidos.');
        })
        */
        goToHome();
    }

    const goToHome = () => {
        props.navigation.navigate('Home')
    }

    const goToCreateAccount = () => {
        props.navigation.navigate('CreateAccount')
    }

    const goToForgotPassword = () => {
        props.navigation.navigate('ForgotPassword')
    }

    return(
        <ImageBackground style={styles.imagem} source={require('../images/background.jpg')} >
            
            <View style={styles.container}>

                <View style={styles.header}>
                    <Image style={styles.icon} source={require('../images/vaccine.png')} />
                    <Text style={styles.title}>MyHealth</Text>
                </View>

                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Controle as suas vacinas e fique seguro</Text>
                </View>

                <View style={styles.inputs}>
                    <MyInputs placeholder="Digite o seu email..." label="E-mail" value={email} setValue={setEmail} />
                    <MyInputs placeholder="Digite a sua senha..." label="Senha" value={senha} setValue={setSenha} secure={true} />
                    {errorAuth && <Text style={styles.errorAuth}>{errorAuth}</Text>}
                </View>

                <View style={styles.buttonView}>
                    <View>
                        <MyButtons label="Entrar" style={styles.buttonEntrar} onPress={loginUser} />
                    </View>
                    <View>
                        <MyButtons label="Criar minha conta" style={styles.buttonCriarConta} onPress={goToCreateAccount} />
                    </View>
                    <View>
                        <MyButtons label="Esqueci minha senha" style={styles.buttonEsqueceuSenha} onPress={goToForgotPassword} />
                    </View>
                </View>
                
            </View>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(212,212,212, 0.9)',
        height: '100%'
    },
    imagem: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    title: {
        color: '#419ED7',
        fontSize: 40,
        marginTop: 20,
        textDecorationLine: 'underline',
        fontFamily: 'AveriaLibre-Bold',
    },
    icon: {
        marginTop: 20,
        width: 40,
        height: 40,
        marginRight: 10
    },
    header: {
        flexDirection: 'row', 
        alignItems: 'center',
    },
    labelContainer: {
        marginTop: 0,
    },  
    label: {
        fontSize: 34,
        fontFamily: 'AveriaLibre-Regular',
        color: '#419ED7',
        textAlign: 'center',
        paddingRight: 15,
        paddingLeft: 15,
        marginTop: 30,
    },
    inputs: {
        marginTop: Dimensions.get('window').height * 0.05,
        width: '90%'
    },
    buttonEntrar: {
        backgroundColor: '#37BD6D',
        width: 160,
        padding: 10,
        elevation: 10
    },
    buttonCriarConta: {
        backgroundColor: '#419ED7',
        width: 240,
        padding: 10,
        elevation: 10
    },
    buttonEsqueceuSenha: {
        backgroundColor: '#B0CCDE',
        width: 240,
        padding: 4,
        elevation: 10
    },
    width: {
        width: '80%'
    },
    errorAuth: {
        color: 'red',
        marginLeft: 75,
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 16
    },
    buttonView: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: Dimensions.get('window').height * 0.5
    }
})

export default Login;