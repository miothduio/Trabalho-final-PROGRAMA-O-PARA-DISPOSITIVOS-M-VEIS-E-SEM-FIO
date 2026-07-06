import React, { useContext, useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator, Card, Text } from "react-native-paper";

import * as Location from "expo-location";

import { TarefasContext } from "../contexts/TarefasContext";

import MapaView from "../components/mapa/MapaView";
import TarefaMarker from "../components/mapa/TarefaMarker";
import MarkerInfoCard from "../components/mapa/MarkerInfoCard";
import CurrentLocationButton from "../components/mapa/CurrentLocationButton";

import Colors from "../theme/colors";

export default function MapaTarefasScreen({ navigation }) {

  const mapRef = useRef(null);

  const { tarefas, loading } = useContext(TarefasContext);

  const [region, setRegion] = useState(null);
  const [selecionada, setSelecionada] = useState(null);

  useEffect(() => {
    centralizarNaLocalizacaoAtual();
  }, []);

  const tarefasComLocal = tarefas.filter(
    (tarefa) => tarefa.latitude && tarefa.longitude
  );

  async function centralizarNaLocalizacaoAtual() {

    try {

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setRegion(regiaoPadrao());
        return;
      }

      const local = await Location.getCurrentPositionAsync({});

      setRegion({
        latitude: local.coords.latitude,
        longitude: local.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });

    } catch (e) {

      console.log(e);
      setRegion(regiaoPadrao());

    }

  }

  function regiaoPadrao() {

    const comLocal = tarefas.find(
      (tarefa) => tarefa.latitude && tarefa.longitude
    );

    return {
      latitude: comLocal?.latitude ?? -15.7801,
      longitude: comLocal?.longitude ?? -47.9292,
      latitudeDelta: 0.5,
      longitudeDelta: 0.5,
    };

  }

  if (loading || !region) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <MapaView ref={mapRef} region={region}>

        {tarefasComLocal.map((tarefa) => (
          <TarefaMarker
            key={tarefa.id}
            tarefa={tarefa}
            onPress={() => setSelecionada(tarefa)}
          />
        ))}

      </MapaView>

      <CurrentLocationButton
        mapRef={mapRef}
        onLocationChange={(coord) => {
          setRegion({
            ...coord,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          });
        }}
      />

      <MarkerInfoCard
        tarefa={selecionada}
        onFechar={() => setSelecionada(null)}
        onVerDetalhes={() => {
          const id = selecionada.id;
          setSelecionada(null);
          navigation.navigate("Detalhe", { id });
        }}
      />

      {tarefasComLocal.length === 0 && (
        <Card style={styles.avisoCard}>
          <Card.Content>
            <Text style={styles.avisoTexto}>
              Nenhuma tarefa com localização definida ainda.
              Crie ou edite uma tarefa e escolha um local no mapa
              para vê-la aqui.
            </Text>
          </Card.Content>
        </Card>
      )}

    </View>
  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },

  avisoCard: {
    position: "absolute",
    left: 15,
    right: 15,
    top: 15,
    borderRadius: 16,
  },

  avisoTexto: {
    color: Colors.subtitle,
    textAlign: "center",
  },

});
