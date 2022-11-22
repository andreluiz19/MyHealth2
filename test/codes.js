/* Alguns códigos que testei

<RadioButton
    value={label}
    uncheckedColor='white'
    color='#419ED7'
    status={ checked === true ? 'checked' : 'unchecked'}
    onPress={() => setChecked(!checked)}
/>
<Text style={[styles.texto, styleText]}>{label}</Text>


<RadioButton.Group>
    <View style={styles.fundo}></View>
    <RadioButton.Item
        value='first'
        style={styles.button}
        labelStyle={styles.texto}
        label={label}
        position='leading' //Inverte o lado do texto
        color='#419ED7'
        uncheckedColor='white'
        status={ checked === true ? 'checked' : 'unchecked'}
        onPress={() => setChecked(!checked)}
    >
    </RadioButton.Item>
</RadioButton.Group>

<View style={styles.container}>
    <TouchableOpacity style={[styles.radio, style]}/>
    <Text style={[styles.texto, styleText]}>{label}</Text>
</View>

borderColor: 'black',
borderWidth: 1,

<Button title='teste' onPress={() => console.log(listaVacinas)}>Teste</Button>


<Text style={styles.label}>Sexo</Text>
<MyRadioButton label="Masculino" value={sexo} setValue={setSexo} />
<MyRadioButton label="Feminino" value={sexo} setValue={setSexo} />

<View style={styles.radioContainer}>
<Text style={styles.label}>Dose</Text>
<MyRadioButton style={styles.radio} styleText={styles.styleText} label="1a. dose" whichSelected={'first'}/>
<MyRadioButton style={styles.radio} styleText={styles.styleText} label="2a. dose" />
<MyRadioButton style={styles.radio} styleText={styles.styleText} label="3a. dose" />
</View>

<View style={styles.radioContainer2}>
<MyRadioButton style={styles.radio} styleText={styles.styleText} label="Dose única" />
</View>

<Drawer.Screen name="EditCreateVaccine" component={EditCreateVaccine} 
                options={{
                    drawerItemStyle: {
                        display: 'none'
                    },
                    title: "Minhas vacinas",
                    headerStyle: {
                        backgroundColor: '#C1E7E3',
                    },
                    headerTitleStyle: {
                        fontFamily: 'AveriaLibre-Regular',
                        fontSize: 26,
                        color: '#419ED7',
                    },
                }}
            />

const dispatch = useDispatch();
 dispatch(reducerSetLogin({
            email: email, 
            password: senha,
            idUser: userUID,
            idDoc: result.id
        }))

item={item} onPress={confirmDelete}


useBackHandler(() => {
        if(isRefresh){
            console.log(isRefresh);
            setIsRefresh(!isRefresh);
        }else{
            console.log(isRefresh);
            setIsRefresh(!isRefresh);
        }
    });

    <IconSearch style={styles.icon}></IconSearch>

    position: 'absolute',
        zIndex: 1,

        data={vacinas.filter((vacina) => {
                    vacina.vacina.includes(searchString)
                    console.log(vacina.vacina)
                }
            )}


<IconSearch style={styles.icon}></IconSearch>
                <MyInputs styleInput={styles.input} styleText={styles.text} placeholder="       PESQUISAR VACINA..." 
                    value={searchString} setValue={setSearchString}
                />


<Image style={styles.image} source={require('../images/comprovanteVacina.png')} />

useEffect(() => {
        const backAction = () => {
            Alert.alert("Atenção!", "Você tem certeza que deseja sair?", [
                {
                    text: "Cancelar",
                    onPress: () => null,
                    style: "cancel"
                },
                { 
                    text: "Sim", onPress: () => BackHandler.exitApp() 
            
                }
            ]);
            return true;
        };
    
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
    })
*/