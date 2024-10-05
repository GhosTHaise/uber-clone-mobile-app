import { View, Text, FlatList } from "react-native";
import React from "react";
import RideLayout from "@/components/rideLayout";
import { drivers } from "@/components/map";
import DriverCard from "@/components/driverCard";
import CustomButton from "@/components/customButton";
import { router } from "expo-router";

const ConfirmRide = () => {
  return (
    <RideLayout title="Choose a Driver" snapPoints={["65%", "85%"]}>
      <FlatList
        data={drivers}
        renderItem={({ item }) => <DriverCard item={item} />}
        ListFooterComponent={() => (
          <View className="mx-5 mt-10">
            <CustomButton
              title="Select Ride"
              onPress={() => router.push("/(root)/book-ride")}
            />
          </View>
        )}
      />
    </RideLayout>
  );
};

export default ConfirmRide;
