import {
  Box,
  Center,
  Container,
  Heading,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  HStack,
  VStack,
  Spacer,
  Avatar,
} from "native-base";

import { Button, Card, Title, Paragraph, TextInput } from "react-native-paper";
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import CommentCard from "./CommentCard";

export default function NewsArticle({ article, currentUser }) {
  const [newsPost, setNewsPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [comments, setShowComments] = useState(false);
  const [refresh, setRefresh] = useState(0);
  //   get users

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

  //   get article
  const getNewsPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/news_posts/${article}`
      );
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
    }, [refresh]);
  }

  //   post a comment
  const postComment = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/news_comments`, {
        comment: text,
        user_id: currentUser.id,
        news_post_id: article,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setText("");
      setRefresh(refresh + 1);
      setShowComments(false);
    }
  };

  //   console.log(
  //     !loading ? newsPost.news_comments.map((each) => each.comment) : null
  //   );

  const commentData = !loading
    ? newsPost.news_comments.map((each) => each.comment)
    : null;

  return (
    <>
      <View flex={20}>
        {newsPost && (
          <Card>
            <Card.Title title={newsPost.title} subtitle={`${newsPost.date}`} />

            <Card.Cover
              source={{
                uri: `http://localhost:3000${newsPost.image_post}`,
              }}
            />
            <Card.Content>
              <Paragraph>{newsPost.content}</Paragraph>
            </Card.Content>

            <Card.Actions>
              <Button
                color="#00539a"
                onPress={() => {
                  comments === true
                    ? setShowComments(false)
                    : setShowComments(true);
                }}
              >
                {comments ? "Close" : "Leave a comment"}
              </Button>
              <Button color="#00539a" icon="heart-plus">
                {newsPost.claps}
              </Button>
            </Card.Actions>
            {comments ? (
              <>
                <TextInput
                  label="Comment"
                  value={text}
                  mode="flat"
                  activeUnderlineColor="#00539a"
                  onChangeText={(text) => setText(text)}
                />
                <Button
                  icon="comment"
                  mode="text"
                  color="#00539a"
                  onPress={() => postComment()}
                >
                  Post Comment
                </Button>
              </>
            ) : null}
          </Card>
        )}
        {commentData === null ? null : (
          <FlatList
            data={newsPost.news_comments}
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
                      {item.comment}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {item.recentText}
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
                    {item.timeStamp}
                  </Text>
                </HStack>
              </Box>
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </>
  );
}
