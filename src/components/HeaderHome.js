import React from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Text } from "react-native-paper";
import Colors from "../theme/colors";

export default function HeaderHome({ email }) {

  const nome =
    email?.split("@")[0] || "Usuário";

  return (
    <View style={styles.container}>

      <View>

        <Text variant="headlineMedium" style={styles.title}>
          Olá, {nome} 👋
        </Text>

        <Text variant="bodyMedium" style={styles.subtitle}>
          Organize suas tarefas por localização
        </Text>

      </View>

      <Avatar.Icon
        icon="account"
        size={54}
        style={styles.avatar}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:20
  },

  title:{
    fontWeight:"bold",
    color:Colors.text
  },

  subtitle:{
    color:Colors.subtitle,
    marginTop:5
  },

  avatar:{
    backgroundColor:Colors.primary
  }

});