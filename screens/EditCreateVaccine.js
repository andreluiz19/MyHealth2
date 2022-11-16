import React, { useEffect, useState } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Image,
    Modal
} from 'react-native'

import IconCalendar from '../components/IconCalendar';
import MyInputs from '../components/MyInputs';
import MyButtons from '../components/MyButtons';
import IconTrash from '../components/IconTrash';
import MyModal from '../components/MyModal';
import Radio from '../components/Radio';

const EditCreateVaccine = (props) => {

    

    const resetFields = () => {
        setData('')
        setVacina('')
        setDose('')
        setProximaDose('')
    }

    const idTela = props.route.params.idTela;

    if(idTela == 1){
        var {item} = props.route.params.item;
        var [vacina, setVacina] = useState(item.vacina);
        var [data, setData] = useState(item.data);
        var [dose, setDose] = useState(item.dose);
        var [proximaDose, setProximaDose] = useState(item.proximaDose);
        if(dose == '1a. dose'){
            var [selected, setSelected] = useState(0);
        }else if(dose == '2a. dose'){
            var [selected, setSelected] = useState(1);
        }else if(dose == '3a. dose'){
            var [selected, setSelected] = useState(2);
        }else{
            var [selected, setSelected] = useState(3);
        }
    }else if(idTela == 2){
        var [vacina, setVacina] = useState();
        var [data, setData] = useState();
        var [dose, setDose] = useState();
        var [proximaDose, setProximaDose] = useState();
        var [selected, setSelected] = useState(3);
    }

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

    const novaVacina = () => {
        const qtd = props.route.params.qtd
        const vac = {
            id: qtd + 1,
            vacina: vacina,
            data: data,
            dose: dose,
            urlImage: require('../images/comprovanteVacina.png'),
            proximaDose: proximaDose
        }
        resetFields();
        props.navigation.navigate('HomeContent', {item: vac, screen: 1});
    }

    const showVaccine = () => {
        console.log(item);
    }

    return(
        
        <View style={styles.container}>

            <IconCalendar style={styles.icon} />
            
            <View style={styles.inputData}>
                <MyInputs styleInput={styles.styleInput} styleText={styles.data} label="Data de vacinação" value={data} setValue={setData}/>
            </View>

            <View style={styles.inputVacina}>
                <MyInputs styleInput={styles.styleInput} styleText={styles.vacina} label="Vacina" value={vacina} setValue={setVacina}/>
            </View>

            <View style={styles.radioContainer}>
                <Text style={styles.label}>Dose</Text>
                <Radio options={['1a. dose', '2a. dose', '3a. dose', 'Dose única']}
                        selected={selected} 
                        horizontal={true} 
                        onChangeSelect={(opt, i) => {
                            setSelected(i);
                            setDose(opt)
                        }} 
                    />
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
                <MyInputs styleInput={styles.styleInput} styleText={styles.dataProx} label="Próxima de vacinação" value={proximaDose} setValue={setProximaDose}/>
            </View>
            {
                idTela == 1 ?
                    <>
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
                    </>
                    :
                    <View>
                        <View style={styles.buttonCadastrarContainer}>
                            <MyButtons label="Cadastrar" style={styles.buttonCadastrar} styleText={styles.buttonText} onPress={novaVacina}/>
                        </View>
                    </View>
            }
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
        justifyContent: 'flex-end',
        marginRight: 10
    },
    styleText: {
        fontSize: 14,
        marginLeft: -5
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
    buttonCadastrar: {
        backgroundColor: '#37BD6D',
        width: 180,
        padding: 5,
        elevation: 20
    },
    buttonCadastrarContainer: {
        marginLeft: 115,
        marginTop: 100,
        width: 180,
    },
})

export default EditCreateVaccine
