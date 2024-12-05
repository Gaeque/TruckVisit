import React, { useContext } from "react";
import { Image, StyleSheet } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";

type AvatarProps = {
  size?: number;
};

const defaultUserImage = require("../../assets/UserAvatar.png");

export function UserAvatar({ size = 48 }: AvatarProps) {
  const { user } = useContext(AuthContext);

  const userImageSource = user.userImage
    ? { uri: `data:image/png;base64,${user.userImage}` }
    : defaultUserImage;

  return (
    <Image
      source={userImageSource}
      style={[
        { width: size, height: size, borderRadius: size / 2 },
      ]}
      resizeMode="cover"
    />
  );
}

