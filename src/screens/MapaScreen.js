import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
} from "react-native";

import {
  Button,
  ActivityIndicator,
  Card,
  Text,
} from "react-native-paper";

import * as Location from "expo-location";

import Colors from "../theme/colors";

import MapaView from "../components/mapa/MapaView";
import LocalMarker from "../components/mapa/LocalMarker";
import CurrentLocationButton from "../components/mapa/CurrentLocationButton";

export default function MapaScreen({ navigation, route }) {

  const mapRef = useRef(null);

  const idTarefa = route?.params?.id;

  const [loading, setLoading] = useState(true);

  const [region, setRegion] = useState(null);

  const [marker, setMarker] = useState(null);

  const [endereco, setEndereco] = useState(
    route?.params?.nomeLocal || ""
  );

  useEffect(() => {

    if (route?.params?.latitude && route?.params?.longitude) {

      const novaRegiao = {
        latitude: route.params.latitude,
        longitude: route.params.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setRegion(novaRegiao);

      setMarker({
        latitude: route.params.latitude,
        longitude: route.params.longitude,
      });

      setLoading(false);

      return;

    }

    carregarLocalizacao();

  }, []);

  async function carregarLocalizacao() {

    try {

      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {

        Alert.alert(
          "Permissão",
          "Permissão de localização negada."
        );

        navigation.goBack();

        return;

      }

      const location =
        await Location.getCurrentPositionAsync({
          accuracy:
            Location.Accuracy.High,
        });

      const novaRegiao = {

        latitude: location.coords.latitude,

        longitude: location.coords.longitude,

        latitudeDelta: 0.01,

        longitudeDelta: 0.01,

      };

      setRegion(novaRegiao);

      setMarker({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      await atualizarEndereco({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

    } catch (e) {

      console.log(e);

      Alert.alert(
        "Erro",
        "Não foi possível obter a localização."
      );

    } finally {

      setLoading(false);

    }

  }

  async function atualizarEndereco(coordenada) {

    try {

      const resultado =
        await Location.reverseGeocodeAsync(coordenada);

      if (resultado.length > 0) {

        const local = resultado[0];

        const texto = [

          local.name,

          local.street,

          local.city,

        ]
          .filter(Boolean)
          .join(" - ");

        setEndereco(texto);

      }

    } catch (e) {

      console.log(e);

    }

  }

  async function moverMarker(coordenada) {

    setMarker(coordenada);

    await atualizarEndereco(coordenada);

  }

  function confirmar() {

    navigation.navigate({

      name: idTarefa ? "Editar" : "Form",

      params: {

        id: idTarefa,

        titulo: route?.params?.titulo,

        descricao: route?.params?.descricao,

        prioridade: route?.params?.prioridade,

        latitude: marker.latitude,

        longitude: marker.longitude,

        nomeLocal: endereco,

      },

      merge: true,

    });

  }

  if (loading || !region) {

    return (

      <View style={styles.loading}>

        <ActivityIndicator size="large" />

      </View>

    );

  }

  return (

    <View style={styles.container}>

      <MapaView

        ref={mapRef}

        region={region}

      >

        <LocalMarker

          coordinate={marker}

          onDragEnd={moverMarker}

        />

      </MapaView>

      <CurrentLocationButton

        mapRef={mapRef}

        onLocationChange={async (coord) => {

          const novaRegiao = {

            latitude: coord.latitude,

            longitude: coord.longitude,

            latitudeDelta: 0.01,

            longitudeDelta: 0.01,

          };

          setRegion(novaRegiao);

          setMarker(coord);

          await atualizarEndereco(coord);

        }}

      />

      <Card style={styles.card}>

        <Card.Content>

          <Text
            variant="titleMedium"
            style={styles.titulo}
          >

            Local Selecionado

          </Text>

          <Text style={styles.endereco}>

            {endereco || "Mova o marcador"}

          </Text>

          <Text style={styles.coordenadas}>

            Latitude: {marker.latitude.toFixed(6)}

          </Text>

          <Text style={styles.coordenadas}>

            Longitude: {marker.longitude.toFixed(6)}

          </Text>

          <Button

            mode="contained"

            icon="check"

            style={styles.botao}

            onPress={confirmar}

          >

            Confirmar Local

          </Button>

        </Card.Content>

      </Card>

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
  },

  card: {

    position: "absolute",

    left: 15,

    right: 15,

    bottom: 20,

    borderRadius: 20,

    elevation: 5,

  },

  titulo: {

    fontWeight: "bold",

    marginBottom: 10,

  },

  endereco: {

    color: Colors.primary,

    marginBottom: 15,

  },

  coordenadas: {

    color: Colors.subtitle,

    fontSize: 13,

  },

  botao: {

    marginTop: 20,

  },

});