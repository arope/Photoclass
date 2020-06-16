import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, StyleSheet, TouchableOpacity } from "react-native";

//import AccountNavigator from "./AccountNavigator";
import FeedNavigator from "./FeedNavigator";
import ListingEditScreen from "../screens/ListingEditScreen";
import NewListingButton from "./NewListingButton";
import routes from "./routes";
import colors from "../config/colors";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Feed"
      component={FeedNavigator}
      // options={({ navigation }) => ({
      //   // tabBarButton: () => (
      //   //   <TouchableOpacity>
      //   //     <View style={styles.container}>
      //   //       <MaterialCommunityIcons
      //   //         name="home"
      //   //         color={colors.primary}
      //   //         size={30}
      //   //         onPress={() => navigation.navigate("Listings", { class: "All"})}
      //   //       />
      //   //     </View>
      //   //   </TouchableOpacity>
      //   // ),
      //   tabBarIcon: ({ color, size }) => (
      //     <MaterialCommunityIcons
      //       name="home"
      //       color={color}
      //       size={size}
      //     />
      //   ),
      // })}

      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="home"
            color={color}
            size={size}
            // onPress={() => navigation.navigate("Listings")}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Add Photo"
      component={ListingEditScreen}
      options={({ navigation }) => ({
        // tabBarButton: () => (
        //   <NewListingButton

        //     onPress={() => navigation.navigate(routes.LISTING_EDIT)}
        //   />
        //   ),
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="plus-circle"
            color={color}
            size={size}
          />
        ),
      })}
    />
    {/* <Tab.Screen
      name="Account"
      component={AccountNavigator}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    /> */}
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  container: {
    marginLeft: 80,
  },
});

export default AppNavigator;
