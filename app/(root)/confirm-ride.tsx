import { View, Text, FlatList } from "react-native";
import React from "react";
import RideLayout from "@/components/rideLayout";
import { drivers } from "@/components/map";
import DriverCard from "@/components/driverCard";

const ConfirmRide = () => {
  return (
    <RideLayout title="Choose a Driver" snapPoints={["65%", "85%"]}>
      <FlatList
        data={drivers}
        renderItem={({ item }) => <DriverCard item={item} />}
      />
    </RideLayout>
  );
};

export default ConfirmRide;
