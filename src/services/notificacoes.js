import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function configurarNotificacoes() {

  try {

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "Lembretes de proximidade",
        importance: Notifications.AndroidImportance.HIGH,
      });
    }

    const permissaoAtual = await Notifications.getPermissionsAsync();

    if (permissaoAtual.status === "granted") return true;

    const { status } = await Notifications.requestPermissionsAsync();

    return status === "granted";

  } catch (e) {

    console.log(e);
    return false;

  }

}

export async function notificarProximidade(tarefa, distanciaMetros) {

  try {

    console.log("[proximidade] agendando notificação para", tarefa.titulo);

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Você está perto de uma tarefa!",
        body: [tarefa.titulo, tarefa.nome_local]
          .filter(Boolean)
          .join(" - ") + ` (${Math.round(distanciaMetros)}m)`,
        data: { tarefaId: tarefa.id },
      },
      trigger: null,
    });

    console.log("[proximidade] notificação agendada, id:", id);

  } catch (e) {

    console.log("[proximidade] erro ao agendar notificação:", e);

  }

}
