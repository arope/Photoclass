import React from "react";
import { View, StyleSheet, Image } from "react-native";

import colors from "../config/colors";
import Text from "../components/Text";
import Screen from "../components/Screen";

function PhotoclassDetailsScreen({ route }) {
  const photo = route.params;

  return (
    <Screen>
      <Image
        resizeMode="contain"
        style={styles.image}
        tint="light"
        source={{
          uri: photo.url,
        }}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{photo.title}</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    marginTop: 30,
    width: "100%",
    height: 550,
  },
  price: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default PhotoclassDetailsScreen;
