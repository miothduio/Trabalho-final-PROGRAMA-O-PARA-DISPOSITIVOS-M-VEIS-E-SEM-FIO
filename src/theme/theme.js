import {
  MD3LightTheme,
} from "react-native-paper";

import Colors from "./colors";

const theme = {
  ...MD3LightTheme,

  roundness: 14,

  colors: {

    ...MD3LightTheme.colors,

    primary: Colors.primary,

    secondary: Colors.secondary,

    background: Colors.background,

    surface: Colors.surface,

    error: Colors.danger,

    onPrimary: "#FFFFFF",

    onSecondary: "#FFFFFF",

    onSurface: Colors.text,

    outline: Colors.border,

  },

};

export default theme;