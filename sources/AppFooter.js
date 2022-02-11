import React, { useState } from "react";
import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  HStack,
  Center,
  Pressable,
} from "native-base";
import logo from "./../assets/dummy-logo-blue.png";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Newsfeed from "./Newsfeed";
import Eventfeed from "./Eventfeed";
import { View, StyleSheet, Image } from "react-native";

export default function AppFooter({ newsPost, eventPost }) {
  const [feed, setFeed] = useState(newsPost);
  const [selected, setSelected] = React.useState(1);
  return (
    <Box flex={1} bg="white" safeAreaTop width="100%" alignSelf="center">
      <Center flex={1}></Center>
      <Box alignItems={"center"}>
        <Image
          style={{ width: 180, resizeMode: "contain" }}
          source={require("./../assets/dummy-logo-blue.png")}
          alt="intra stellar logo"
        />
        {/* <Heading mb={2}>Intrastellar</Heading> */}
      </Box>
      {feed === newsPost ? <Newsfeed newsPost={newsPost} /> : null}

      {feed === eventPost ? <Eventfeed eventPost={eventPost} /> : null}
      <HStack bg="#00539a" alignItems="center" safeAreaBottom shadow={6}>
        <Pressable
          opacity={selected === 0 ? 1 : 0.5}
          py="3"
          flex={1}
          onPress={() => setSelected(0)}
        >
          <Center>
            <Icon
              mb="1"
              as={
                <MaterialCommunityIcons
                  name={selected === 0 ? "home" : "home-outline"}
                />
              }
              color="white"
              size="sm"
            />
            <Text color="white" fontSize="12">
              Home
            </Text>
          </Center>
        </Pressable>
        <Pressable
          opacity={selected === 1 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => {
            setSelected(1);
            setFeed(newsPost);
          }}
        >
          <Center>
            <Icon
              mb="1"
              as={<MaterialCommunityIcons name="newspaper" />}
              color="white"
              size="sm"
            />
            <Text color="white" fontSize="12">
              News Feed
            </Text>
          </Center>
        </Pressable>
        <Pressable
          opacity={selected === 2 ? 1 : 0.6}
          py="2"
          flex={1}
          onPress={() => {
            setSelected(2);
            setFeed(eventPost);
          }}
        >
          <Center>
            <Icon
              mb="1"
              as={
                <MaterialCommunityIcons
                  name={selected === 2 ? "calendar" : "calendar-outline"}
                />
              }
              color="white"
              size="sm"
            />
            <Text color="white" fontSize="12">
              Events
            </Text>
          </Center>
        </Pressable>
        <Pressable
          opacity={selected === 3 ? 1 : 0.5}
          py="2"
          flex={1}
          onPress={() => setSelected(3)}
        >
          <Center>
            <Icon
              mb="1"
              as={
                <MaterialCommunityIcons
                  name={selected === 3 ? "account" : "account-outline"}
                />
              }
              color="white"
              size="sm"
            />
            <Text color="white" fontSize="12">
              Account
            </Text>
          </Center>
        </Pressable>
      </HStack>
    </Box>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
