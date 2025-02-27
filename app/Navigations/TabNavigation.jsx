import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import index from '../(tabs)/index'
import livestream from '../(tabs)/livestream'
import feed from '../(tabs)/feed'
import settings from '../(tabs)/settings'
import stats from '../(tabs)/stats'

const tab=createBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name ='Home' component={index} />
      <Tab.Screen name ='Livestream' component={livestream} />
      <Tab.Screen name ='Feed' component={feed} />
      <Tab.Screen name ='Settings' component={settings} />
      <Tab.Screen name ='Stats' component={stats} />
    </Tab.Navigator>
  )
}