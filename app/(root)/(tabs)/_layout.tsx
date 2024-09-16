import { icons } from "@/constants";
import { Tabs } from "expo-router";
import React from "react";
import { Image, View } from "react-native";

const TabIcon = ({ focused, source }: { focused: boolean; source: any }) => (
  <View>
    <View>
      <Image />
    </View>
  </View>
);

const Layout = () => (
  <Tabs
    initialRouteName="index"
    screenOptions={{
      tabBarActiveTintColor: "#fff",
    }}
  >
    <Tabs.Screen
      name="home"
      options={{
        title: "Home",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={icons.home} />
        ),
      }}
    />
    <Tabs.Screen
      name="rides"
      options={{
        title: "Rides",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={icons.list} />
        ),
      }}
    />
    <Tabs.Screen
      name="chat"
      options={{
        title: "Chat",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={icons.chat} />
        ),
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{
        title: "Profile",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={icons.profile} />
        ),
      }}
    />
  </Tabs>
);

export default Layout;
