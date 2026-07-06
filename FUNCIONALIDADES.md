# RotinaApp — Mapa das funcionalidades

Guia rápido de onde cada requisito do trabalho está implementado no código,
para consulta durante a apresentação.

## 1. Autenticação (Supabase Auth)

| Funcionalidade | Arquivo |
|---|---|
| Tela de login | `src/screens/LoginScreen.js` |
| Tela de cadastro | `src/screens/RegisterScreen.js` |
| Cliente Supabase configurado | `src/services/supabase.js` |
| Sessão (login/logout, persistência) | `src/contexts/AuthContext.js` |
| Logout | `AuthContext.js` → função `signOut()`, chamada em `src/screens/ProfileScreen.js` |
| Proteção de rotas (redireciona se não logado) | `App.js` → componente `Routes()`, alterna `AuthNavigator`/`AppNavigator` conforme `session` |

**Como mostrar:** deslogar e logar de novo, mostrar que ao fechar e abrir o app a sessão continua (persistência via AsyncStorage configurada em `supabase.js`).

## 2. CRUD de Tarefas

| Funcionalidade | Arquivo |
|---|---|
| Toda a lógica de dados (criar/listar/editar/excluir/concluir) | `src/contexts/TarefasContext.js` |
| Listar tarefas (FlatList) | `src/screens/ListaScreen.js` |
| Criar tarefa | `src/screens/FormScreen.js` |
| Editar tarefa | `src/screens/EditarScreen.js` |
| Excluir tarefa | `TarefasContext.js` → `deletarTarefa()`, botão na `ListaScreen`/`TarefaCard` |
| Marcar como concluída | `TarefasContext.js` → `toggleConcluida()` |
| Filtros por prioridade/status | `src/components/FiltroTarefas.js` (usado dentro da `ListaScreen`) |
| Card visual de cada tarefa | `src/components/TarefaCard.js` |

**Como mostrar:** criar uma tarefa, editar, marcar como concluída, filtrar por prioridade/status, excluir.

## 3. Localização e Mapa

| Funcionalidade | Arquivo |
|---|---|
| Escolher local no mapa ao criar/editar tarefa (pin arrastável) | `src/screens/MapaScreen.js` + `src/components/mapa/LocalMarker.js` |
| Botão "ir para minha localização" | `src/components/mapa/CurrentLocationButton.js` |
| Ver todas as tarefas como pins coloridos por prioridade (tab "Mapa") | `src/screens/MapaTarefasScreen.js` + `src/components/mapa/TarefaMarker.js` |
| Card com resumo ao tocar num pin | `src/components/mapa/MarkerInfoCard.js` |
| Tela de detalhe da tarefa (ao tocar no pin ou no card da lista) | `src/screens/DetalheScreen.js` |

**Como mostrar:** criar uma tarefa escolhendo local no mapa → ir na tab "Mapa" → tocar no pin → "Ver detalhes". Também: tocar direto num card na lista de tarefas abre o mesmo detalhe.

## 4. Notificação de proximidade (Semana 4)

| Funcionalidade | Arquivo |
|---|---|
| Verificação periódica da localização do usuário | `src/components/ProximidadeWatcher.js` (usa `Location.watchPositionAsync`) |
| Cálculo de distância até cada tarefa | `src/services/geolocalizacao.js` → `calcularDistanciaMetros()` |
| Disparo da notificação local | `src/services/notificacoes.js` → `notificarProximidade()` |
| Configuração de permissões/canal de notificação | `src/services/notificacoes.js` → `configurarNotificacoes()` |
| Raio de alerta configurável pelo usuário | `src/contexts/ConfiguracoesContext.js` (salvo com AsyncStorage) + UI em `src/screens/ProfileScreen.js` |
| Status de permissões (localização/notificação) + atalho pra configurações do celular | `src/screens/ProfileScreen.js` |

**Importante para explicar ao professor:** a verificação roda em **foreground** (com o app aberto), usando `watchPositionAsync`, porque verificação 100% em segundo plano (app fechado/minimizado) exige um *development build* — não funciona no Expo Go. Isso está documentado no início do `ProximidadeWatcher.js`... (comentário não existe no código atualmente — é só pra você citar de cabeça na apresentação).

**Como mostrar:** no Perfil, definir um raio grande (ex: 5000m), abrir uma tarefa com local perto de você (ou usar um local que você sabe que está dentro do raio) e deixar o app aberto — a notificação deve aparecer.

## 5. Configurações e Perfil

| Funcionalidade | Arquivo |
|---|---|
| Ver e-mail do usuário logado | `src/screens/ProfileScreen.js` |
| Configurar raio de alerta | `ProfileScreen.js` + `ConfiguracoesContext.js` |
| Ver status de permissões | `ProfileScreen.js` |
| Logout | `ProfileScreen.js` |

## 6. Navegação (estrutura geral)

- `App.js` — ponto de entrada, decide entre tela de auth ou app logado, monta todos os "providers" (Auth, Configurações, Tarefas) e o `ProximidadeWatcher`.
- `src/navigation/AuthNavigator.js` — Stack de Login/Cadastro.
- `src/navigation/AppNavigator.js` — Tabs: Tarefas / Mapa / Perfil.
- `src/navigation/TarefasNavigator.js` — Stack dentro da tab Tarefas (Lista → Form/Editar/Mapa/Detalhe).
- `src/navigation/MapaTarefasNavigator.js` — Stack dentro da tab Mapa (MapaTarefas → Detalhe/Editar/Mapa).

## 7. Tema/Design

- `src/theme/colors.js` — paleta de cores usada em todo o app.
- `src/theme/theme.js` — tema do react-native-paper (aplicado em `App.js` via `PaperProvider`).

---

## Como usar `console.log` para mostrar o funcionamento ao vivo

Você não precisa de nenhuma ferramenta extra: o `console.log` que já existe no código
(e qualquer um que você adicionar) aparece automaticamente no terminal onde você rodou
`npx expo start`, em tempo real, enquanto o app roda no celular.

### Passo a passo

1. Rode `npx expo start` no terminal e deixe essa janela visível durante a apresentação.
2. Abra o app no Expo Go. Tudo que o app fizer que passe por um `console.log` vai aparecer nesse terminal.
3. Se quiser adicionar um log num ponto específico pra mostrar pro professor, é só abrir o arquivo e escrever, por exemplo:

```js
console.log('Localização atual do usuário:', coords);
```

ou

```js
console.log('Tarefa dentro do raio! Distância:', distancia, 'metros');
```

### Onde adicionar (sugestões, caso queira)

- Em `src/components/ProximidadeWatcher.js`, dentro da função `verificarProximidade`, logo depois de calcular `distancia` — mostra a distância até cada tarefa a cada verificação.
- Em `src/contexts/TarefasContext.js`, dentro de `carregarTarefas`, depois do `setTarefas(data ?? [])` — mostra quantas tarefas vieram do Supabase.
- Em `src/contexts/AuthContext.js`, dentro do `onAuthStateChange` — mostra quando o usuário loga/desloga e a sessão muda.
- Em `src/services/notificacoes.js`, dentro de `notificarProximidade`, antes do `scheduleNotificationAsync` — mostra que a notificação está prestes a disparar.

### Ver os logs no celular físico (sem estar com o terminal do PC por perto)

Se quiser ver os logs direto no celular: com o app aberto no Expo Go, agite o celular (ou aperte o botão de menu de dev) para abrir o menu de desenvolvedor e toque em "Open JS Debugger" — os `console.log` aparecem no DevTools do navegador que abrir.
