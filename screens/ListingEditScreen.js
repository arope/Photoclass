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
import { useState, useEffect } from "react";

import ImageInput from "../components/ImageInput";

import Button from "../components/Button";
import {
  initPhotoclassDB,
  uploadImage,
  storeReminderItem,
} from "../firebase/fb-photoclass";
import FormImagePicker from "../components/forms/FormImagePicker";
import TextInput from "../components/TextInput";

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

function ListingEditScreen(props) {
  const [imageUri, setImageUri] = useState();

  // useEffect(() => {
  //   try {
  //     initPhotoclassDB();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  const postPressed = async (title, category) => {
    // console.log(imageUri);
    console.log(title);
    console.log(category);
    const result = await uploadImage(imageUri, title, category, (progress) => {
      console.log(progress);
    });
    Alert.alert("Success");
    // resetForm();
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

export default ListingEditScreen;

// const validationSchema = Yup.object().shape({
//   title: Yup.string().required().min(1).label("Title"),
//   price: Yup.number().required().min(1).max(10000).label("Price"),
//   description: Yup.string().label("Description"),
//   category: Yup.object().required().nullable().label("Category"),
//   images: Yup.array().min(1, "Please select an image"),
// });

// function ListingEditScreen() {
//   const [imageUri, setImageUri] = useState();
//   const [title, setTitle] = useState("");
//   const [clas, setClas] = useState("");

//   useEffect(() => {
//     try {
//       initPhotoclassDB();
//     } catch (err) {
//       console.log(err);
//     }
//   }, []);

//   console.log("Okay Print");
//   const postPressed = async (title, category) => {
//     // console.log(imageUri);
//     console.log(title);
//     console.log(category);
//     // const result = await uploadImage(imageUri, title, category, (progress) => {
//     //   console.log(progress);
//     // });
//     //Alert.alert("Success");
//     // resetForm();
//   };

//   return (
//     <Screen style={styles.container}>
//       <Form
//         initialValues={{
//           title: "",
//           price: "",
//           description: "",
//           category: null,
//           images: [],
//         }}
//         onSubmit={(values) => console.log(values)}
//         // onSubmit={(values) => {
//         //   console.log(values);
//         //   // console.log("Button");
//         //   // postPressed(values.title, values.category.label);
//         // }}
//         validationSchema={validationSchema}
//       >
//         {/* <ImageInput
//           imageUri={imageUri}
//           onChangeImage={(uri) => {
//             setImageUri(uri);
//           }}
//         /> */}

//         <FormImagePicker name="images" />

//         <FormField maxLength={255} name="title" placeholder="Title" />

//         {/*
//         <TextInput
//           maxLength={255}
//           name="title"
//           placeholder="Title"
//           onChangeText={(tite) => setTitle(tite)}
//         /> */}

//         <FormField
//           keyboardType="numeric"
//           maxLength={8}
//           name="price"
//           placeholder="Price"
//           width={120}
//         />
//         <Picker
//           items={categories}
//           name="category"
//           numberOfColumns={2}
//           PickerItemComponent={CategoryPickerItem}
//           placeholder="Category"
//           width="50%"
//         />
//         <FormField
//           maxLength={255}
//           multiline
//           name="description"
//           numberOfLines={3}
//           placeholder="Description"
//         />

//         {/* <Button
//           title="Post"
//           onPress={() => {
//             // postImage();
//             // console.log(title);
//             console.log("Post Pressed");
//           }} */}
//         {/* /> */}

//         <SubmitButton title="Post" />
//       </Form>
//     </Screen>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 10,
//   },
// });
// export default ListingEditScreen;
