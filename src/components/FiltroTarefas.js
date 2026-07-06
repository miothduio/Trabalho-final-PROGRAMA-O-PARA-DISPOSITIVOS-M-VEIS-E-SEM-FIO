import React from "react";
import { View, StyleSheet } from "react-native";
import { Chip } from "react-native-paper";

export default function FiltroTarefas({
  status,
  setStatus,
  prioridade,
  setPrioridade,
}) {
  return (
    <View>

      <View style={styles.row}>
        <Chip
          selected={status === "todos"}
          onPress={() => setStatus("todos")}
          compact
        >
          Todas
        </Chip>

        <Chip
          selected={status === "pendentes"}
          onPress={() => setStatus("pendentes")}
          compact
        >
          Pendentes
        </Chip>

        <Chip
          selected={status === "concluidas"}
          onPress={() => setStatus("concluidas")}
          compact
        >
          Concluídas
        </Chip>
      </View>

      <View style={styles.row}>
        <Chip
          selected={prioridade === "todas"}
          onPress={() => setPrioridade("todas")}
          compact
        >
          Todas
        </Chip>

        <Chip
          selected={prioridade === "alta"}
          onPress={() => setPrioridade("alta")}
          compact
        >
          Alta
        </Chip>

        <Chip
          selected={prioridade === "media"}
          onPress={() => setPrioridade("media")}
          compact
        >
          Média
        </Chip>

        <Chip
          selected={prioridade === "baixa"}
          onPress={() => setPrioridade("baixa")}
          compact
        >
          Baixa
        </Chip>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },
});