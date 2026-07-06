import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { Card, Text, Button, Divider } from "react-native-paper";

import { TarefasContext } from "../contexts/TarefasContext";

import PriorityBadge from "../components/PriorityBadge";
import Loading from "../components/Loading";
import MapaView from "../components/mapa/MapaView";
import TarefaMarker from "../components/mapa/TarefaMarker";

import Colors from "../theme/colors";

export default function DetalheScreen({ navigation, route }) {

  const { id } = route.params;

  const {
    buscarTarefaPorId,
    toggleConcluida,
    deletarTarefa,
  } = useContext(TarefasContext);

  const [tarefa, setTarefa] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {
    setLoading(true);
    const dados = await buscarTarefaPorId(id);
    setTarefa(dados);
    setLoading(false);
  }

  function confirmarExclusao() {

    Alert.alert(
      "Excluir tarefa",
      "Tem certeza que deseja excluir esta tarefa?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            await deletarTarefa(tarefa.id);
            navigation.goBack();
          },
        },
      ]
    );

  }

  if (loading || !tarefa) {
    return <Loading texto="Carregando tarefa..." />;
  }

  const temLocal = !!(tarefa.latitude && tarefa.longitude);

  return (
    <ScrollView style={styles.container}>

      {temLocal && (
        <View style={styles.mapa}>
          <MapaView
            region={{
              latitude: tarefa.latitude,
              longitude: tarefa.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <TarefaMarker tarefa={tarefa} />
          </MapaView>
        </View>
      )}

      <Card style={styles.card}>
        <Card.Content>

          <View style={styles.header}>
            <Text variant="headlineSmall" style={styles.titulo}>
              {tarefa.titulo}
            </Text>

            <PriorityBadge prioridade={tarefa.prioridade} />
          </View>

          <Divider style={styles.divider} />

          {!!tarefa.descricao && (
            <Text style={styles.descricao}>{tarefa.descricao}</Text>
          )}

          {!!tarefa.nome_local && (
            <Text style={styles.local}>📍 {tarefa.nome_local}</Text>
          )}

          <Text style={styles.status}>
            Status: {tarefa.concluida ? "Concluída" : "Pendente"}
          </Text>

          <Button
            mode={tarefa.concluida ? "outlined" : "contained"}
            icon={tarefa.concluida ? "close-circle-outline" : "check"}
            style={styles.botao}
            onPress={async () => {
              await toggleConcluida(tarefa.id, tarefa.concluida);
              carregar();
            }}
          >
            {tarefa.concluida ? "Marcar como pendente" : "Marcar como concluída"}
          </Button>

          <Button
            mode="outlined"
            icon="pencil"
            style={styles.botao}
            onPress={() => navigation.navigate("Editar", { id: tarefa.id })}
          >
            Editar
          </Button>

          <Button
            mode="outlined"
            icon="delete"
            textColor={Colors.danger}
            style={styles.botao}
            onPress={confirmarExclusao}
          >
            Excluir
          </Button>

        </Card.Content>
      </Card>

    </ScrollView>
  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  mapa: {
    height: 220,
  },

  card: {
    margin: 16,
    borderRadius: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  titulo: {
    flex: 1,
    fontWeight: "bold",
    marginRight: 10,
  },

  divider: {
    marginVertical: 16,
  },

  descricao: {
    color: Colors.subtitle,
    marginBottom: 12,
  },

  local: {
    color: Colors.primary,
    fontWeight: "600",
    marginBottom: 12,
  },

  status: {
    color: Colors.text,
    fontWeight: "600",
    marginBottom: 20,
  },

  botao: {
    marginBottom: 12,
  },

});
