import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Headline, Text } from "react-native-paper";

import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

export default function Newsfeed({ newsPost, setNav, setArticle }) {
  // const [showContent, setShowContent] = useState(false);
  const LeftContent = (props) => (
    <Avatar.Icon
      {...props}
      icon="newspaper-variant"
      style={{ backgroundColor: "#00539a" }}
    />
  );

  return (
    <ScrollView>
      {newsPost.map((each) => (
        <Card style={{ margin: 10 }} key={each.id}>
          <Card.Title
            title={each.title}
            subtitle={each.date}
            left={LeftContent}
          />
          <Card.Content>
            <Title>{each.title}</Title>
          </Card.Content>
          <Card.Cover
            source={{
              uri: `http://localhost:3000${each.image_post}`,
            }}
          />

          {/* <Card.Content>
            <Paragraph>{each.content}</Paragraph>
          </Card.Content> */}

          <Card.Actions>
            <Button
              color="#00539a"
              onPress={() => {
                setArticle(each.id);
                setNav("newsArticle");
                // showContent ? setShowContent(false) : setShowContent(true);
              }}
            >
              Read More
            </Button>
            <Button color="#00539a" icon="heart-plus">
              {each.claps}
            </Button>
          </Card.Actions>
        </Card>
      ))}
    </ScrollView>
  );
}
