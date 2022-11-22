import React, { useEffect, useState } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    Image,
    Modal,
    Alert
} from 'react-native'

import IconCalendar from '../components/IconCalendar';
import MyInputs from '../components/MyInputs';
import MyButtons from '../components/MyButtons';
import IconTrash from '../components/IconTrash';
import MyModal from '../components/MyModal';
import Radio from '../components/Radio';

import { db } from '../config/firebase';
import { useSelector } from 'react-redux';
import { query, deleteDoc, addDoc, collection, doc, getDoc, updateDoc} from 'firebase/firestore';
import { useBackHandler } from '@react-native-community/hooks';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const EditCreateVaccine = (props) => {

    const uid = useSelector((state) => state.login.idUser);

    const idTela = props.route.params.idTela;
    const id = props.route.params.id;

    const [vacina, setVacina] = useState('');
    const [data, setData] = useState('');
    const [dose, setDose] = useState('');
    const [proximaDose, setProximaDose] = useState('');
    const [urlImage, setUrlImage] = useState('');
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState();
    const urlVacina = "users/"+uid+"/vacinas";
    const [isRefresh, setIsRefresh] = useState(true);

    const changeModalVisible = (bool) => {
        setVisible(bool);
    }

    const resetFields = () => {
        setVacina('');
        setData('');
        setDose('');
        setProximaDose('');
        setSelected();
    }
    
    
    useBackHandler(() => {
        if(isRefresh){
            //console.log(isRefresh);
            setIsRefresh(!isRefresh);
        }else{
            //console.log(isRefresh);
            setIsRefresh(!isRefresh);
        }
    });
    
    
    useEffect(() => {
        if(id){
            getDoc(doc(db, urlVacina, id))
            .then((result) => {
                setVacina(result.data().vacina);
                setData(result.data().data);
                setDose(result.data().dose);
                setProximaDose(result.data().proximaDose);
                if(dose == '1a. dose'){
                    setSelected(0);
                }else if(dose == '2a. dose'){
                    setSelected(1);
                }else if(dose == '3a. dose'){
                    setSelected(2);
                }else if(dose == 'Dose única'){
                    setSelected(3);
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }else{
            resetFields();
        }
        
    }, [isRefresh, id]);
    
    const newVaccine = () => {
        addDoc(collection(db, urlVacina), {
            vacina: vacina,
            data: data,
            dose: dose,
            proximaDose: proximaDose,
            urlImage: urlImage
        })
        .then((result) => {
            console.log("Cadastrou!");
            alert("Vacina cadastrada com sucesso!");
            props.navigation.navigate('HomeContent');
        })
        .catch((error) => {
            console.log("Não Cadastrou!");
            alert("Erro ao cadastrar vacina!");
            console.log(error);
        })
        
        
    }

    const removeVaccine = () => {
        deleteDoc(doc(db, urlVacina, id))
        .then(() => {
            alert("Vacina deletada com sucesso!");
            props.navigation.navigate('HomeContent');
        })
        .catch((error) => {
            alert("Erro ao deletar vacina!");
            console.log(error);
        })
    }

    const confirmDelete = (bool) => {
        if(bool){
            removeVaccine();
            setVisible(false);
            props.navigation.navigate('HomeContent');
        }else{
            
        }
    }

    const updateVaccine = () => {
        updateDoc(doc(db, urlVacina, id), {
            vacina: vacina,
            data: data,
            dose: dose,
            proximaDose: proximaDose,
            urlImage: urlImage
        })
        .then((result) => {
            console.log("Vacina editar com sucesso!");
            props.navigation.navigate('HomeContent');
        })
        .catch((error) => {
            console.log("Erro ao cadastrar vacina!");
            console.log(error);
        })
    }

    const imageOptions = () => {
        Alert.alert("Selecionar Imagem", "Você deseja selecionar uma imagem da galeria ou abrir a câmera?", [
            {
                text: "Voltar",
                cancelable: true,
                style: "cancel"
            },
            {
                text: "Galeria",
                onPress: () => showGallery()
            },
            {
                text: "Câmera",
                onPress: () => showCamera()
            },
        
        ])
    }

    const showGallery = () => {
        launchImageLibrary()
        .then((result) => {
            console.log(result.assets[0].uri);
        })
        .catch((error) => {
            console.log("Erro ao selecionar imagem!");
            console.log(error);
        })
    }

    const showCamera = () => {
        launchCamera()
        .then((result) => {
            console.log(result.assets[0].uri);
        })
        .catch((error) => {
            console.log("Erro ao selecionar imagem!");
            console.log(error);
        })
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

            <Text style={styles.label}>Dose</Text>

            <View style={styles.radioContainer}>
                <Radio options={['1a. dose', '2a. dose', '3a. dose', 'Dose única']}
                        selected={selected} 
                        horizontal={true} 
                        onChangeSelect={(opt, i) => {
                            setSelected(i);
                            setDose(opt)
                        }} 
                        style={styles.radioStyle}
                    />
            </View>
            
            <View style={styles.comprovanteContainer}>
                <Text style={styles.comprovanteText}>Comprovante</Text>
                <MyButtons label="Selecionar imagem..." style={styles.buttonComprovante} styleText={styles.buttonComprovanteText} onPress={imageOptions}/>
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
                            <MyButtons label="Salvar alterações" style={styles.buttonSalvar} styleText={styles.buttonText} onPress={updateVaccine}/>
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
                                <MyModal changeModalVisible={changeModalVisible} onPress={confirmDelete}/>
                            </Modal>
                        </View>
                    </>
                    :
                    <View>
                        <View style={styles.buttonCadastrarContainer}>
                            <MyButtons label="Cadastrar" style={styles.buttonCadastrar} styleText={styles.buttonText} onPress={newVaccine}/>
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
        marginTop: 50,
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
        marginTop: Dimensions.get('window').height - 600,
        width: 130
    },
    iconTrash: {
        marginTop: Dimensions.get('window').height - 613,
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
    },
    radioStyle: {
        flexWrap: 'wrap',
        marginLeft: 150,
    },
    styleText: {
        fontSize: 14,
        marginLeft: -5
    },
    label: {
        fontSize: 17,
        fontFamily: 'AveriaLibre-Regular',
        color: 'white',
        position: 'absolute',
        marginTop: 120,
        marginLeft: 120
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
