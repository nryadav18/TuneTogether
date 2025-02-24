import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Images from "react-native-vector-icons/Entypo";
const { width, height } = Dimensions.get("screen");
import { TextInput } from "react-native-paper";
import { colors } from "react-native-swiper-flatlist/src/themes";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import CustomAlert from "../alert/alert";
export default Profile = ({ navigation }) => {
  const [username, setusername] = useState("");

  const [validusername, setvalidusername] = useState(false);

  const [image, setimage] = useState("");

  const [showalert1, setshowalert1] = useState(false);

  const [showalert2, setshowalert2] = useState(false);

  const [showalert3, setshowalert3] = useState(false);

  const [showalert4, setshowalert4] = useState(false);

  const handleChangeTextHandler = (field, value) => {
    const usernameregex = /^(?=.{5,15}$)(?!.*[.]{2})[a-zA-Z0-9][a-zA-Z0-9.]*[a-zA-Z0-9]$/;

    console.log("this is username regex", usernameregex.test(value));
    if (usernameregex.test(value)) {
      setvalidusername(true);
    } else {
      setvalidusername(false);
    }
    setusername(value); // Just set the value directly
  };

  const PickImageHandler = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setimage(result.assets[0].uri);
    } else {
      setimage("");
      return;
    }
  };
  const EditProfileHandler = () => {
    if (!username.trim() && !image) {
      setshowalert1(true);
    }

    else if (username === "") {
      setshowalert4(true)
    }
    else if (!validusername) {
      setshowalert2(true)
    }
    else if (image === "") {
      setshowalert3(true)
    }
    else {
      navigation.navigate("Genre")
    }


  };
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.profilebox}>
        <View>
          <Text style={styles.title}>Complete Profile</Text>
        </View>
        <View>
          <Text style={styles.subtitle}>
            Easier for your friends to find and connect with you
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.imagePlaceholder,
            !image && styles.imagePlaceholderwithoutborder,
          ]}
          onPress={PickImageHandler}
        >
          <Text style={styles.cameraIcon}>
            {image ? (
              <Image style={styles.image} source={{ uri: image }}></Image>
            ) : (
              <Images name="images" size={30} color="black"></Images>
            )}
          </Text>
        </TouchableOpacity>

        <TextInput
          style={[styles.btn]}
          label="Username"
          right={
            validusername ? (
              <TextInput.Icon icon="check-circle" color="green" />
            ) : (
              <TextInput.Icon icon="alert-circle" color="red" />
            )
          }
          mode="outlined"
          activeOutlineColor="hsl(215, 100.00%, 50.00%)"
          onChangeText={(value) => handleChangeTextHandler("userid", value)}
        />
        {validusername === false && (
          <Text style={styles.errorMessage}>
            Username must be 5-15 characters long and can only contain letters,
            numbers, and . or _
          </Text>
        )}

        <TouchableOpacity style={styles.button} onPress={EditProfileHandler}>
          <Text style={styles.buttonText}>CONTINUE</Text>
        </TouchableOpacity>
      </View>

      <CustomAlert
        visible={showalert1}
        title={"All fields are required"}
        onConfirm={() => setshowalert1(false)}
      />

      <CustomAlert
        visible={showalert4}
        title={"No UserName Found"}
        message={"Please enter your username"}
        onConfirm={() => setshowalert4(false)}
      />

      <CustomAlert
        visible={showalert2}
        title={"Invalid Username"}
        message={"Please enter a valid username"}
        onConfirm={() => setshowalert2(false)}
      />

      <CustomAlert
        visible={showalert3}
        title={"No Profile Image Found"}
        message={"Please upload your profile image "}
        onConfirm={() => setshowalert3(false)}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  profilebox: {
    width: width,
    padding: 10,
  },

  backButton: {
    fontSize: 24,
    color: "#333",
  },
  stepText: {
    fontSize: 16,
    color: "#555",
  },
  title: {
    width: width - 40,
    height: 50,
    marginHorizontal: "auto",
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    width: width - 40,
    height: 40,
    marginHorizontal: "auto",
    fontSize: 16,
    color: "gray",
  },
  imagePlaceholder: {
    marginTop: 30,
    alignSelf: "center",
    width: 150,
    height: 150,
    borderRadius: 80,
    borderWidth: 4,
    borderColor: "hsl(197, 100.00%, 98.60%)",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  imagePlaceholderwithoutborder: {
    borderWidth: 2,
    borderStyle: "dashed",
  },
  input: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    width: width - 40,
    marginHorizontal: "auto",
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fff",
  },
  btn: {
    width: width - 40,
    marginHorizontal: "auto",
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    backgroundColor: "hsl(0, 0.00%, 0.00%)",
    width: width - 40,
    marginHorizontal: "auto",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  errorMessage: {
    marginTop: 5,
    color: "red",
    fontSize: 14,
    textAlign: "left",
    fontWeight: "semibold",
    marginHorizontal: 15,
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
});