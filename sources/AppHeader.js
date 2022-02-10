import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Appbar, Avatar, Menu, Button, Divider } from "react-native-paper";

const AppHeader = () => {
  const [visible, setVisible] = useState(false);
  const _goBack = () => console.log("Went back");

  const _handleSearch = () => console.log("Searching");

  const _handleMore = () => console.log("Shown more");

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={_goBack} />
      <Appbar.Content title="Intra-Stellar" subtitle="Employee Portal" />
      <Appbar.Action icon="magnify" onPress={_handleSearch} />

      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}
        style={{ marginTop: 45, marginLeft: 20 }}
      >
        <Menu.Item onPress={() => {}} title="Newsfeed" />
        <Menu.Item onPress={() => {}} title="Upcoming Events" />
        <Divider />
        <Menu.Item onPress={() => {}} title="User Dashboard" />
      </Menu>

      <Avatar.Image size={24} source={require("./../assets/blue-clap.png")} />
    </Appbar.Header>
  );
};

export default AppHeader;
