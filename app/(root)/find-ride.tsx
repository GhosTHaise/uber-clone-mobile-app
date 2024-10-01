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
    <View>
      <RideLayout>
        <Text className="text-2xl">Find Ride</Text>
      </RideLayout>
    </View>
  );
};

export default FindRide;
