import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';

import { supabase } from '../services/supabase';
import Colors from '../theme/colors';

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function fazerLogin() {

    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      Alert.alert('Erro', error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>📍</Text>

      <Text style={styles.title}>
        RotinaApp
      </Text>

      <Text style={styles.subtitle}>
        Entre para organizar suas tarefas por localização
      </Text>

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={fazerLogin}
      >
        <Text style={styles.buttonText}>
          Entrar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Cadastro')}
      >
        <Text style={styles.link}>
          Criar uma conta
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: Colors.background,
  },

  logo: {
    fontSize: 60,
    textAlign: 'center',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primary,
    marginTop: 10,
  },

  subtitle: {
    textAlign: 'center',
    color: Colors.subtitle,
    marginBottom: 40,
  },

  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },

  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    elevation: 4,
  },

  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },

  link: {
    textAlign: 'center',
    color: Colors.primary,
    marginTop: 20,
    fontSize: 16,
    fontWeight: '600',
  },
});
