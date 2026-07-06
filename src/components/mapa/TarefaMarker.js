import React from "react";
import { Marker } from "react-native-maps";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../theme/colors";

export default function TarefaMarker({ tarefa, onPress }) {

  let cor = Colors.media;

  switch (tarefa.prioridade) {
    case "alta":
      cor = Colors.alta;
      break;
    case "baixa":
      cor = Colors.baixa;
      break;
  }

  return (
    <Marker
      coordinate={{
        latitude: tarefa.latitude,
        longitude: tarefa.longitude,
      }}
      onPress={onPress}
      tracksViewChanges
    >
      <View style={[styles.pin, { backgroundColor: cor }]}>
        <Ionicons name="location" size={16} color="#FFF" />
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  pin: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFF",
    elevation: 4,
  },
});
