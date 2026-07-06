import React from "react";
import { StyleSheet, View } from "react-native";

import {
  Card,
  Text,
  Checkbox,
  IconButton,
} from "react-native-paper";

import PriorityBadge from "./PriorityBadge";
import Colors from "../theme/colors";

export default function TarefaCard({

  tarefa,

  onEditar,

  onExcluir,

  onConcluir,

  onVerDetalhes,

}) {

  return (

    <Card style={styles.card} onPress={onVerDetalhes}>

      <Card.Content>

        <View style={styles.header}>

          <Checkbox

            status={
              tarefa.concluida
                ? "checked"
                : "unchecked"
            }

            onPress={onConcluir}

          />

          <View style={styles.info}>

            <Text
              variant="titleMedium"
              style={[
                styles.title,

                tarefa.concluida &&
                styles.done

              ]}
            >

              {tarefa.titulo}

            </Text>

            {!!tarefa.descricao && (

              <Text
                variant="bodyMedium"
                style={styles.description}
              >

                {tarefa.descricao}

              </Text>

            )}

            {!!tarefa.nome_local && (

              <Text style={styles.location}>

                📍 {tarefa.nome_local}

              </Text>

            )}

          </View>

          <PriorityBadge

            prioridade={

              tarefa.prioridade

            }

          />

        </View>

      </Card.Content>

      <Card.Actions>

        <IconButton

          icon="pencil"

          iconColor={Colors.primary}

          onPress={onEditar}

        />

        <IconButton

          icon="delete"

          iconColor={Colors.danger}

          onPress={onExcluir}

        />

      </Card.Actions>

    </Card>

  );

}

const styles=StyleSheet.create({

card:{

marginBottom:16,

borderRadius:18,

backgroundColor:Colors.surface,

elevation:3,

},

header:{

flexDirection:"row",

alignItems:"flex-start",

},

info:{

flex:1,

marginHorizontal:10,

},

title:{

fontWeight:"bold",

color:Colors.text,

},

description:{

marginTop:5,

color:Colors.subtitle,

},

location:{

marginTop:10,

fontWeight:"600",

color:Colors.primary,

},

done:{

textDecorationLine:"line-through",

color:Colors.subtitle,

}

});