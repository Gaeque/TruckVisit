import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { LastTransactions } from "../screens/LastTransactions";
import { TabRoutes } from "./tab.routes";
import { TeconMap } from "../screens/TeconMap"
import { Appointments } from "../screens/Appointments";

type HomeProps = {
  TabRoutes: undefined;
  HomeScreen: undefined;
  LastTransactions: undefined;
  TeconMap: undefined;
  Appointments: undefined;
};

export type HomeRoutesProps = NativeStackNavigationProp<HomeProps>;

const { Navigator, Screen } = createNativeStackNavigator<HomeProps>();

export function HomeRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="TabRoutes" component={TabRoutes} />
      <Screen name="LastTransactions" component={LastTransactions} />
      <Screen name="TeconMap" component={TeconMap} />
      <Screen name="Appointments" component={Appointments} />
    </Navigator>
  );
}
