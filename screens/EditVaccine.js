import React, { useEffect, useState } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Image,
    Modal
} from 'react-native'

import IconCalendar from '../components/IconCalendar'
import MyInputs from '../components/MyInputs'
import MyRadioButton from '../components/MyRadioButton'
import MyButtons from '../components/MyButtons'
import IconTrash from '../components/IconTrash'
import MyModal from '../components/MyModal'

const EditVaccine = (props) => {

    const {item} = props.route.params.item;
    const [id, setId] = useState(item.id);
    const [vacina, setVacina] = useState(item.vacina);
    const [data, setData] = useState(item.data);
    const [dose, setDose] = useState(item.dose);
    const [proximaDose, setProximaDose] = useState(item.proximaDose);

    const [visible, setVisible] = useState(false);

    const changeModalVisible = (bool) => {
        setVisible(bool);
    }
    const confirmDelete = (bool) => {
        if(bool){
            const vac = item;
            setVisible(false);
            props.navigation.navigate('HomeContent', {item: vac, screen: 2})
        }else{
            
        }
    }

    const showVaccine = () => {
        console.log(item);
    }

    return(
        
        <View style={styles.container}>

            <IconCalendar style={styles.icon} />
            
            <View style={styles.inputData}>
                <MyInputs styleInput={styles.styleInput} styleText={styles.data} label="Data de vacinação" value={item.data}/>
            </View>

            <View style={styles.inputVacina}>
                <MyInputs styleInput={styles.styleInput} styleText={styles.vacina} label="Vacina" value={item.vacina}/>
            </View>

            <View style={styles.radioContainer}>
                <Text style={styles.label}>Dose</Text>
                <MyRadioButton style={styles.radio} styleText={styles.styleText} label="1a. dose" whichSelected={'first'}/>
                <MyRadioButton style={styles.radio} styleText={styles.styleText} label="2a. dose" />
                <MyRadioButton style={styles.radio} styleText={styles.styleText} label="3a. dose" />
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
                <MyInputs styleInput={styles.styleInput} styleText={styles.dataProx} label="Próxima de vacinação" value={item.proximaDose}/>
            </View>

            <View style={styles.buttonSalvarContainer}>
                <MyButtons label="Salvar alterções" style={styles.buttonSalvar} styleText={styles.buttonText} onPress={showVaccine}/>
            </View>
            
            <IconTrash style={styles.iconTrash} />

            <View style={styles.buttonExcluirContainer}>
                <MyButtons label="Excluir" style={styles.buttonExcluir} styleText={[styles.buttonText, {marginLeft: 30}]} onPress={() => changeModalVisible(true)} />
                <Modal
                    transparent={true}
                    animationType='fade' //Modo em que o modal irá aparecer
                    visible={visible}
                    onRequestClose={() => changeModalVisible(false)}
                >
                    <MyModal changeModalVisible={changeModalVisible} item={item} onPress={confirmDelete}/>
                </Modal>
            </View>
        </View>
    ); 
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        backgroundColor: '#ADD4D0',
    },
    buttonSalvar: {
        backgroundColor: '#37BD6D',
        width: 180,
        padding: 5,
        elevation: 20
    },
    buttonText: {
        fontSize: 20,
    },
    buttonSalvarContainer: {
        marginLeft: 115,
        marginTop: 30,
        width: 180,
    },
    buttonExcluir: {
        backgroundColor: '#FD7979',
        width: 130,
        marginLeft: 140,
        padding: 5,
        elevation: 20
    },
    buttonExcluirContainer: {
        marginTop: Dimensions.get('window').height - 610,
        width: 130
    },
    iconTrash: {
        marginTop: Dimensions.get('window').height - 623,
        position: 'absolute',
        zIndex: 1,
        marginLeft: 140,
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

export default EditVaccine
