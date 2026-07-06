import React from "react";
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
} from "react-native";

import Colors from "../theme/colors";

export default function Loading({

  texto = "Carregando..."

}) {

  return (

    <View style={styles.container}>

      <ActivityIndicator
        size="large"
        color={Colors.primary}
      />

      <Text style={styles.text}>
        {texto}
      </Text>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {

    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: Colors.background,

  },

  text: {

    marginTop: 12,

    color: Colors.subtitle,

    fontSize: 16,

  },

});