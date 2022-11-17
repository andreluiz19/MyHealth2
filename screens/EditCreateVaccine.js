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

import { db } from '../config/firebase';
import { useSelector } from 'react-redux';
import { onSnapshot, query, doc, deleteDoc, add, addDoc, collection, setDoc, getDoc, DocumentReference} from 'firebase/firestore';

const EditCreateVaccine = (props) => {

    const uid = useSelector((state) => state.login.idUser);

    const idTela = props.route.params.idTela;

    const [vacina, setVacina] = useState('Dengue');
    const [data, setData] = useState('19/11/2022');
    const [dose, setDose] = useState('1a. Dose');
    const [proximaDose, setProximaDose] = useState('19/05/2023');
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(0);

    const vac ={
        vacina: vacina,
        data: data,
        dose: dose,
        proximaDose: proximaDose,
    }
    
    const q = query(collection(db, "users"));

    const changeModalVisible = (bool) => {
        setVisible(bool);
    }
    /*
    const searchCollectionID = () => {
        onSnapshot(q, (result) => {
            result.forEach((doc) => {
                if(doc.data().userUID == uid){
                    //console.log(doc.data().userUID);
                    newVaccine(doc.id);
                }
            })
        })
    }
    */
    
    const newVaccine = () => {
        //console.log(idCollection);
        
        

        /*
        addDoc(collection(db, "users/"+idCollection+"/vacinas"), {
            vacina: vacina,
            data: data,
            dose: dose,
            proximaDose: proximaDose,
        })
        .then((result) => {
            console.log("Vacina cadastrada com sucesso!");
            alert("Vacina cadastrada com sucesso!");
            props.navigation.pop();
        })  
        .catch((error) => {
            alert("Erro ao cadastras vacina!");
            console.log("Erro ao cadastras vacina!", error);
        })
        */
        /*
        const urlCollection = "users/"+idCollection+"/vacians";
        addDoc(collection(db, "users"), {
            vacina: vacina,
            data: data,
            dose: dose,
            proximaDose: proximaDose,
            imageUrl: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.paho.org%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmax_1500x1500%2Fpublic%2F2022-08%2Fgeneric-vaccine-1500x1000.jpg%3Fitok%3DIoGkc1TM&imgrefurl=https%3A%2F%2Fwww.paho.org%2Fpt%2Fnoticias%2F5-8-2022-paises-aprovam-resolucao-para-apoiar-acesso-equitativo-vacina-contra-variola-dos&tbnid=U-RfaclWAFjEgM&vet=12ahUKEwjxpoyM2LX7AhVAOLkGHf-BBPEQMygAegUIARCIAQ..i&docid=ByQrUIjfn4U6LM&w=1420&h=947&q=vacina&ved=2ahUKEwjxpoyM2LX7AhVAOLkGHf-BBPEQMygAegUIARCIAQ'
        })
        .then((result) => {
            console.log("Vacina cadastrada com sucesso!");
            alert("Vacina cadastrada com sucesso!");
            props.navigation.pop();
        })  
        .catch((error) => {
            alert("Erro ao cadastras vacina!");
            console.log("Erro ao cadastras vacina!", error);
        })
        */
       
    }
    
    
    useEffect(() => {
        onSnapshot(q, (result) => {
            const vacinas = [];
            result.forEach((doc) => {
                if(doc.data().userUID == uid){
                    console.log(doc);
                }
            })
        })
    })

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
                            <MyButtons label="Salvar alterações" style={styles.buttonSalvar} styleText={styles.buttonText} />
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
