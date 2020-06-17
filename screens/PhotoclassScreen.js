import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View, Text, Button, Alert } from "react-native";

import Screen from "../components/Screen";
import Card from "../components/Card";
import colors from "../config/colors";
import {
  setupPhotoclassListener,
  initPhotoclassDB,
  deletePhoto,
} from "../firebase/fb-photoclass";
import routes from "../navigation/routes";
import Toast from "react-native-root-toast";

function PhotoclassScreen({ navigation }) {
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
            imageUrl={item.url}
            onPress={() => navigation.navigate(routes.PHOTOCLASS_DETAILS, item)}
            onLongPress={() => {
              Alert.alert(
                "Delete",
                "Are you sure you want to delete this photo?",
                [
                  {
                    text: "Yes",
                    onPress: () => {
                      deletePhoto(item);
                      Toast.show(`Deleted ${item.title}`, {
                        duration: Toast.durations.SHORT,
                        animation: true,
                        hideOnPress: true,
                      });
                    },
                  },
                  { text: "No" },
                ]
              );
            }}
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

export default PhotoclassScreen;
