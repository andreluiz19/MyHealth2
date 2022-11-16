import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react';

import Login from './screens/Login'
import Home from './screens/Home'
import CreateAccount from './screens/CreateAccount'
import IconHeader from './components/IconHeader';
import ForgotPassword from './screens/ForgotPassword';
import EditCreateVaccine from './screens/EditCreateVaccine';


const Stack = createNativeStackNavigator()


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} 
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="Home" component={Home}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="CreateAccount" component={CreateAccount} 
          options={{
            title: "MyHealth",
            headerStyle: {
              backgroundColor: '#C1E7E3',
            },
            headerTitleStyle: {
              fontFamily: 'AveriaLibre-Bold',
              fontSize: 30,
              color: '#419ED7',
            },
            headerBackVisible: false,
            headerLeft: () => (
              <IconHeader />
            )
          }}
        />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}
          options={{
            title: "MyHealth",
            headerStyle: {
              backgroundColor: '#C1E7E3',
            },
            headerTitleStyle: {
              fontFamily: 'AveriaLibre-Bold',
              fontSize: 30,
              color: '#419ED7',
            },
            headerBackVisible: false,
            headerLeft: () => (
              <IconHeader />
            )
          }}
        />
        <Stack.Screen name="EditCreateVaccine" component={EditCreateVaccine}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;

