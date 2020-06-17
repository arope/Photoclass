const { useState } = require("react");

import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import ImageInput from "../ImageInput";

function FormImagePicker({ name }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const [imageUri, setImageUri] = useState();

  return (
    <>
      <ImageInput
        imageUri={imageUri}
        onChangeImage={(uri) => {
          setImageUri(uri);
        }}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormImagePicker;
