import React from 'react';
import {
    View,
    Image,
    StyleSheet
} from 'react-native'

const IconCalendar = (props) =>{

    const {style} = props

    return(
        <View>
            <Image style={[styles.icon, style]} source={require('../images/calendar.png')} />
        </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        width: 25,
        height: 25,
        marginTop: 18,
        marginLeft: 370
    }
})
export default IconCalendar