import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Alert, View } from "react-native";

import {
  Card,
  Text,
  TextInput,
  Button,
  Chip,
  Divider,
} from "react-native-paper";

import Colors from "../theme/colors";
import { TarefasContext } from "../contexts/TarefasContext";

export default function EditarScreen({ navigation, route }) {
  const { id } = route.params;

  const {
    buscarTarefaPorId,

    atualizarTarefa,
  } = useContext(TarefasContext);

  const [loading, setLoading] = useState(false);

  const [titulo, setTitulo] = useState("");

  const [descricao, setDescricao] = useState("");

  const [prioridade, setPrioridade] = useState("media");

  const [nomeLocal, setNomeLocal] = useState("");

  const [latitude, setLatitude] = useState(null);

  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    carregar();
  }, []);

  useEffect(() => {
    if (!route.params) return;

    if (route.params.titulo) setTitulo(route.params.titulo);

    if (route.params.descricao) setDescricao(route.params.descricao);

    if (route.params.prioridade) setPrioridade(route.params.prioridade);

    if (route.params.latitude) setLatitude(route.params.latitude);

    if (route.params.longitude) setLongitude(route.params.longitude);

    if (route.params.nomeLocal) setNomeLocal(route.params.nomeLocal);
  }, [route.params]);

  async function carregar() {
    const tarefa = await buscarTarefaPorId(id);

    if (!tarefa) return;

    setTitulo(tarefa.titulo);

    setDescricao(tarefa.descricao);

    setPrioridade(tarefa.prioridade);

    setNomeLocal(tarefa.nome_local);

    setLatitude(tarefa.latitude);

    setLongitude(tarefa.longitude);
  }

  async function salvar() {
    if (!titulo.trim()) {
      Alert.alert(
        "Atenção",

        "Informe um título.",
      );

      return;
    }

    try {
      setLoading(true);

      await atualizarTarefa(
        id,

        {
          titulo,

          descricao,

          prioridade,

          nome_local: nomeLocal,

          latitude,

          longitude,
        },
      );

      navigation.goBack();
    } catch (e) {
      Alert.alert(
        "Erro",

        "Não foi possível atualizar.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall">Editar tarefa</Text>

          <Divider style={styles.divider} />

          <TextInput
            label="Título"
            mode="outlined"
            value={titulo}
            onChangeText={setTitulo}
            style={styles.input}
          />

          <TextInput
            label="Descrição"
            mode="outlined"
            multiline
            numberOfLines={4}
            value={descricao}
            onChangeText={setDescricao}
            style={styles.input}
          />

          <Text variant="titleMedium">Prioridade</Text>

          <View style={styles.row}>
            <Chip
              selected={prioridade === "alta"}
              onPress={() => setPrioridade("alta")}
            >
              Alta
            </Chip>

            <Chip
              selected={prioridade === "media"}
              onPress={() => setPrioridade("media")}
            >
              Média
            </Chip>

            <Chip
              selected={prioridade === "baixa"}
              onPress={() => setPrioridade("baixa")}
            >
              Baixa
            </Chip>
          </View>

          <TextInput
            label="Nome do Local"
            mode="outlined"
            value={nomeLocal}
            onChangeText={setNomeLocal}
            style={styles.input}
          />

          <Button
            icon="map-marker"
            mode="outlined"
            onPress={() =>
              navigation.navigate(
                "Mapa",

                {
                  id,

                  titulo,

                  descricao,

                  prioridade,

                  latitude,

                  longitude,

                  nomeLocal,
                },
              )
            }
          >
            Alterar Local
          </Button>

          <Button
            mode="contained"
            loading={loading}
            icon="content-save"
            style={{
              marginTop: 20,
            }}
            onPress={salvar}
          >
            Salvar Alterações
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

    padding: 16,
  },

  card: {
    borderRadius: 20,
  },

  divider: {
    marginVertical: 20,
  },

  input: {
    marginBottom: 15,
  },

  row: {
    flexDirection: "row",

    justifyContent: "space-between",

    marginBottom: 20,
  },
});
