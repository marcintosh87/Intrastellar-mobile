import {
  Box,
  Button,
  Container,
  Heading,
  ScrollView,
  Text,
  ZStack,
} from "native-base";
import React from "react";
import { Image } from "react-native";

export default function Home() {
  return (
    <ScrollView style={{ backgroundColor: "#F8F8FC" }}>
      <Box height={"lg"} mt={5} alignItems={"center"}>
        <Heading size="xs" mb={4}>
          A MESSAGE FROM OUR CEO
        </Heading>
        <Image
          style={{ width: 400, height: 200, resizeMode: "contain" }}
          source={require("./../assets/ceo-message-placeholder.png")}
          alt="intra stellar logo"
        />

        <Text size="sm" p={3} height={210}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>

        <ZStack alignItems="center" mt={6} justifyContent="center" ml={-150}>
          <Box size="64" rounded="lg">
            <Image
              style={{ width: 400, height: 200, resizeMode: "cover" }}
              source={require("./../assets/newsfeed-hero.png")}
              alt="intra stellar logo"
            />
          </Box>
          <Box size="56" rounded="lg" shadow={8} alignItems="center">
            <Heading size="md" mb={0} color="amber.100" textAlign={"left"}>
              MISSION STATEMENT
            </Heading>
            <Text size="56" p={4}>
              We are an outstanding collective of caregivers representing
              various cultures, beliefs, backgrounds, and life experiences.
            </Text>
          </Box>
        </ZStack>
      </Box>
      <Button backgroundColor={"white"} mt={10}>
        <Text color={"#00539a"}> Learn More</Text>
      </Button>
    </ScrollView>
  );
}
