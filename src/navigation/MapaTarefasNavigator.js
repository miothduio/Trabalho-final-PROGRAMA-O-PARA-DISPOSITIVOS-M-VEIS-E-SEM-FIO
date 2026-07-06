import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MapaTarefasScreen from "../screens/MapaTarefasScreen";
import DetalheScreen from "../screens/DetalheScreen";
import EditarScreen from "../screens/EditarScreen";
import MapaScreen from "../screens/MapaScreen";

const Stack = createNativeStackNavigator();

export default function MapaTarefasNavigator() {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="MapaTarefas"
        component={MapaTarefasScreen}
        options={{
          title: "Mapa de Tarefas",
        }}
      />

      <Stack.Screen
        name="Detalhe"
        component={DetalheScreen}
        options={{
          title: "Detalhes da Tarefa",
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

    </Stack.Navigator>
  );
}
