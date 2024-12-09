import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Modal, Image } from "react-native";
import Orientation from "react-native-orientation-locker";
import ImageViewer from "react-native-image-zoom-viewer";

import { styles } from "./styles";
import { IconReturn } from "../../components/IconReturn";
import { HomeRoutesProps } from "../../routes/home.routes";
import { useNavigation } from "@react-navigation/native";

export function TeconMap() {
  const navigation = useNavigation<HomeRoutesProps>();
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    Orientation.lockToLandscape();

    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  useEffect(() => {
    const resolvedImage = Image.resolveAssetSource(
      require("../../assets/TeconMap.png")
    );
    setImageUrl(resolvedImage.uri);
  }, []);

  function handleGoBack() {
    navigation.navigate("TabRoutes");
  }

  const images = [
    {
      url: imageUrl,
    },
  ];

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Modal visible={true} transparent={true}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backHome}>
            <IconReturn width={40} height={40} />
          </TouchableOpacity>
          <ImageViewer
            imageUrls={images}
            enableImageZoom={true}
            renderIndicator={() => <></>}
          />
        </Modal>
      </View>
    </View>
  );
}
