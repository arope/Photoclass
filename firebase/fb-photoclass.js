import * as firebase from "firebase";
import "firebase/database";
import { firebaseConfig } from "./fb-credentials";
// import RNFetchBlob from "react-native-fetch-blob";
import { Platform } from "react-native";

// const Blob = RNFetchBlob.polyfill.Blob;
// const fs = RNFetchBlob.fs;
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
// window.Blob = Blob;

export function initPhotoclassDB() {
  firebase.initializeApp(firebaseConfig);
}

export const uploadImage = async (uri, title, classCat, progressCallback) => {
  console.log("uploadAsFile", uri);
  const response = await fetch(uri);
  const blob = await response.blob();

  let name = new Date().getTime() + "-media.jpg";
  var metadata = {
    contentType: "image/jpeg",
  };

  var ref = firebase
    .storage()
    .ref()
    .child("images/" + name);

  const task = ref.put(blob, metadata);

  // return ref.put(blob);
  return new Promise((resolve, reject) => {
    task.on(
      "state_changed",
      (snapshot) => {
        progressCallback &&
          progressCallback(snapshot.bytesTransferred / snapshot.totalBytes);

        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) =>
        reject(error) /* this is where you would put an error callback! */,
      () => {
        // Upload completed successfully, now we can get the download URL
        task.snapshot.ref
          .getDownloadURL()
          .then(function (downloadURL) {
            console.log("File available at", downloadURL);
            let ref = firebase.database().ref("assets");
            ref.push({
              URL: downloadURL,
              name: name,
              when: new Date().getTime(),
              class: classCat,
              title: title,
            });
          })
          .then(
            (r) => resolve(r),
            (e) => reject(e)
          );
      }
    );
  });
};

export function setupPhotoclassListener(updateFunc) {
  console.log("setupReminderListener called");
  firebase
    .database()
    .ref("assets")
    .on("value", (snapshot) => {
      //  console.log("setupReminderListener fires up with: ", snapshot);
      if (snapshot?.val()) {
        const fbObject = snapshot.val();
        const newArr = [];
        Object.keys(fbObject).map((key, index) => {
          //console.log(key, "||", index, "||", fbObject[key]["URL"]);
          // newArr.push({ ...fbObject[key], id: key });
          newArr.push({
            title: fbObject[key]["title"],
            class: fbObject[key]["class"],
            url: fbObject[key]["URL"],
            id: key,
          });
        });
        updateFunc(newArr);
      } else {
        updateFunc([]);
      }
    });
}
