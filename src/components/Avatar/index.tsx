import { useContext } from "react";
import { Avatar } from "react-native-paper";
import { AuthContext } from "../../contexts/AuthContext";

type AvatarProps = {
  size?: number;
};

const defaultUserImage = require("../../assets/UserAvatar.svg");

export function UserAvatar({ size = 48 }: AvatarProps) {
  const { user } = useContext(AuthContext);

  const userImageSource = user.userImage
    ? { uri: `data:image/png;base64,${user.userImage}` }
    : defaultUserImage;

  return <Avatar.Image size={size} source={userImageSource} />;
}
