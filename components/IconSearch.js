import React from 'react';
import {
    View,
    Image,
    StyleSheet
} from 'react-native'

const IconSearch = (props) =>{

    const {style} = props

    return(
        <View style={styles.container}>
            <Image style={[styles.icon, style]} source={require('../images/search.png')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },  
    icon: {
        width: 25,
        height: 25,
        left: 20,
        top: 20
    }
})
export default IconSearch