import { ScrollView, View } from "react-native";
import { Header } from "../../components/Header";
import { CardHome } from "../../components/CardHome";

import { styles } from "./styles";

import IconTransacoes from "../../assets/IconTransacoes.svg";
import { useNavigation } from "@react-navigation/native";
import { HomeRoutesProps } from "../../routes/home.routes";

export function Home() {
  const navigation = useNavigation<HomeRoutesProps>();

  function handleLastTransactions() {
    navigation.navigate("LastTransactions");
  }

  return (
    <View>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.cardContainer}>
          <CardHome
            icon={<IconTransacoes />}
            title="Últimas transações"
            onPress={handleLastTransactions}
          />
        </View>
      </ScrollView>
    </View>
  );
}
