import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import { NativeBaseProvider } from "native-base";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import Main from "./Main.js";
import e from "cors";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#00539a",
    accent: "#fff",
  },
};

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const [errors, setErrors] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    fetch("http://localhost:3000/me").then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setCurrentUser(user);

          console.log(user);
        });
      }
    });
  }, []);
  // console.log(formData);
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:3000/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setCurrentUser(user);

          // setAuthenticated(true)
        });
      } else {
        res.json().then((errors) => {
          console.error(errors);
          setErrors("Use the correct password/email to login");
        });
      }
    });
    // setFormData({
    //   email: "",
    //   password: "",
    // });
  };

  // function handleChange(e) {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // }
  // logou
  const handleLogout = () => {
    fetch("http://localhost:3000/logout", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
      },
    });
    setCurrentUser(null);
  };

  console.log(formData);
  return (
    <NativeBaseProvider>
      {/* login form */}

      {!currentUser ? (
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require("./assets/dummy-logo-blue.png")}
          />

          <StatusBar style="auto" />
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email."
              placeholderTextColor="#003f5c"
              onChangeText={(emailData) => {
                setFormData({
                  ...formData,
                  email: emailData.toLocaleLowerCase(),
                });
              }}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder={"Password."}
              placeholderTextColor="#003f5c"
              secureTextEntry={true}
              onChangeText={(emailData) => {
                setFormData({
                  ...formData,
                  password: emailData,
                });
              }}
            />
          </View>

          <TouchableOpacity>
            <Text style={styles.forgot_button}>Forgot Password?</Text>
          </TouchableOpacity>

          {currentUser === null ? (
            <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
              <Text style={styles.loginText}>
                <Text style={{ color: "white" }}>Log in</Text>
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      ) : (
        <Main currentUser={currentUser} handleLogout={handleLogout} />
      )}
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "#F0F0F0",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,

    backgroundColor: "#00539a",
  },
});
