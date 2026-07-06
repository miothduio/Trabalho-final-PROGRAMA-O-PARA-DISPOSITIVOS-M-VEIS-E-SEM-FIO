import React, { useContext, useMemo, useState } from "react";

import { View, StyleSheet, FlatList, RefreshControl } from "react-native";

import { FAB, Snackbar } from "react-native-paper";

import { useAuth } from "../contexts/AuthContext";
import { TarefasContext } from "../contexts/TarefasContext";

import HeaderHome from "../components/HeaderHome";
import StatsCard from "../components/StatsCard";
import SearchInput from "../components/SearchInput";
import FiltroTarefas from "../components/FiltroTarefas";
import TarefaCard from "../components/TarefaCard";
import EmptyState from "../components/EmptyState";
import Loading from "../components/Loading";

import Colors from "../theme/colors";

export default function ListaScreen({ navigation }) {
  const { user } = useAuth();

  const {
    tarefas,

    loading,

    refreshing,

    refresh,

    toggleConcluida,

    deletarTarefa,

    erro,

    limparErro,
  } = useContext(TarefasContext);

  const [pesquisa, setPesquisa] = useState("");

  const [status, setStatus] = useState("todos");

  const [prioridade, setPrioridade] = useState("todas");

  const tarefasFiltradas = useMemo(() => {
    return tarefas.filter((tarefa) => {
      const texto = pesquisa.toLowerCase();

      const pesquisaOk =
        tarefa.titulo?.toLowerCase().includes(texto) ||
        tarefa.descricao?.toLowerCase().includes(texto) ||
        tarefa.nome_local?.toLowerCase().includes(texto);

      const statusOk =
        status === "todos" ||
        (status === "pendentes" && !tarefa.concluida) ||
        (status === "concluidas" && tarefa.concluida);

      const prioridadeOk =
        prioridade === "todas" || tarefa.prioridade === prioridade;

      return pesquisaOk && statusOk && prioridadeOk;
    });
  }, [tarefas, pesquisa, status, prioridade]);

  const total = tarefas.length;

  const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length;

  const pendentes = total - concluidas;

  if (loading) {
    return <Loading texto="Carregando tarefas..." />;
  }

  return (
    <View style={styles.container}>
      <HeaderHome email={user?.email} />

      <StatsCard total={total} pendentes={pendentes} concluidas={concluidas} />

      <SearchInput value={pesquisa} onChangeText={setPesquisa} />

      <FiltroTarefas
        status={status}
        setStatus={setStatus}
        prioridade={prioridade}
        setPrioridade={setPrioridade}
      />

      <FlatList
        data={tarefasFiltradas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingBottom: 120,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
        ListEmptyComponent={<EmptyState />}
        renderItem={({ item }) => (
          <TarefaCard
            tarefa={item}
            onConcluir={() => {
              toggleConcluida(
                item.id,

                item.concluida,
              );
            }}
            onEditar={() => {
              navigation.navigate(
                "Editar",

                {
                  id: item.id,
                },
              );
            }}
            onExcluir={() => {
              deletarTarefa(item.id);
            }}
            onVerDetalhes={() => {
              navigation.navigate(
                "Detalhe",

                {
                  id: item.id,
                },
              );
            }}
          />
        )}
      />

      <FAB
        icon="plus"
        label="Nova"
        style={styles.fab}
        onPress={() => {
          navigation.navigate("Form");
        }}
      />

      <Snackbar
        visible={!!erro}
        onDismiss={limparErro}
        duration={4000}
        action={{
          label: "Fechar",
          onPress: limparErro,
        }}
      >
        {erro}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.background,

    padding: 16,
  },

  fab: {
    position: "absolute",

    right: 20,

    bottom: 20,

    backgroundColor: Colors.primary,
  },
});
