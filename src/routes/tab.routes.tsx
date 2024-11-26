import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { Profile } from "../screens/Profile";

import THEME from "../THEME";

import IconHome from "../assets/IconHome.svg";
import IconUser from "../assets/IconUser.svg";

import { Home } from "../screens/Home";

type TabRoutes = {
  Home: undefined;
  Profile: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<TabRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<TabRoutes>();

export function TabRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: THEME.COLORS.ORANGE,
        tabBarStyle: {
          backgroundColor: THEME.COLORS.GREY,
        },
      }}
    >
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <IconHome width={30} height={30} fill={color} />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <IconUser width={30} height={30} fill={color} />
          ),
        }}
      />
    </Navigator>
  );
}
