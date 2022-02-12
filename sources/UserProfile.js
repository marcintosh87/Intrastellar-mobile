import { ScrollView } from "native-base";
import React from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

export default function UserProfile({ currentUser }) {
  const LeftContent = (props) =>
    currentUser && (
      <Avatar.Image
        size={42}
        source={{
          uri: `http://localhost:3000${currentUser.profile_image}`,
        }}
      />
    );
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
              <Button color="#00539a">Edit</Button>
            </Card.Actions>
          </Card>
        )}
      </ScrollView>
    </>
  );
}
