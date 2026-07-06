import React, { useContext, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Alert,
  View,
} from "react-native";

import {
  Card,
  Text,
  TextInput,
  Button,
  Chip,
  Divider,
} from "react-native-paper";

import Colors from "../theme/colors";
import { TarefasContext } from "../contexts/TarefasContext";

export default function FormScreen({ navigation, route }) {

  const { adicionarTarefa } = useContext(TarefasContext);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  const [prioridade, setPrioridade] =
    useState("media");

  const [nomeLocal, setNomeLocal] =
    useState("");

  const [latitude, setLatitude] =
    useState(null);

  const [longitude, setLongitude] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    if (route.params) {

      if (route.params.titulo)
        setTitulo(route.params.titulo);

      if (route.params.descricao)
        setDescricao(route.params.descricao);

      if (route.params.prioridade)
        setPrioridade(route.params.prioridade);

      if (route.params.latitude)
        setLatitude(route.params.latitude);

      if (route.params.longitude)
        setLongitude(route.params.longitude);

      if (route.params.nomeLocal)
        setNomeLocal(route.params.nomeLocal);

    }

  }, [route.params]);

  async function salvar() {

    if (!titulo.trim()) {

      Alert.alert(
        "Atenção",
        "Informe um título para a tarefa."
      );

      return;

    }

    try {

      setLoading(true);

      await adicionarTarefa({

        titulo,

        descricao,

        prioridade,

        nome_local: nomeLocal,

        latitude,

        longitude,

      });

      Alert.alert(
        "Sucesso",
        "Tarefa criada!"
      );

      navigation.goBack();

    } catch (e) {

      console.log(e);

      Alert.alert(
        "Erro",
        "Não foi possível salvar."
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <Card style={styles.card}>

        <Card.Content>

          <Text
            variant="headlineSmall"
            style={styles.title}
          >

            Nova tarefa

          </Text>

          <Divider style={styles.divider} />

          <TextInput

            label="Título"

            mode="outlined"

            value={titulo}

            onChangeText={setTitulo}

            style={styles.input}

          />

          <TextInput

            label="Descrição"

            mode="outlined"

            multiline

            numberOfLines={4}

            value={descricao}

            onChangeText={setDescricao}

            style={styles.input}

          />

          <Text
            variant="titleMedium"
            style={styles.label}
          >

            Prioridade

          </Text>

          <View style={styles.row}>

            <Chip

              selected={prioridade==="alta"}

              onPress={()=>
                setPrioridade("alta")
              }

            >

              Alta

            </Chip>

            <Chip

              selected={prioridade==="media"}

              onPress={()=>
                setPrioridade("media")
              }

            >

              Média

            </Chip>

            <Chip

              selected={prioridade==="baixa"}

              onPress={()=>
                setPrioridade("baixa")
              }

            >

              Baixa

            </Chip>

          </View>

          <TextInput

            label="Nome do Local"

            mode="outlined"

            value={nomeLocal}

            onChangeText={setNomeLocal}

            style={styles.input}

          />

          <Button

            icon="map-marker"

            mode="outlined"

            onPress={()=>
              navigation.navigate(
                "Mapa",
                {
                  titulo,
                  descricao,
                  prioridade,
                  nomeLocal,
                  latitude,
                  longitude,
                }
              )
            }

            style={styles.input}

          >

            Escolher Local no Mapa

          </Button>

          {

            latitude && (

              <Card
                style={styles.locationCard}
              >

                <Card.Content>

                  <Text
                    variant="titleSmall"
                  >

                    Local selecionado

                  </Text>

                  <Divider
                    style={{
                      marginVertical:10
                    }}
                  />

                  <Text>

                    📍 {nomeLocal}

                  </Text>

                  <Text>

                    Latitude

                  </Text>

                  <Text>

                    {latitude}

                  </Text>

                  <Text
                    style={{
                      marginTop:10
                    }}
                  >

                    Longitude

                  </Text>

                  <Text>

                    {longitude}

                  </Text>

                </Card.Content>

              </Card>

            )

          }

          <Button

            mode="contained"

            icon="content-save"

            loading={loading}

            onPress={salvar}

            style={{
              marginTop:15
            }}

          >

            Salvar Tarefa

          </Button>

        </Card.Content>

      </Card>

    </ScrollView>

  );

}

const styles=StyleSheet.create({

container:{

flex:1,

backgroundColor:Colors.background,

padding:16,

},

card:{

borderRadius:20,

marginBottom:40,

},

title:{

fontWeight:"bold",

},

divider:{

marginVertical:20,

},

input:{

marginBottom:16,

},

label:{

marginBottom:10,

fontWeight:"bold",

},

row:{

flexDirection:"row",

justifyContent:"space-between",

marginBottom:20,

},

locationCard:{

marginVertical:20,

backgroundColor:Colors.background,

},

});