import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
} from 'react-native';

import { supabase } from '../services/supabase';
import Colors from '../theme/colors';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  async function cadastrar() {
    if (!email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
    });

    if (error) {
      Alert.alert('Erro', error.message);
    } else {
      Alert.alert(
        'Sucesso',
        'Conta criada com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>📍</Text>

      <Text style={styles.title}>
        Criar Conta
      </Text>

      <Text style={styles.subtitle}>
        Cadastre-se para usar o RotinaApp
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

      <TextInput
        placeholder="Confirmar senha"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={cadastrar}
      >
        <Text style={styles.buttonText}>
          Cadastrar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.link}>
          Já tenho uma conta
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