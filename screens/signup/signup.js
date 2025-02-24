import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  TextInput,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import React, { use, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Eye from "react-native-vector-icons/Entypo";
import Google from "react-native-vector-icons/FontAwesome";
import Facebook from "react-native-vector-icons/MaterialCommunityIcons";
import Apple from "react-native-vector-icons/AntDesign";
const { width, height } = Dimensions.get("window");
import CustomAlert from "../alert/alert";
import { ScrollView } from "react-native";
const Signup = ({ navigation }) => {
  const [showpassword, setshowpasword] = useState(false);

  const [showconfirmpassword, setshowconfirmpassword] = useState(false);

  const [customalert1, setcustomalert1] = useState(false);

  const [customalert2, setcustomalert2] = useState(false);

  const [customalert3, setcustomalert3] = useState(false);

  const [formdata, setformdata] = useState({
    email: "",
    password: "",
    cpassword: "",
  });

  const handleFormData = (field, value) => {
    setformdata({ ...formdata, [field]: value });
  };

  const handleShowPasswordHandler = () => {
    setshowpasword(!showpassword);
  };

  const handleShowConfirmPasswordHandler = () => {
    setshowconfirmpassword(!showconfirmpassword);
  };

  const handleSubmit = () => {
    const validemail = formdata.email.split("@")[1];

    if (
      formdata.email === "" ||
      formdata.password === "" ||
      formdata.cpassword === ""
    ) {
      setcustomalert1(true);
    }
    else if (validemail !== "gmail.com") {
      setcustomalert2(true);
    }
    else if (formdata.password !== formdata.cpassword) {
      console.log("fjdskla");
      setcustomalert3(true);
      // Alert.alert("Success", "Login Successful!")
      // navigation.navigate("TabScreen", { screen: "Profile"})
    }
    else {
      navigation.navigate("Profile");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.loginbox}>
          <ImageBackground
            style={styles.loginback}
            source={require("../../assets/login-back11.jpg")}
          >
            <View style={styles.overlay}>
              <Image
                style={styles.logo}
                source={require("../../assets/AppLogo2.png")}
              ></Image>
              <View style={styles.inputWrapper}>
                <Icon
                  name="email-outline"
                  size={24}
                  color="white"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.inputstyling}
                  placeholder="Enter your email"
                  onChangeText={(value) => handleFormData("email", value)}
                  placeholderTextColor="white"
                />
              </View>
              {/* password */}
              <View style={styles.inputWrappers}>
                <Icon
                  name="lock-outline"
                  size={24}
                  color="white"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.inputstyling}
                  placeholder="Enter your password"
                  onChangeText={(value) => handleFormData("password", value)}
                  placeholderTextColor="white"
                  secureTextEntry={showpassword ? false : true}
                />
                <TouchableOpacity onPress={handleShowPasswordHandler}>
                  {showpassword ? (
                    <Eye name="eye" size={24} color="white" />
                  ) : (
                    <Eye name="eye-with-line" size={24} color="white" />
                  )}
                </TouchableOpacity>
              </View>
              {/* confirmpassword */}
              <View style={styles.inputWrappers}>
                <Icon
                  name="lock-outline"
                  size={24}
                  color="white"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.inputstyling}
                  placeholder="Enter your password"
                  onChangeText={(value) => handleFormData("cpassword", value)}
                  placeholderTextColor="white"
                  secureTextEntry={showconfirmpassword ? false : true}
                />
                <TouchableOpacity onPress={handleShowConfirmPasswordHandler}>
                  {showconfirmpassword ? (
                    <Eye name="eye" size={24} color="white" />
                  ) : (
                    <Eye name="eye-with-line" size={24} color="white" />
                  )}
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.loginbtn} onPress={handleSubmit}>
                <Text style={{ fontSize: 22, fontWeight: "900" }}>Signup</Text>
              </TouchableOpacity>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: "white",
                    marginLeft: 30,
                  }}
                />
                <Text
                  style={{
                    marginHorizontal: 6,
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 15,
                  }}
                >
                  or continue with
                </Text>
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: "white",
                    marginRight: 30,
                  }}
                />
              </View>

              <View style={{ display: "flex", flexDirection: "row", gap: 60 }}>
                <TouchableOpacity>
                  <Google
                    name="google-plus-circle"
                    size={30}
                    color="white"
                  ></Google>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Facebook name="facebook" size={30} color="white"></Facebook>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Apple name="apple-o" size={30} color="white"></Apple>
                </TouchableOpacity>
              </View>

              <View style={styles.footer}>
                <Text style={styles.footerheading}>
                  Already an account ?{" "}
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Login");
                    }}
                  >
                    <Text style={styles.signup}>Login</Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <CustomAlert
          visible={customalert1}
          title={"All fields are required"}
          onConfirm={() => setcustomalert1(false)}
        />
        <CustomAlert
          visible={customalert2}
          title={"Please enter a valid email"}
          onConfirm={() => setcustomalert2(false)}
        />
        <CustomAlert
          visible={customalert3}
          title={"Password didn't match"}
          message={"Please enter a correct password"}
          onConfirm={() => setcustomalert3(false)}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 200,
    width: 200,
    zIndex: 50,
    resizeMode: "cover",
  },
  loginbox: {
    flex: 1,
  },
  loginback: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(44, 42, 42, 0)",
    justifyContent: "center",
    alignItems: "center",
    gap: 25,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: width - 40,
    borderRadius: 50,
    backgroundColor: "rgba(44, 42, 42, 0.3)",
    borderColor: "hsl(187, 100%, 50%)",
    borderWidth: 2,
    paddingHorizontal: 15,
    height: 50,
  },
  forgot: {
    position: "absolute",
    bottom: "-60%",
    color: "white",
    right: "3%",
    fontWeight: "900",
  },
  inputWrappers: {
    flexDirection: "row",
    alignItems: "center",
    width: width - 40,
    borderRadius: 50,
    backgroundColor: "rgba(44, 42, 42, 0.3)",
    borderColor: "hsl(187, 100%, 50%)",
    borderWidth: 2,
    paddingHorizontal: 15,
    height: 50,
    position: "relative",
  },
  loginbtn: {
    flexDirection: "row",
    alignItems: "center",
    width: width - 40,
    borderRadius: 50,
    backgroundColor: "hsl(187, 100%, 50%)",
    borderWidth: 2,
    paddingHorizontal: 15,
    height: 50,
    justifyContent: "center",
    shadowColor: "rgb(0, 229, 255)",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 150,
    elevation: 10,
  },

  icon: {
    marginRight: 10,
  },
  inputstyling: {
    flex: 1,
    color: "white",
    fontSize: 16,
  },
  footerheading: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    borderWidth: 1,
    // borderColor:'white'
  },
  signup: {
    color: "hsl(192, 100.00%, 50.00%)",
    fontSize: 15,
    fontWeight: "bold",
    // borderWidth:1,
    // borderColor:'white'
  },
  footer: {
    width: width,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});