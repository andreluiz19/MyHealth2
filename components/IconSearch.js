import React from 'react';
import {
    View,
    Image,
    StyleSheet
} from 'react-native'

const IconSearch = (props) =>{

    const {style} = props

    return(
        <View>
            <Image style={[styles.icon, style]} source={require('../images/search.png')} />
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        width: 25,
        height: 25,
        marginRight: 15,
        top: 17,
        left: 13
    }
})
export default IconSearch