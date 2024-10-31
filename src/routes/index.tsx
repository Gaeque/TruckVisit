import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { HomeRoutes } from "./home.routes";
import { AuthRoutes } from "./auth.routes";

import { useAuth } from "../hooks/useAuth";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Loading } from "../components/Loading";

export function Routes() {
  const { user, isLoadingUserStorageData } = useAuth();
  const Stack = createNativeStackNavigator();

  if (isLoadingUserStorageData) {
    return <Loading size={40} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user.authN4 ? (
          <Stack.Screen name="HomeRoutes" component={HomeRoutes} />
        ) : (
          <Stack.Screen name="AuthRoutes" component={AuthRoutes} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
