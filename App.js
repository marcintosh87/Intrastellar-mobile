import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { NativeBaseProvider, Box } from "native-base";

import React from "react";

import Main from "./Main.js";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#00539a",
    accent: "#fff",
  },
};

export default function App() {
  return (
    <NativeBaseProvider>
      <Main />
    </NativeBaseProvider>
  );
}
