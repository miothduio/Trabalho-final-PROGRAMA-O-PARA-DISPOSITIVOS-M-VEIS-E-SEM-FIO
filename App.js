import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import * as Notifications from 'expo-notifications';

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

import { configurarListenerDeResposta } from './src/services/notificacoes';
import {
  navigationRef,
  navegarParaTarefa,
  navegarParaTarefaPendente,
} from './src/services/navigationRef';

function useAbrirTarefaPelaNotificacao() {

  useEffect(() => {

    Notifications.getLastNotificationResponseAsync().then((resposta) => {
      const tarefaId = resposta?.notification.request.content.data?.tarefaId;
      if (tarefaId) navegarParaTarefa(tarefaId);
    });

    const assinatura = configurarListenerDeResposta(navegarParaTarefa);

    return () => assinatura.remove();

  }, []);

}

function Routes() {
  const { session, loading } = useAuth();

  useAbrirTarefaPelaNotificacao();

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={navegarParaTarefaPendente}
    >
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