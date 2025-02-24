import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Animated } from "react-native";
import { Button } from "react-native-paper";
const { width, height } = Dimensions.get("screen");
import CheckMark from 'react-native-vector-icons/Ionicons'
import { useRef } from "react";
import CustomAlert from "../alert/alert";

const Languages = [
  {
    "name": "English",
    "uri": require("../../assets/english.jpg")
  },
  {
    "name": "Hindi",
    "uri": require("../../assets/english.jpg")
  },
  {
    "name": "Telugu",
    "uri": require("../../assets/english.jpg")
  },
  {
    "name": "Kannada",
    "uri": require("../../assets/english.jpg")
  },
  {
    "name": "Bangla",
    "uri": require("../../assets/english.jpg")
  },
  {
    "name": "Punjabi",
    "uri": require("../../assets/english.jpg")
  }

]



const Genre = ({ navigation }) => {

  const [selectedlanguage, setselectedlanguage] = useState([]);
  const [languagealert, setshowlanguagealert] = useState(false);
  const scales = useRef(Languages.map(() => new Animated.Value(1))).current;

  const languageHandler = (itemname, index) => {
    setselectedlanguage((prev) => {
      if (!prev.includes(itemname)) {
        return [...prev, itemname]
      }
      else {
        return prev.filter((item) => item !== itemname);
      }
    }
    )
  }

  const continueLanguageHandler = () => {
    console.log("this is selected language", selectedlanguage)
    if (selectedlanguage?.length === 0) {
      setshowlanguagealert(true)
    }
    else {
      navigation.navigate("TabScreen", { screen: "Home" })
    }
  }

  const handlePressIn = (index) => {
    Animated.spring(scales[index], {
      toValue: 1.5,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (index) => {
    Animated.spring(scales[index], {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomAlert
        visible={languagealert}
        title={"Please select atleast one language"}
        onConfirm={() => setshowlanguagealert(false)}
      />
      <View style={styles.genrebox}>
        <View>
          <Text style={styles.title}>Choose Languages</Text>
          <Text style={styles.subtitle}>
            Enjoy your music in your favourite language.
          </Text>
        </View>
        <FlatList
          data={Languages}
          numColumns={2}
          renderItem={(({ item, index }) => (
            <TouchableOpacity style={[styles.language, selectedlanguage.includes(item.name) && styles.selectedLanguage]} onPress={() => languageHandler(item.name, index)} onPressIn={() => handlePressIn(index)} onPressOut={() => handlePressOut(index)}>
              <View style={styles.overlay}></View>
              <Text style={{ position: 'absolute', left: '15%', zIndex: 10, top: '3%', fontSize: 18, fontWeight: 'bold', color: 'blue', zIndex: 10 }}>{item.name}</Text>
              <Animated.Image style={[styles.image, { transform: [{ scale: scales[index] }] }]} source={item.uri}></Animated.Image>
              <View style={styles.checkbox}>{selectedlanguage.includes(item.name) ? <CheckMark name="checkmark-circle" size={30} color='rgb(81, 0, 255)'></CheckMark> : <CheckMark name="checkmark-circle" size={30} color='white'></CheckMark>}</View>
            </TouchableOpacity>
          ))}
        />
        <Button mode="contained" style={styles.continuebtn} onPress={continueLanguageHandler} labelStyle={styles.buttonText} >Continue</Button>
      </View>
    </SafeAreaView>
  );
};
export default Genre;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: "rgba(0, 0, 0, 0.02)", 
    zIndex: 500
  },
  genrebox: {
    // borderWidth : 2,
    alignItems: 'center',
    gap: 30,
    width: width,
    padding: 10,
  },
  title: {
    height: 50,
    marginHorizontal: 'auto',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',

  },
  subtitle: {
    height: 40,
    marginHorizontal: 'auto',
    fontSize: 18,
    color: 'gray',
  },
  language: {
    height: 100,
    width: 150,
    // borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    margin: 10,
    display: 'flex',
    shadowColor: 'rgb(0, 0, 0)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  image: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(29, 4, 4, 0.4)',

    resizeMode: 'cover'
  },
  checkbox: {
    position: 'absolute',
    right: '3%',
    bottom: '6%',
    height: 30,
    width: 30,
    zIndex: 30
  },
  selectedLanguage: {
    borderColor: "rgb(81, 0, 255)",
    borderWidth: 2,
    elevation: 5,
  },
  continuebtn: {
    marginTop: 30,
    backgroundColor: 'rgb(255, 200, 0)',
    color: 'black',
    height: 44,
    fontSize: 18,
    borderRadius: 50,
    width: "80%"
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
});
