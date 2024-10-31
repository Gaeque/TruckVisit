import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { LastTransactions } from "../screens/LastTransactions";
import { TabRoutes } from "./tab.routes";

type HomeProps = {
  TabRoutes: undefined;
  HomeScreen: undefined;
  LastTransactions: undefined;
};

export type HomeRoutesProps = NativeStackNavigationProp<HomeProps>;

const { Navigator, Screen } = createNativeStackNavigator<HomeProps>();

export function HomeRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="TabRoutes" component={TabRoutes} />
      <Screen name="LastTransactions" component={LastTransactions} />
    </Navigator>
  );
}
