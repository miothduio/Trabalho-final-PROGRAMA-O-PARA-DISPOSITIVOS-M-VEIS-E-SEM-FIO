import React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

import * as Location from "expo-location";

import Colors from "../../theme/colors";

export default function CurrentLocationButton({

  mapRef,

  onLocationChange,

}) {

  async function irParaMinhaLocalizacao() {

    try {

      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") return;

      const local =
        await Location.getCurrentPositionAsync({});

      const region = {

        latitude: local.coords.latitude,

        longitude: local.coords.longitude,

        latitudeDelta: 0.01,

        longitudeDelta: 0.01,

      };

      mapRef?.current?.animateToRegion(

        region,

        800

      );

      onLocationChange?.({

        latitude: local.coords.latitude,

        longitude: local.coords.longitude,

      });

    } catch (e) {

      console.log(e);

    }

  }

  return (

    <FAB

      icon="crosshairs-gps"

      small

      style={styles.fab}

      onPress={irParaMinhaLocalizacao}

    />

  );

}

const styles = StyleSheet.create({

  fab: {

    position: "absolute",

    bottom: 100,

    right: 15,

    backgroundColor: Colors.surface,

  },

});