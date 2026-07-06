import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const CHAVE_RAIO = "@rotinaapp:raio_alerta";
const RAIO_PADRAO = 200;

const ConfiguracoesContext = createContext({});

export function ConfiguracoesProvider({ children }) {

  const [raioAlerta, setRaioAlertaState] = useState(RAIO_PADRAO);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    carregar();
  }, []);

  async function carregar() {

    try {

      const salvo = await AsyncStorage.getItem(CHAVE_RAIO);

      if (salvo) setRaioAlertaState(Number(salvo));

    } catch (e) {

      console.log(e);

    } finally {

      setCarregado(true);

    }

  }

  async function setRaioAlerta(valor) {

    setRaioAlertaState(valor);

    try {

      await AsyncStorage.setItem(CHAVE_RAIO, String(valor));

    } catch (e) {

      console.log(e);

    }

  }

  return (
    <ConfiguracoesContext.Provider
      value={{
        raioAlerta,
        setRaioAlerta,
        carregado,
      }}
    >
      {children}
    </ConfiguracoesContext.Provider>
  );

}

export function useConfiguracoes() {
  return useContext(ConfiguracoesContext);
}
