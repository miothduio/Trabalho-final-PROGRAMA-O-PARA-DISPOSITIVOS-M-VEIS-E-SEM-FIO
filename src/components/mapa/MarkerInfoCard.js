import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Button, IconButton } from "react-native-paper";

import PriorityBadge from "../PriorityBadge";
import Colors from "../../theme/colors";

export default function MarkerInfoCard({ tarefa, onVerDetalhes, onFechar }) {

  if (!tarefa) return null;

  return (
    <Card style={styles.card}>
      <Card.Content>

        <View style={styles.header}>

          <View style={styles.info}>
            <Text variant="titleMedium" style={styles.titulo} numberOfLines={1}>
              {tarefa.titulo}
            </Text>

            {!!tarefa.nome_local && (
              <Text style={styles.local} numberOfLines={1}>
                📍 {tarefa.nome_local}
              </Text>
            )}
          </View>

          <PriorityBadge prioridade={tarefa.prioridade} />

          <IconButton icon="close" size={18} onPress={onFechar} />

        </View>

        <Button mode="contained" icon="eye" style={styles.botao} onPress={onVerDetalhes}>
          Ver detalhes
        </Button>

      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    left: 15,
    right: 15,
    bottom: 20,
    borderRadius: 20,
    elevation: 5,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  info: {
    flex: 1,
    marginRight: 8,
  },

  titulo: {
    fontWeight: "bold",
    color: Colors.text,
  },

  local: {
    marginTop: 4,
    color: Colors.subtitle,
    fontSize: 13,
  },

  botao: {
    marginTop: 12,
  },
});
