import React from 'react';
import {
    View,
    Image,
    StyleSheet
} from 'react-native'

const IconHeader = () =>{
    return(
        <View>
            <Image style={styles.icon} source={require('../images/vaccine.png')} />
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        width: 40,
        height: 40,
        marginRight: 15
    }
})
export default IconHeader