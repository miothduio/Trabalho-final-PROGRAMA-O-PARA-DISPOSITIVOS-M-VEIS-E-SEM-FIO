import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';

import theme from './src/theme/theme';

import {
  AuthProvider,
  useAuth,
} from './src/contexts/AuthContext';

import {
  TarefasProvider,
} from './src/contexts/TarefasContext';

import {
  ConfiguracoesProvider,
} from './src/contexts/ConfiguracoesContext';

import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';
import ProximidadeWatcher from './src/components/ProximidadeWatcher';

function Routes() {
  const { session, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      {session ? (
        <AppNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <AuthProvider>
          <ConfiguracoesProvider>
            <TarefasProvider>
              <ProximidadeWatcher />
              <Routes />
            </TarefasProvider>
          </ConfiguracoesProvider>
        </AuthProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}