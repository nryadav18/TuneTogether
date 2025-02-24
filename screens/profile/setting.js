import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
const { width, height } = Dimensions.get("screen");
import Male from "react-native-vector-icons/MaterialCommunityIcons";
import User from "react-native-vector-icons/FontAwesome5";
import Edit from "react-native-vector-icons/FontAwesome";
import Done from "react-native-vector-icons/MaterialIcons";
import { IconButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
const Setting = () => {
  const [editname, seteditname] = useState(false);
  const [edituserid, setedituserid] = useState(false);
  const [username, setusername] = useState("Vivek Kumar");
  const [selectedimage, setselectedimage] = useState(null);

  const [userid, setuserid] = useState("vivek7633a");

  const ImagePickerHandler = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setselectedimage(result.assets[0].uri);
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.image}>
          <Image
            style={styles.blurredimg}
            source={selectedimage ? { uri: selectedimage } : require("../../assets/22MH1A05F3.png")}
            blurRadius={10}
          ></Image>


          <View style={styles.clearimg}>
            <Image
              style={styles.originalimg}
              source={selectedimage ? { uri: selectedimage } : require("../../assets/22MH1A05F3.png")}
            ></Image>

            <TouchableOpacity style={styles.imagepicker} onPress={ImagePickerHandler}>
              <Edit name="edit" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: width - 10,
            justifyContent: "space-evenly",
            gap: 130,
            display: "flex",
            flexDirection: "row",
            marginTop: 10,
            marginHorizontal: "auto",
          }}
        >
          <View style={styles.friendcount}>
            <Text
              style={{ textAlign: "center", fontSize: 12, fontWeight: "800" }}
            >
              Friend Count:
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>20</Text>
          </View>
          <View style={styles.friendcount}>
            <Text
              style={{ textAlign: "center", fontSize: 12, fontWeight: "800" }}
            >
              Gender:
            </Text>
            <Text>
              <Male size={27} name="gender-male"></Male>
            </Text>
          </View>
        </View>
        <Text style={styles.label1}>Name:</Text>
        <View style={styles.userinfo}>
          <TextInput
            style={[
              styles.textInput,
              { color: editname ? "black" : "rgb(93, 93, 93)" },
            ]}
            editable={editname}
            onChangeText={(text) => setusername(text)}
          >
            {username}
          </TextInput>
          <TouchableOpacity
            onPress={() => seteditname(!editname)}
            style={styles.editIcon}
          >
            {editname ? (
              <Edit name="edit" size={24} />
            ) : (
              <Done name="done" size={22} />
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.label2}>Userid:</Text>
        <View style={styles.userid}>
          <TextInput
            style={[
              styles.textInput,
              { color: edituserid ? "black" : "rgb(93, 93, 93)" },
            ]}
            editable={edituserid}
            onChangeText={(text) => setuserid(text)}
          >
            {userid}
          </TextInput>
          <TouchableOpacity
            onPress={() => setedituserid(!edituserid)}
            style={styles.editIcon}
          >
            {edituserid ? (
              <Edit name="edit" size={24} />
            ) : (
              <Done name="done" size={22} />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logout}>
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>LOGOUT</Text>
          </View>
          <View>
            <IconButton icon="logout" size={26}></IconButton>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  image: {
    width: width,
    height: 250,
    position: "relative",
  },
  blurredimg: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  clearimg: {
    position: "absolute",
    left: "50%",
    bottom: "-20%",
    zIndex: 10,
    transform: [{ translateX: "-50%" }],
    height: 120,
    width: 120,
    // borderWidth:1,
    borderRadius: 100,
    elevation: 100,

    // overflow:'hidden',
  },
  originalimg: {
    height: "100%",
    width: "100%",
    borderRadius: 100,
    resizeMode: "cover",
    elevation: 14,
  },
  friendcount: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "rgb(187, 217, 214)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  userinfo: {
    width: width - 30,
    borderWidth: 2,
    alignSelf: "center",
    display: "flex",
    padding: 2,
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 10,
    borderColor: "gray",
  },
  userid: {
    width: width - 30,
    borderWidth: 2,
    alignSelf: "center",
    display: "flex",
    padding: 2,
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 10,
    borderColor: "gray",
  },
  label1: {
    marginTop: 20,
    width: width - 45,
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  label2: {
    marginTop: 20,
    width: width - 45,
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  logout: {
    width: width - 40,
    backgroundColor: "rgb(193, 222, 211)",
    borderRadius: 15,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    // position:'absolute',
    marginTop: 40,
    justifyContent: "center",
    // bottom:'5%'
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
  },

  editIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -11 }],
  },
  imagepicker: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "black",
    borderRadius: 20,
    padding: 5,
  },
});
