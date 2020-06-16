import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View, Text, Button } from "react-native";

import Screen from "../components/Screen";
import Card from "../components/Card";
import colors from "../config/colors";
import { color } from "react-native-reanimated";
import {
  setupPhotoclassListener,
  initPhotoclassDB,
} from "../firebase/fb-photoclass";
import routes from "../navigation/routes";

const listings = [
  {
    id: 1,
    title: "Amazing Scenery",
    price: 100,
    image: require("../assets/background_image_2.jpg"),
    class: "Class-S",
  },
  {
    id: 2,
    title: "Most important pic on the internet",
    price: 100,
    image: require("../assets/background_image_4.jpg"),
    class: "Class-S",
  },
  {
    id: 3,
    title: "Red jacket for sale",
    price: 100,
    image: require("../assets/jacket.jpg"),
    class: "Class-A",
  },
  {
    id: 4,
    title: "Couch in great condition",
    price: 1000,
    image: require("../assets/couch.jpg"),
    class: "Class-B",
  },
];

function ListingsScreen({ navigation }) {
  const [display, setDisplay] = useState("All");
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    try {
      initPhotoclassDB();
    } catch (err) {
      console.log(err);
    }
    setupPhotoclassListener((data) => {
      setPhotos(data);
      // console.log(data);
    });
  }, []);

  const displayFilter = (item) => {
    if (display === "All") {
      return item;
    } else if (display === "Class-S" && item.class === "Class-S") {
      return item;
    } else if (display === "Class-A" && item.class === "Class-A") {
      return item;
    } else if (display === "Class-B" && item.class === "Class-B") {
      return item;
    } else if (display === "Class-C" && item.class === "Class-C") {
      return item;
    }
  };

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.label}>
          <Button
            color={colors.black}
            title="Class-S"
            onPress={() => {
              setDisplay("Class-S");
            }}
          />
        </View>
        <View style={styles.label}>
          <Button
            color={colors.black}
            title="Class-A"
            onPress={() => {
              setDisplay("Class-A");
            }}
          />
        </View>
        <View style={styles.label}>
          <Button
            color={colors.black}
            title="Class-B"
            onPress={() => {
              setDisplay("Class-B");
            }}
          />
        </View>
        <View style={styles.label}>
          <Button
            color={colors.black}
            title="Class-C"
            onPress={() => {
              setDisplay("Class-C");
            }}
          />
        </View>
      </View>
      <FlatList
        data={photos.filter(displayFilter)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            //  subTitle={"$" + item.price}
            // image={item.image}
            imageUrl={item.url}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },

  label: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    height: 40,
    justifyContent: "center",
    textAlign: "center",
    marginVertical: 10,
    color: "black",
    marginRight: 12,
    padding: 2,
  },
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
