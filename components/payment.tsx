import { Alert, Image, Text, View } from "react-native";
import React, { useState } from "react";
import CustomButton from "./customButton";
import { useStripe } from "@stripe/stripe-react-native";
import { fetchAPI } from "@/lib/fetch";
import { PaymentProps } from "@/types/type";
import { useLocationStore } from "@/store";
import { useAuth } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";
import { images } from "@/constants";
import { useRouter } from "expo-router";

const Payment = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime,
}: PaymentProps) => {
  const { userId } = useAuth();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    userLatitude,
    userLongitude,
    userAddress,
    destinationLatitude,
    destinationLongitude,
    destinationAddress,
  } = useLocationStore();

  const openPaymentSheet = async () => {
    await initializePaymentSheet();
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(
        `Error code : ${error.code}`,
        `Error message : ${error.message}`,
      );
    } else {
      // Payment completed - show a confirmation screen.
      setIsSuccess(true);
    }
  };

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Ryde, Inc.",
      intentConfiguration: {
        mode: {
          amount: parseInt(amount) * 100,
          currencyCode: "USD",
        },
        confirmHandler: async (paymentMethod, _, intentCreationCallback) => {
          // Make a request to your own server.
          const { paymentIntent, customer } = await fetchAPI(
            "/api/stripe/create",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: fullName || email.split("@")[0],
                email,
                amount,
                paymentMethodId: paymentMethod.id,
              }),
            },
          );

          if (paymentIntent.client_secret) {
            const { result } = await fetchAPI("/api/stripe/pay", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                payment_method_id: paymentMethod.id,
                payment_intent_id: paymentIntent.id,
                customer_id: customer,
              }),
            });

            if (result.client_secret) {
              await fetchAPI("/(api)/ride/create", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  origin_address: userAddress,
                  destination_address: destinationAddress,
                  origin_latitude: userLatitude,
                  origin_longitude: userLongitude,
                  destination_latitude: destinationLatitude,
                  destination_longitude: destinationLongitude,
                  ride_time: rideTime.toFixed(0),
                  fare_price: parseInt(amount) * 100,
                  payment_status: "paid",
                  driver_id: driverId,
                  user_id: userId,
                }),
              });
            }

            // Call the `intentCreationCallback` with your server response's client secret or error
            const { client_secret, error } = result.client_secret;
            console.log("🚀 ~ confirmHandler: ~ client_secret:", client_secret);

            if (client_secret) {
              intentCreationCallback({ clientSecret: client_secret });
            } else {
              intentCreationCallback({ error });
            }
          }
        },
      },
      returnURL: 'myapp"//book-ride',
    });
    if (error) {
      console.log("🚀 ~ initializePaymentSheet ~ error:", error);
      console.log({ error });
    }
  };

  return (
    <>
      <CustomButton
        title="Confirm Ride"
        className="my-10"
        onPress={openPaymentSheet}
      />
      <ReactNativeModal
        isVisible={isSuccess}
        onBackdropPress={() => setIsSuccess(false)}
      >
        <View className="flex flex-col items-center justify-center bg-wjite roudned-2xl">
          <Image source={images.check} className="w-28 h-28 mt-5" />
          <Text className="text-2xl text-center font-JakartaBold mt-5">
            Ride booked!
          </Text>
          <Text className="text-md text-general-200 font-JakartaMedium text-center mt-3">
            Thank you for your booking. Your reservation has been placed. Please
            procees with your trip!
          </Text>
          <CustomButton
            title="Back Home"
            onPress={() => {
              setIsSuccess(false);
              router.push("/(root)/(tabs)/home");
            }}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
    </>
  );
};
export default Payment;
