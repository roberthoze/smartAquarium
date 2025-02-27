import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import stats from '../(tabs)/stats';
import PreviewScreen from '../(tabs)/PreviewScreen';

const Stack=createStackNavigator();
export default function AddScreenNavigation() {
  return (
    <Stack.Navigator>
        <Stack.Screen name='add-screen'component={stats} />
        <Stack.Screen name='preview-screen' component={PreviewScreen}/>
    </Stack.Navigator>
  )
}
