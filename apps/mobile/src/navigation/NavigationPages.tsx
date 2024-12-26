import { ReactNode } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthWelcomePage } from "../auth/AuthWelcomePage";
import { AuthLoginPage } from "../auth/login/AuthLoginPage";
import { AuthRegisterPage } from "../auth/register/AuthRegisterPage";
import { HomePage } from "../home/HomePage";
import { UserNotificationPage } from "../user/UserNotificationPage";
import { AlertCreatePage } from "../alert/AlertCreatePage";
import { AlertDetailsPage } from "../alert/AlertDetailsPage";

export type INavigationPages = {
  AuthWelcomePage: undefined;
  AuthLoginPage: undefined;
  AuthRegisterPage: undefined;
  HomePage: undefined;
  UserNotificationPage: undefined;
  AlertCreatePage: undefined;
  AlertDetailsPage: {
    _id: string;
  };
};

const Stack = createNativeStackNavigator<INavigationPages>();

export const NavigationPages = (): ReactNode => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="AuthWelcomePage" component={AuthWelcomePage} />
        <Stack.Screen name="AuthLoginPage" component={AuthLoginPage} />
        <Stack.Screen name="AuthRegisterPage" component={AuthRegisterPage} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen
          name="UserNotificationPage"
          component={UserNotificationPage}
        />
        <Stack.Screen name="AlertCreatePage" component={AlertCreatePage} />
        <Stack.Screen name="AlertDetailsPage" component={AlertDetailsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
