import { StatusBar } from "react-native";

import { PaperProvider } from "react-native-paper";

import { AuthContextProvider } from "./src/contexts/AuthContext";

import { Routes } from "./src/routes";

export default function App() {
  return (
    <PaperProvider>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </PaperProvider>
  );
}
