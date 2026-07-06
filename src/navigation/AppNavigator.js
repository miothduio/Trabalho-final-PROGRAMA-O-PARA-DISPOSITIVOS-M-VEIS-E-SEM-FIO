import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import TarefasNavigator from './TarefasNavigator';
import MapaTarefasNavigator from './MapaTarefasNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import Colors from '../theme/colors';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {

  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,

        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.subtitle,

        tabBarStyle: {
          height: 65 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          backgroundColor: Colors.surface,
        },

        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Tarefas':
              iconName = 'list';
              break;

            case 'Mapa':
              iconName = 'map';
              break;

            case 'Perfil':
              iconName = 'person';
              break;

            default:
              iconName = 'ellipse';
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >

      <Tab.Screen
        name="Tarefas"
        component={TarefasNavigator}
      />

      <Tab.Screen
        name="Mapa"
        component={MapaTarefasNavigator}
      />

      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
      />

    </Tab.Navigator>
  );
}