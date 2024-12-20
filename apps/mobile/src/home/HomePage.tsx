import { useTranslation } from "react-i18next";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AlarmClock, User } from "@tamagui/lucide-icons";
import { UserProfilePage } from "../user/UserProfilePage";
import { primary, secondary } from "@crypto-alert/ui";
import { AlertPage } from "../alert/AlertPage";

export const HomePage = () => {
  const { t } = useTranslation();
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: secondary,
        tabBarInactiveBackgroundColor: secondary,
        tabBarActiveTintColor: primary,
      }}
    >
      <Tab.Screen
        name={t("Alerts")}
        component={AlertPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <AlarmClock color={focused ? "$primary" : "$gray10"} />
          ),
        }}
      />
      <Tab.Screen
        name={t("Profile")}
        component={UserProfilePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <User color={focused ? "$primary" : "$gray10"} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
