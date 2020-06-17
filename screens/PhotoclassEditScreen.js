import React from "react";
import { StyleSheet, Alert } from "react-native";
import * as Yup from "yup";

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import { useState } from "react";

import ImageInput from "../components/ImageInput";
import { uploadImage } from "../firebase/fb-photoclass";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  category: Yup.object().required().nullable().label("Category"),
});

const categories = [
  {
    backgroundColor: "#26de81",
    icon: "floor-lamp",
    label: "Class-S",
    value: 1,
  },
  {
    backgroundColor: "#fed330",
    icon: "car",
    label: "Class-A",
    value: 2,
  },
  {
    backgroundColor: "#4b7bec",
    icon: "camera",
    label: "Class-B",
    value: 3,
  },
  {
    backgroundColor: "#a55eea",
    icon: "cards",
    label: "Class-C",
    value: 4,
  },
];

function PhotoclassEditScreen(props) {
  const [imageUri, setImageUri] = useState();

  const postPressed = async (title, category) => {
    console.log(title);
    console.log(category);
    const result = await uploadImage(imageUri, title, category, (progress) => {
      console.log(progress);
    });
    Alert.alert("Success");
  };

  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{
          title: "",
          category: null,
        }}
        onSubmit={(values, { resetForm }) => {
          postPressed(values.title, values.category.label);
          resetForm();
        }}
        validationSchema={validationSchema}
      >
        <ImageInput
          imageUri={imageUri}
          onChangeImage={(uri) => {
            setImageUri(uri);
          }}
        />
        <FormField maxLength={255} name="title" placeholder="Title" />
        <Picker
          items={categories}
          name="category"
          numberOfColumns={2}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
          width="50%"
        />
        <SubmitButton title="Post" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default PhotoclassEditScreen;
