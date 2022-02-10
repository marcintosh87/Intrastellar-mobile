import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AppHeader from "./sources/AppHeader";
import axios from "axios";
import Newsfeed from "./sources/Newsfeed";
import Constants from "expo-constants";

// const { manifest } = Constants;

// const uri = `http://${manifest.debuggerHost
//   .split(`:`)
//   .shift()
//   .concat(`:3000`)}`;

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [newsPost, setNewsPost] = useState([]);

  // loading and errors
  //   if (loading) {
  //     return (
  //       <Text style={{ marginTop: "50%", marginLeft: "50%" }}>Loading...</Text>
  //     );
  //   }

  if (error) {
    return <Text>There is an error</Text>;
  }

  const getNewsPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/news_posts`);
      //   console.log(response.data);
      setNewsPost(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (newsPost) {
    useEffect(() => {
      getNewsPosts();
    }, []);
  }

  return (
    <View style={styles.container}>
      <AppHeader />
      <Newsfeed newsPost={newsPost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  bottomNav: {
    display: "flex",
  },
});
