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

*/