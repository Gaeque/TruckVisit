import React, { useState, useEffect } from "react";
import { ScrollView, View, Dimensions } from "react-native";
import Orientation from "react-native-orientation-locker";
import { Header } from "../../components/Header";
import { CardHome } from "../../components/CardHome";

import { styles } from "./styles";

import IconTransacoes from "../../assets/IconTransacoes.svg";
import IconMapaTecon from "../../assets/IconMapaTecon.svg";
import IconPasseDePorta from "../../assets/IconPasseDePorta.svg";

import { useNavigation } from "@react-navigation/native";
import { HomeRoutesProps } from "../../routes/home.routes";

export function Home() {
  const navigation = useNavigation<HomeRoutesProps>();
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = Dimensions.get("window");
      setIsLandscape(width > height);
    };
    Orientation.addOrientationListener(updateOrientation);
    updateOrientation();
    return () => {
      Orientation.removeOrientationListener(updateOrientation);
    };
  }, []);

  function handleLastTransactions() {
    navigation.navigate("LastTransactions");
  }

  function handleMapTecon() {
    navigation.navigate("TeconMap");
  }

  return (
    <View style={styles.screen}>
      <Header />
      <ScrollView
        contentContainerStyle={[styles.container, { paddingBottom: 20 }]}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.cardContainer,
            isLandscape ? styles.cardContainerLandscape : null,
          ]}
        >
          <CardHome
            icon={<IconTransacoes />}
            title="Últimas Transações"
            onPress={handleLastTransactions}
          />
          <CardHome
            icon={<IconPasseDePorta />}
            title="Passes de Porta"
            onPress={handleMapTecon}
          />
          <CardHome
            icon={<IconMapaTecon />}
            title="Mapa Tecon"
            onPress={handleMapTecon}
          />
        </View>
      </ScrollView>
    </View>
  );
}
