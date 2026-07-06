import React, { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';

import {
  Card,
  Text,
  TextInput,
  Button,
  Divider,
} from 'react-native-paper';

import { useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

import { useAuth } from '../contexts/AuthContext';
import { useConfiguracoes } from '../contexts/ConfiguracoesContext';

import Colors from '../theme/colors';

export default function ProfileScreen() {

  const { session, signOut } = useAuth();
  const { raioAlerta, setRaioAlerta } = useConfiguracoes();

  const [valorRaio, setValorRaio] = useState(String(raioAlerta));

  const [statusLocalizacao, setStatusLocalizacao] = useState(null);
  const [statusNotificacao, setStatusNotificacao] = useState(null);

  useFocusEffect(
    useCallback(() => {
      verificarPermissoes();
    }, [])
  );

  async function verificarPermissoes() {

    const localizacao = await Location.getForegroundPermissionsAsync();
    setStatusLocalizacao(localizacao.status);

    const notificacao = await Notifications.getPermissionsAsync();
    setStatusNotificacao(notificacao.status);

  }

  function salvarRaio() {

    const numero = Number(valorRaio);

    if (!numero || numero <= 0) {
      setValorRaio(String(raioAlerta));
      return;
    }

    setRaioAlerta(numero);

  }

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>
        Perfil
      </Text>

      <Text style={styles.email}>
        {session?.user?.email}
      </Text>

      <Card style={styles.card}>
        <Card.Content>

          <Text variant="titleMedium" style={styles.cardTitle}>
            Raio de alerta
          </Text>

          <Text style={styles.cardSubtitle}>
            Distância (em metros) para receber uma notificação ao
            se aproximar de uma tarefa pendente.
          </Text>

          <TextInput
            mode="outlined"
            keyboardType="numeric"
            value={valorRaio}
            onChangeText={setValorRaio}
            onBlur={salvarRaio}
            right={<TextInput.Affix text="m" />}
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={salvarRaio}
            style={styles.botaoSalvar}
          >
            Salvar raio
          </Button>

        </Card.Content>
      </Card>

      <Card style={[styles.card, styles.cardPermissoes]}>
        <Card.Content>

          <Text variant="titleMedium" style={styles.cardTitle}>
            Permissões
          </Text>

          <View style={styles.linhaPermissao}>
            <Text style={styles.labelPermissao}>Localização</Text>
            <Text style={[
              styles.valorPermissao,
              statusLocalizacao === 'granted'
                ? styles.permissaoOk
                : styles.permissaoNegada,
            ]}>
              {statusLocalizacao === 'granted' ? 'Concedida' : 'Negada'}
            </Text>
          </View>

          <View style={styles.linhaPermissao}>
            <Text style={styles.labelPermissao}>Notificações</Text>
            <Text style={[
              styles.valorPermissao,
              statusNotificacao === 'granted'
                ? styles.permissaoOk
                : styles.permissaoNegada,
            ]}>
              {statusNotificacao === 'granted' ? 'Concedida' : 'Negada'}
            </Text>
          </View>

          {(statusLocalizacao !== 'granted' || statusNotificacao !== 'granted') && (
            <>
              <Text style={styles.avisoPermissao}>
                Sem essas permissões o app não consegue avisar quando
                você estiver perto de uma tarefa pendente.
              </Text>

              <Button
                mode="outlined"
                icon="cog"
                style={styles.botaoSalvar}
                onPress={() => Linking.openSettings()}
              >
                Abrir configurações
              </Button>
            </>
          )}

        </Card.Content>
      </Card>

      <Divider style={styles.divider} />

      <Button
        mode="outlined"
        icon="logout"
        textColor={Colors.danger}
        onPress={signOut}
        style={styles.botaoSair}
      >
        Sair
      </Button>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },

  email: {
    color: Colors.subtitle,
    marginTop: 4,
    marginBottom: 20,
  },

  card: {
    borderRadius: 18,
  },

  cardPermissoes: {
    marginTop: 16,
  },

  linhaPermissao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  labelPermissao: {
    color: Colors.text,
  },

  valorPermissao: {
    fontWeight: 'bold',
  },

  permissaoOk: {
    color: Colors.success,
  },

  permissaoNegada: {
    color: Colors.danger,
  },

  avisoPermissao: {
    color: Colors.subtitle,
    marginTop: 14,
    marginBottom: 10,
  },

  cardTitle: {
    fontWeight: 'bold',
  },

  cardSubtitle: {
    color: Colors.subtitle,
    marginTop: 6,
    marginBottom: 16,
  },

  input: {
    marginBottom: 12,
  },

  botaoSalvar: {
    marginTop: 4,
  },

  divider: {
    marginVertical: 24,
  },

  botaoSair: {
    borderColor: Colors.danger,
  },
});
