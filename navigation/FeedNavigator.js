import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PhotoclassScreen from "../screens/PhotoclassScreen";
import PhotoclassDetailsScreen from "../screens/PhotoclassDetailsScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Photoclass" component={PhotoclassScreen} />
    <Stack.Screen
      name="PhotoclassDetails"
      component={PhotoclassDetailsScreen}
    />
  </Stack.Navigator>
);

export default FeedNavigator;
