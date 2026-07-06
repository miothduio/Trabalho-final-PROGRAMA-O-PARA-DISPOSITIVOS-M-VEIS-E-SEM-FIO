import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

let tarefaPendente = null;

export function navegarParaTarefa(tarefaId) {
  if (!tarefaId) return;

  if (!navigationRef.isReady()) {
    tarefaPendente = tarefaId;
    return;
  }

  navigationRef.navigate("Tarefas", {
    screen: "Detalhe",
    params: { id: tarefaId },
  });
}

export function navegarParaTarefaPendente() {
  if (!tarefaPendente) return;

  const tarefaId = tarefaPendente;
  tarefaPendente = null;
  navegarParaTarefa(tarefaId);
}
