import React, {
  createContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "../services/supabase";
import { useAuth } from "./AuthContext";

export const TarefasContext = createContext({});

export function TarefasProvider({ children }) {
  const { session } = useAuth();

  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    if (session) {
      carregarTarefas();
    } else {
      setTarefas([]);
      setLoading(false);
    }
  }, [session]);

  async function carregarTarefas() {
    try {
      setLoading(true);
      setErro(null);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log("[tarefas] carregarTarefas user:", user?.id ?? null);

      if (!user) {
        setTarefas([]);
        return;
      }

      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      console.log("[tarefas] resultado:", data?.length ?? 0, "erro:", error?.message ?? null);

      if (error) throw error;

      setTarefas(data ?? []);
    } catch (err) {
      console.log(err);
      setErro(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  async function refresh() {
    setRefreshing(true);
    await carregarTarefas();
  }

  function limparErro() {
    setErro(null);
  }

  async function adicionarTarefa(dados) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("todos")
        .insert([
          {
            user_id: user.id,
            titulo: dados.titulo,
            descricao: dados.descricao,
            prioridade: dados.prioridade,
            nome_local: dados.nome_local,
            latitude: dados.latitude,
            longitude: dados.longitude,
            concluida: false,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setTarefas((old) => [data, ...old]);

      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async function atualizarTarefa(id, dados) {
    try {
      const { error } = await supabase
        .from("todos")
        .update({
          titulo: dados.titulo,
          descricao: dados.descricao,
          prioridade: dados.prioridade,
          nome_local: dados.nome_local,
          latitude: dados.latitude,
          longitude: dados.longitude,
        })
        .eq("id", id);

      if (error) throw error;

      await carregarTarefas();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async function buscarTarefaPorId(id) {

    const local = tarefas.find((tarefa) => tarefa.id === id);

    if (local) return local;

    try {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async function toggleConcluida(id, valorAtual) {
    try {
      const { error } = await supabase
        .from("todos")
        .update({
          concluida: !valorAtual,
        })
        .eq("id", id);

      if (error) throw error;

      setTarefas((old) =>
        old.map((item) =>
          item.id === id
            ? {
                ...item,
                concluida: !valorAtual,
              }
            : item
        )
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function deletarTarefa(id) {
    try {
      const { error } = await supabase
        .from("todos")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setTarefas((old) =>
        old.filter((item) => item.id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <TarefasContext.Provider
      value={{
        tarefas,

        loading,

        refreshing,

        erro,

        limparErro,

        carregarTarefas,

        refresh,

        adicionarTarefa,

        atualizarTarefa,

        buscarTarefaPorId,

        toggleConcluida,

        deletarTarefa,
      }}
    >
      {children}
    </TarefasContext.Provider>
  );
}