import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import navigationTheme from "./navigation/navigationTheme";
import AppNavigator from "./navigation/AppNavigator";
import AuthNavigator from "./navigation/AuthNavigator";
import AuthContext from "./auth/context";
import * as Analytics from "expo-firebase-analytics";

const getActiveRouteName = (state) => {
  const route = state.routes[state.index];
  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }
  return route.name;
};

export default function App() {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  const [user, setUser] = useState();

  React.useEffect(() => {
    const state = navigationRef.current.getRootState();

    // Save the initial route name
    routeNameRef.current = getActiveRouteName(state);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer
        theme={navigationTheme}
        ref={navigationRef}
        onStateChange={(state) => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = getActiveRouteName(state);
          if (previousRouteName !== currentRouteName) {
            Analytics.setCurrentScreen(currentRouteName, currentRouteName);
          }
        }}
      >
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
