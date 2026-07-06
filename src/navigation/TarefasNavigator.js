import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ListaScreen from "../screens/ListaScreen";
import FormScreen from "../screens/FormScreen";
import EditarScreen from "../screens/EditarScreen";
import MapaScreen from "../screens/MapaScreen";
import DetalheScreen from "../screens/DetalheScreen";

const Stack = createNativeStackNavigator();

export default function TarefasNavigator() {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Lista"
        component={ListaScreen}
        options={{
          title: "Minhas Tarefas",
        }}
      />

      <Stack.Screen
        name="Form"
        component={FormScreen}
        options={{
          title: "Nova Tarefa",
        }}
      />

      <Stack.Screen
        name="Editar"
        component={EditarScreen}
        options={{
          title: "Editar Tarefa",
        }}
      />

      <Stack.Screen
        name="Mapa"
        component={MapaScreen}
        options={{
          title: "Escolher Local",
        }}
      />

      <Stack.Screen
        name="Detalhe"
        component={DetalheScreen}
        options={{
          title: "Detalhes da Tarefa",
        }}
      />

    </Stack.Navigator>
  );
}