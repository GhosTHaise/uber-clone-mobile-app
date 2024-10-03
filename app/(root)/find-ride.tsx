import { View, Text } from "react-native";
import { useLocationStore } from "@/store";
import RideLayout from "@/components/rideLayout";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setUserLocation,
    setDestinationLocation,
  } = useLocationStore();

  return (
    <RideLayout title="Ride">
      <Text className="text-2xl">Find Ride</Text>
      <Text className="text-2xl">Find Ride</Text>
      <Text className="text-2xl">Find Ride</Text>
      <Text className="text-2xl">Find Ride</Text>
    </RideLayout>
  );
};

export default FindRide;
