import React, { useEffect, useState } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native'

import IconCalendar from '../components/IconCalendar'
import MyInputs from '../components/MyInputs'
import MyRadioButton from '../components/MyRadioButton'
import MyButtons from '../components/MyButtons'

const NewVaccine = (props) => {
        
        const resetFields = () => {
            setData('')
            setVacina('')
            setDose('')
            setProximaDose('')
        }

        const {item} = props.route.params;
        
        const [vacina, setVacina] = useState(item.vacina);
        const [data, setData] = useState(item.data);
        const [dose, setDose] = useState(item.dose);
        const [proximaDose, setProximaDose] = useState(item.proximaDose);
        
        const novaVacina = () => {
            const vac = {
                id: item.length + 1,
                vacina: vacina,
                data: data,
                dose: 'Dose única',
                urlImage: require('../images/comprovanteVacina.png'),
                proximaDose: proximaDose
            }
            resetFields();
            props.navigation.navigate('HomeContent', {item: vac, screen: 1});
        }

        console.log(props.route.params.idTela);

        return(
            <View style={styles.container}>

                <IconCalendar style={styles.icon} />
                
                <View style={styles.inputData}>
                    <MyInputs styleInput={styles.styleInput} styleText={styles.data} label="Data de vacinação" value={data} setValue={setData} />
                </View>

                <View style={styles.inputVacina}>
                    <MyInputs styleInput={styles.styleInput} styleText={styles.vacina} label="Vacina" value={vacina} setValue={setVacina} />
                </View>

                <View style={styles.radioContainer}>
                    <Text style={styles.label}>Dose</Text>
                    <MyRadioButton style={styles.radio} styleText={styles.styleText} label="1a. dose"/>
                    <MyRadioButton style={styles.radio} styleText={styles.styleText} label="2a. dose"/>
                    <MyRadioButton style={styles.radio} styleText={styles.styleText} label="3a. dose"/>
                </View>

                <View style={styles.radioContainer2}>
                    <MyRadioButton style={styles.radio} styleText={styles.styleText} label="Dose única" />
                </View>
                
                <View style={styles.comprovanteContainer}>
                    <Text style={styles.comprovanteText}>Comprovante</Text>
                    <MyButtons label="Selecionar imagem..." style={styles.buttonComprovante} styleText={styles.buttonComprovanteText} />
                </View>

                <View style={styles.containerImage}>
                    <Image style={styles.image} source={require('../images/comprovanteVacina.png')} />
                </View>

                <IconCalendar style={styles.icon2} />
                
                <View style={styles.inputDataProx}>
                    <MyInputs styleInput={styles.styleInput} styleText={styles.dataProx} label="Próxima de vacinação" value={proximaDose} setValue={setProximaDose} />
                </View>

                <View style={styles.buttonCadastrarContainer}>
                    <MyButtons label="Cadastrar" style={styles.buttonCadastrar} styleText={styles.buttonText} onPress={novaVacina}/>
                </View>

            </View>
            
        )
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        backgroundColor: '#ADD4D0',
    },
    buttonCadastrar: {
        backgroundColor: '#37BD6D',
        width: 180,
        padding: 5,
        elevation: 20
    },
    buttonText: {
        fontSize: 20,
    },
    buttonCadastrarContainer: {
        marginLeft: 115,
        marginTop: 100,
        width: 180,
    },
    containerImage: {
        width: 220,
        marginLeft: 163,
        marginTop: 10,
    },
    dataProx: {
        fontSize: 16,
        fontFamily: 'AveriaLibre-Regular',
    },
    inputDataProx: {
        marginLeft: 127,
        width: '45%',
    },
    image: {
        width: 220,
        height: 100,
    },
    buttonComprovante: {
        width: 160,
        height: 25,
        marginLeft: 5,
        backgroundColor: '#419ED7',
        elevation: 20
    },
    comprovanteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 56,
        marginTop: 10
    },
    comprovanteText: {
        fontSize: 17,
        fontFamily: 'AveriaLibre-Regular',
        color: 'white',
    },
    buttonComprovanteText: {
        fontSize: 15,
        height: 25,
        marginTop: 3
    },
    styleInput: {
        height: 30,
        padding: 0
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 12,
        marginTop: -10
    },
    styleText: {
        fontSize: 14,
        marginLeft: -5
    },
    radioContainer2: {
        marginLeft: 155
    },
    radio: {
        height: 15,
        width: 15,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    label: {
        fontSize: 17,
        fontFamily: 'AveriaLibre-Regular',
        color: 'white',
    }, 
    data: {
        fontSize: 17,
        fontFamily: 'AveriaLibre-Regular',
        width: 150,
    },
    inputData: {
        marginTop: 20,
        marginLeft: 127,
        width: '45%',
    },
    icon: {
        marginTop: 37,
        position: 'absolute',
        zIndex: 1,
        marginLeft: 284,
    },
    icon2: {
        marginTop: 16,
        position: 'absolute',
        zIndex: 1,
        marginLeft: 284,
    },
    vacina: {
        fontSize: 17,
        fontFamily: 'AveriaLibre-Regular',
    },
    inputVacina: {
        marginLeft: 110,
        marginTop: -20,
        width: 270
    },
})

export default NewVaccine
