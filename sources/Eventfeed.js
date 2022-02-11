import React, { useEffect, useState } from "react";
import { ScrollView, View, Linking } from "react-native";
import { Headline, Text } from "react-native-paper";
import * as AddCalendarEvent from "react-native-add-calendar-event";

import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { Image } from "native-base";

export default function Newsfeed({ eventPost }) {
  const LeftContent = (props) => (
    <Avatar.Icon
      {...props}
      icon="calendar"
      style={{ backgroundColor: "#00539a" }}
    />
  );

  return (
    <ScrollView>
      {eventPost.map((each) => (
        <Card style={{ margin: 10 }} key={each.id}>
          <Card.Title
            title={each.title}
            subtitle={`${each.date_of_event} | ${each.time}`}
            left={LeftContent}
          />
          <Card.Content>
            <Title>{each.title}</Title>
            <Paragraph>{each.content}</Paragraph>
          </Card.Content>
          <Card.Cover
            source={{
              uri: `http://localhost:3000${each.image_post}`,
            }}
          />
          <Card.Actions>
            <Button color="#00539a">Read More</Button>
            <Button color="#00539a">Clap</Button>
            <Button
              onPress={() =>
                Linking.openURL(
                  `https://outlook.live.com/owa/?path=/calendar/view/Month&rru=addevent&startdt=${each.date_of_event}${each.time}&enddt=20200214T000000Z&subject=${each.title}+Event&location=${each.event_location}&body=${each.content}`
                )
              }
              color="#00539a"
            >
              Add to Calendar
            </Button>
          </Card.Actions>
        </Card>
      ))}
    </ScrollView>
  );
}
