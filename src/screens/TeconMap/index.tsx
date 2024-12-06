import React, { useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import Orientation from "react-native-orientation-locker";

import { HomeRoutesProps } from "../../routes/home.routes";
import { useNavigation } from "@react-navigation/native";

import { IconReturn } from "../../components/IconReturn";
import { styles } from "./styles";
import mapTecon from "../../assets/TeconMap.png";

export function TeconMap() {
  useEffect(() => {
    Orientation.lockToLandscape();

    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  const navigation = useNavigation<HomeRoutesProps>();

  function handleGoBack() {
    navigation.navigate("TabRoutes");
  }

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backHome}>
        <IconReturn width={40} height={40} />
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={mapTecon} style={styles.image} resizeMode="contain" />
        </View>
      </View>
    </View>
  );
}
