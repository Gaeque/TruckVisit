import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { SignIn } from "../screens/SignIn/SignIn";
import { ConfirmPassword } from "../screens/ConfirmPassword";

type AuthRoutes = {
  SignIn: undefined;
  ConfirmPassword: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="SignIn" component={SignIn}  />
      <Screen name="ConfirmPassword" component={ConfirmPassword} />
    </Navigator>
  );
}
