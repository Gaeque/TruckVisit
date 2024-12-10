import { TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { IconReturn } from "../../components/IconReturn";
import IconAgendamento2 from "../../assets/IconAgendamento2.svg";

import { styles } from "./styles";

import { HomeRoutesProps } from "../../routes/home.routes";

export function Appointments() {
  const navigation = useNavigation<HomeRoutesProps>();

  function handleGoBack() {
    navigation.navigate("TabRoutes");
  }

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <IconReturn width={40} height={40} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Agendamento</Text>
        <IconAgendamento2 width={40} height={40} />
      </View>
    </View>
  );
}
