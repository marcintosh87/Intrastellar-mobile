import {
  ScrollView,
  Text,
  Box,
  Menu,
  HamburgerIcon,
  Pressable,
  View,
} from "native-base";
import React from "react";
import { useState } from "react";
import EmpDir from "./EmpDir";
import UserProfile from "./UserProfile";

export default function UserAccount({
  handleLogout,
  currentUser,
  refresh,
  setRefresh,
}) {
  const [nav, setNav] = useState("UserProfile");
  return (
    <>
      <View flex={100}>
        <Box
          h="8%"
          w="100%"
          alignItems="flex-start"
          backgroundColor={"#00539a"}
        >
          <Menu
            w="190"
            trigger={(triggerProps) => {
              return (
                <Pressable
                  accessibilityLabel="More options menu"
                  {...triggerProps}
                >
                  <HamburgerIcon
                    style={{ color: "white", marginTop: 12, marginLeft: 15 }}
                  />
                </Pressable>
              );
            }}
          >
            <Menu.Item
              onPress={() => {
                setNav("UserProfile");
              }}
            >
              User Profile
            </Menu.Item>
            <Menu.Item
              onPress={() => {
                setNav("EmpDirectory");
              }}
            >
              Employee Directory
            </Menu.Item>

            <Menu.Item
              onPress={() => {
                handleLogout();
              }}
            >
              Log Out
            </Menu.Item>
          </Menu>
        </Box>
        {nav === "UserProfile" ? (
          <UserProfile
            currentUser={currentUser}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        ) : null}
        {nav === "EmpDirectory" ? <EmpDir /> : null}
      </View>
    </>
  );
}
