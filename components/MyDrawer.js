import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";

import {
    Image,
    View,
    Text,
    StyleSheet
} from 'react-native'

const MyDrawer = (props) => {
    return(
        <DrawerContentScrollView {...props}>
            <View style={styles.container}>
                <Text style={styles.texto}>Olá Jurandir</Text>
            </View>

            <View style={styles.line}>

            </View>

            <DrawerItemList {...props} />
            <DrawerItem icon={() => 
                (<Image style={styles.icon} 
                    source={require('../images/logout-green.png')} 
                />)} 
                label="Sair" onPress={() => {props.navigation.pop()}}
                labelStyle={{fontSize: 22, color: '#419ED7', fontFamily: 'AveriaLibre-Regular', marginLeft: -20}}
            />
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },
    texto: {
        fontSize: 26,
        fontFamily: 'AveriaLibre-Regular',
        color: '#419ED7',
    },
    line: {
        borderWidth: 1,
        borderColor: '#419ED7',
        width: '80%',
        marginLeft: 25
    },
    icon: {
        width: 25,
        height: 25,
    }
})

export default MyDrawer