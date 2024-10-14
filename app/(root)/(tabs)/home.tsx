import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/clerk-expo";
import RideCard from "@/components/rideCard";
import { icons, images } from "@/constants";
import GoogleTextInput from "@/components/googleTextInput";
import Map from "@/components/map";
import { useLocationStore } from "@/store";
import { router } from "expo-router";
import { useFetch } from "@/lib/fetch";

const Home = () => {
  const { setUserLocation, setDestinationLocation, userAddress } =
    useLocationStore();
  const { user } = useUser();
  const { data: recentRides, loading } = useFetch(`/(api)/ride/${user?.id}`);

  const [hasPermission, setHasPermission] = useState(false);

  const handleSignout = () => {};
  const handleDestinationPress = ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation({
      latitude,
      longitude,
      address,
    });
    router.push("/(root)/find-ride");
  };

  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setHasPermission(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude!,
        longitude: location.coords.longitude!,
      });

      setUserLocation({
        latitude: location.coords.latitude!,
        longitude: location.coords.longitude!,
        address: `${address[0].name}, ${address[0].region}`,
      });
    };
    requestLocation();
  }, []);
  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={recentRides}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyExtractor={(item, index) => index.toString()}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={() => (
          <View className="flex h-screen pb-[100px] flex-col items-center justify-center">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  alt="no recent rides found"
                  resizeMode="contain"
                />
                <Text className="text-sm">No recent rides found</Text>
              </>
            ) : (
              <ActivityIndicator size="large" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex flex-row items-center justify-between my-5">
              <Text className="text-xl capitalize font-JakartaExtraBold">
                Welcome{" "}
                {user?.firstName ||
                  user?.emailAddresses[0].emailAddress.split(/@/)[0]}{" "}
                👋
              </Text>
              <TouchableOpacity
                onPress={handleSignout}
                className="justify-center items-center w-10 h-10 rounded-full bg-white"
              >
                <Image source={icons.out} className="w-4 h-4" />
              </TouchableOpacity>
            </View>

            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300"
              handlePress={handleDestinationPress}
            />

            <>
              <Text className="text-xl font-JakartaBold mt-4 mb-3">
                Your Current Location
              </Text>
              <View className="flex flex-row items-center bg-transparent h-[300px]">
                <Map />
              </View>
            </>

            <Text className="text-xl font-JakartaBold mt-4 mb-3">
              Recent Rides
            </Text>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
