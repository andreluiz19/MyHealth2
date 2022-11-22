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

import { db, storage } from '../config/firebase';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { reducerSetVacina } from '../redux/vacinaSlice';
import { deleteDoc, addDoc, collection, doc, getDoc, updateDoc} from 'firebase/firestore';
import { useBackHandler } from '@react-native-community/hooks';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { uploadBytes, ref, getDownloadURL, deleteObject } from 'firebase/storage';

const EditCreateVaccine = (props) => {

    const uid = useSelector((state) => state.login.idUser);
    const id = useSelector((state) => state.vacina.id);
    const [vacina, setVacina] = useState('');
    const [data, setData] = useState('');
    const [dose, setDose] = useState('');
    const [proximaDose, setProximaDose] = useState('');
    const [urlImage, setUrlImage] = useState('');
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState();
    const urlVacina = "users/"+uid+"/vacinas";
    const [isRefresh, setIsRefresh] = useState(true);
    const dispatch = useDispatch();
    const [pathImage, setPathImage] = useState(null);
    const dataFormatada = data.split('/');
    const proxDoseFormatada = proximaDose.split('/');

    const changeModalVisible = (bool) => {
        setVisible(bool);
    }

    const resetFields = () => {
        setVacina('');
        setData('');
        setDose('');
        setProximaDose('');
        setUrlImage('');
        setPathImage(null);
        setSelected();
    }
    
    useBackHandler(() => {
        if(isRefresh){
            //console.log(isRefresh);
            dispatch(reducerSetVacina({
                id: null
            }))
            setIsRefresh(!isRefresh);
        }else{
            //console.log(isRefresh);
            dispatch(reducerSetVacina({
                id: null
            }))
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
                setUrlImage(result.data().urlImage);
                setPathImage(result.data().pathImage);
                if(result.data().dose == '1a. dose'){
                    setSelected(0);
                }else if(result.data().dose == '2a. dose'){
                    setSelected(1);
                }else if(result.data().dose == '3a. dose'){
                    setSelected(2);
                }else if(result.data().dose == 'Dose única'){
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

    const newVaccine = async () => {
        const dados = await fetch(urlImage);
        const blob = await dados.blob();
        const filename = "images/"+urlImage.split("-")[urlImage.split("-").length-1];

        uploadBytes(ref(storage, filename), blob)
        .then((result) => {
            console.log("Arquivo enviado com sucesso!");
            getDownloadURL(ref(storage, filename))
            .then((url) => {
                console.log("URL: "+url);
                //const date = new Date(dataFormatada[2], dataFormatada[1], dataFormatada[0], 0, 0, 0, 0);
                //const nextDate =  new Date(proxDoseFormatada[2], proxDoseFormatada[1], proxDoseFormatada[0], 0, 0, 0, 0);
                addDoc(collection(db, urlVacina), {
                    vacina: vacina,
                    data: data,
                    dose: dose,
                    proximaDose: proximaDose,
                    urlImage: url,
                    pathImage: filename
                })
                .then((result) => {
                    console.log("Cadastrou!");
                    alert("Vacina cadastrada com sucesso!");
                    resetFields();
                    props.navigation.navigate('HomeContent');
                })
                .catch((error) => {
                    console.log("Não Cadastrou!");
                    alert("Erro ao cadastrar vacina!");
                    console.log(error);
                })
            })
            .catch((error) => {
                console.log("Erro ao obter link de download!");
                console.log(error)
            })
        })
        .catch((error) => {
            console.log("Erro ao enviar arquivo!");
            console.log(error);
        })
    }

    const removeVaccine = () => {
        deleteObject(ref(storage, pathImage))
        .then(() => {
            deleteDoc(doc(db, urlVacina, id))
            .then(() => {
                resetFields();
                alert("Vacina deletada com sucesso!");
                props.navigation.navigate('HomeContent');
            })
            .catch((error) => {
                alert("Erro ao deletar vacina!");
                console.log(error);
            })
        })
        .catch((error) => {
            console.log("Erro ao excluir arquivo!");
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

    const updateVaccine = async () => {
        const dados = await fetch(urlImage);
        const blob = await dados.blob();

        uploadBytes(ref(storage, pathImage), blob)
        .then((result) => {
            console.log("Arquivo atualizado com sucesso!");
            updateDoc(doc(db, urlVacina, id), {
                vacina: vacina,
                data: data,
                dose: dose,
                proximaDose: proximaDose,
                urlImage: urlImage,
                pathImage: pathImage
            })
            .then((result) => {
                console.log("Vacina editada com sucesso!");
                props.navigation.navigate('HomeContent');
            })
            .catch((error) => {
                console.log("Erro ao editar vacina!");
                console.log(error);
            })
        })
        .catch((error) => {
            console.log("Erro ao atualizar arquivo");
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
            setUrlImage(result.assets[0].uri);
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
            setUrlImage(result.assets[0].uri);
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
                {
                    urlImage ?
                        <Image style={styles.image} source={{ uri: urlImage }} />
                    :
                    null
                }
            </View>

            <IconCalendar style={styles.icon2} />
            
            <View style={styles.inputDataProx}>
                <MyInputs styleInput={styles.styleInput} styleText={styles.dataProx} label="Próxima de vacinação" value={proximaDose} setValue={setProximaDose}/>
            </View>
            {
                id ?
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
