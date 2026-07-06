import { useContext, useEffect, useRef } from "react";
import * as Location from "expo-location";

import { useAuth } from "../contexts/AuthContext";
import { TarefasContext } from "../contexts/TarefasContext";
import { useConfiguracoes } from "../contexts/ConfiguracoesContext";

import {
  configurarNotificacoes,
  notificarProximidade,
} from "../services/notificacoes";

import { calcularDistanciaMetros } from "../services/geolocalizacao";

export default function ProximidadeWatcher() {

  const { session } = useAuth();
  const { tarefas } = useContext(TarefasContext);
  const { raioAlerta, carregado } = useConfiguracoes();

  const assinaturaRef = useRef(null);
  const notificadasRef = useRef(new Set());
  const tarefasRef = useRef(tarefas);
  const raioRef = useRef(raioAlerta);

  useEffect(() => {
    tarefasRef.current = tarefas;
  }, [tarefas]);

  useEffect(() => {
    raioRef.current = raioAlerta;
  }, [raioAlerta]);

  useEffect(() => {

    if (session && carregado) {
      iniciar();
    } else {
      parar();
    }

    return () => {
      parar();
    };

  }, [session, carregado]);

  async function iniciar() {

    if (assinaturaRef.current) return;

    try {

      const notificacoesOk = await configurarNotificacoes();
      console.log("[proximidade] permissão de notificação concedida:", notificacoesOk);

      const { status } =
        await Location.requestForegroundPermissionsAsync();

      console.log("[proximidade] permissão de localização:", status);

      if (status !== "granted") return;

      assinaturaRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 30000,
          distanceInterval: 30,
        },
        (localizacao) => verificarProximidade(localizacao.coords)
      );

      console.log("[proximidade] watchPositionAsync iniciado");

    } catch (e) {

      console.log("[proximidade] erro ao iniciar:", e);

    }

  }

  function parar() {

    assinaturaRef.current?.remove?.();
    assinaturaRef.current = null;
    notificadasRef.current.clear();

  }

  function verificarProximidade(coords) {

    const raio = raioRef.current;

    tarefasRef.current

      .filter(
        (tarefa) =>
          !tarefa.concluida &&
          tarefa.latitude &&
          tarefa.longitude
      )

      .forEach((tarefa) => {

        const distancia = calcularDistanciaMetros(
          coords.latitude,
          coords.longitude,
          tarefa.latitude,
          tarefa.longitude
        );

        const jaNotificada = notificadasRef.current.has(tarefa.id);

        console.log(
          `[proximidade] tarefa="${tarefa.titulo}" distancia=${Math.round(distancia)}m raio=${raio}m jaNotificada=${jaNotificada}`
        );

        if (distancia <= raio && !jaNotificada) {

          notificadasRef.current.add(tarefa.id);
          notificarProximidade(tarefa, distancia);

        } else if (distancia > raio && jaNotificada) {

          notificadasRef.current.delete(tarefa.id);

        }

      });

  }

  return null;

}
