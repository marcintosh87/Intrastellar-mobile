import { Input, ScrollView, Text } from "native-base";
import React, { useState } from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import axios from "axios";

export default function UserProfile({ currentUser, setRefresh, refresh }) {
  const [showForm, setForm] = useState(false);
  const [userData, setUserData] = useState({
    first_name: currentUser.first_name,
    last_name: currentUser.last_name,
    email: currentUser.email,
    phone: currentUser.phone,
  });
  const LeftContent = (props) =>
    currentUser && (
      <Avatar.Image
        size={42}
        source={{
          uri: `http://localhost:3000${currentUser.profile_image}`,
        }}
      />
    );

  const updateProfile = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/users/${currentUser.id}`,

        userData
      );
    } catch (error) {
      console.log(error);
    } finally {
      setRefresh(refresh + 1);
      setForm(false);
    }
  };

  return (
    <>
      <ScrollView backgroundColor={"#F7F9FC"}>
        {currentUser && (
          <Card style={{ padding: 10 }}>
            <Card.Title
              title={`${currentUser.first_name} ${currentUser.last_name} ${
                currentUser.administrator ? "(Admin)" : null
              }`}
              subtitle={currentUser.position}
              left={LeftContent}
            />
            <Card.Content>
              <Paragraph>{`Email: ${currentUser.email}`}</Paragraph>
              <Paragraph>{`Phone: ${currentUser.phone}`}</Paragraph>
              <Paragraph>{`Department: ${currentUser.division.name}`}</Paragraph>
            </Card.Content>

            <Card.Actions>
              <Button color="#00539a" onPress={() => setForm(true)}>
                Edit
              </Button>
            </Card.Actions>
          </Card>
        )}
        {showForm && (
          <Card style={{ padding: 10 }}>
            <Card.Title title="User Profile" />
            <Card.Content>
              <Text>First Name</Text>
              <Input
                size="sm"
                placeholder="First Name"
                // isDisabled
                defaultValue={currentUser.first_name}
                onChangeText={(name) =>
                  setUserData({ ...userData, first_name: name })
                }
              />
              <Text>Last Name</Text>
              <Input
                size="sm"
                placeholder="Last Name"
                // isDisabled
                defaultValue={currentUser.last_name}
                onChangeText={(name) => setUserData({ last_name: name })}
              />
              <Text>Email</Text>
              <Input
                size="sm"
                placeholder="Email"
                // isDisabled
                defaultValue={currentUser.email}
                onChangeText={(address) => setUserData({ email: address })}
              />
              <Text>Phone</Text>
              <Input
                size="sm"
                placeholder="Phone"
                // isDisabled
                defaultValue={currentUser.phone}
                onChangeText={(number) => setUserData({ phone: number })}
              />
            </Card.Content>

            <Card.Actions>
              <Button color="#00539a" onPress={updateProfile}>
                Save
              </Button>
              <Button color="red" onPress={() => setForm(false)}>
                Cancel
              </Button>
            </Card.Actions>
          </Card>
        )}
      </ScrollView>
    </>
  );
}
