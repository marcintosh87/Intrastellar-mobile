import React, { useEffect, useState } from "react";
import {
  Box,
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
  Center,
  NativeBaseProvider,
  Button,
} from "native-base";
import axios from "axios";
import { Linking } from "react-native";

const Example = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users`);
      //   console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (users) {
    useEffect(() => {
      getUsers();
    }, []);
  }

  return (
    <Box>
      <Heading fontSize="xl" p="4" pb="3">
        Employee Directory
      </Heading>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "gray.600",
            }}
            borderColor="coolGray.200"
            pl="4"
            pr="5"
            py="2"
          >
            <HStack space={3} justifyContent="space-between">
              <Avatar
                size="48px"
                source={{
                  uri: `http://localhost:3000${item.profile_image}`,
                }}
              />
              <VStack>
                <Text
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  bold
                >
                  {item.first_name} {item.last_name}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  {item.email}
                </Text>
              </VStack>
              <Spacer />
              <Text
                fontSize="xs"
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                alignSelf="flex-start"
              >
                <Button
                  backgroundColor={"#00539a"}
                  onPress={() => Linking.openURL(`mailto:${item.email}`)}
                >
                  Email
                </Button>
              </Text>
            </HStack>
          </Box>
        )}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
};

export default () => {
  return <Example />;
};
