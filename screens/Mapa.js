import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
} from 'react-native'

import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker } from 'react-native-maps';
import MyButtons from '../components/MyButtons';
import { useDispatch } from 'react-redux';
import { reducerSetCoords } from '../redux/coordsSlice';
import { useSelector } from 'react-redux';

const Mapa = (props) => {

    const id = useSelector((state) => state.vacina.id);
    var [lat, setLat] = useState(useSelector((state) => state.coords.latitude));
    var [long, setLong] = useState(useSelector((state) => state.coords.longitude));
    var [latitude, setLatitude] = useState(0);
    var [longitude, setLongitude] = useState(0);
    
    const dispatch = useDispatch();
    useEffect(() => {
        Geolocation.getCurrentPosition((positon) => {
            setLatitude(positon.coords.latitude);
            setLongitude(positon.coords.longitude);
        })
    }, [id])

    const getPressedLocation = (e) => {
        if(id){
            setLat(e.nativeEvent.coordinate.latitude);
            setLong(e.nativeEvent.coordinate.longitude);
        }else{
            setLatitude(e.nativeEvent.coordinate.latitude);
            setLongitude(e.nativeEvent.coordinate.longitude);
        }
    }
   
   const goToBack = () => {
       clearRedux();
       if(id){
           dispatch(reducerSetCoords({
               latitude: lat,
               longitude: long
            }))
        }else{
            dispatch(reducerSetCoords({
                latitude: latitude,
                longitude: longitude
            }))
        }
        props.navigation.pop();
    }
    
    const clearRedux = () => {
        dispatch(reducerSetCoords({
            latitude: null,
            longitude: null
         }))
    }

    return(
        <View style={styles.container}>
            {
                id ?
                    <MapView
                        onPress={(e) => getPressedLocation(e)}
                        style={styles.map}
                        loadingEnabled={true}
                        region={{
                            latitude: lat,
                            longitude: long,
                            latitudeDelta: 0.0090,
                            longitudeDelta: 0.0090
                        }}
                    >
                        <Marker
                            coordinate={{latitude: lat, longitude: long}}
                            pinColor={"red"}
                        />
                    </MapView>
                :
                    <MapView
                        onPress={(e) => getPressedLocation(e)}
                        style={styles.map}
                        loadingEnabled={true}
                        region={{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 0.0090,
                            longitudeDelta: 0.0090
                        }}
                    >
                        <Marker
                            coordinate={{latitude: latitude, longitude: longitude}}
                            pinColor={"red"}
                        />
                    </MapView>
            }
            
            
            <View style={styles.buttonContainer}>
                <MyButtons label="Salvar Localização" onPress={goToBack} style={styles.button}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ADD4D0',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10
    },
    button: {
        backgroundColor: '#37BD6D',
        padding: 5,
        paddingHorizontal: 10 
    },
    map: {
        flex: 1,
    }
})

export default Mapa;