import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "./customButton";
import { PaymentSheetError, useStripe } from "@stripe/stripe-react-native";
import { fetchAPI } from "@/lib/fetch";
import { PaymentProps } from "@/types/type";
import { useLocationStore } from "@/store";
import { useAuth } from "@clerk/clerk-expo";

const Payment = ({
  fullName,
  email,
  amount,
  driverId,
  rideTime,
}: PaymentProps) => {
  const { userId } = useAuth();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    userLatitude,
    userLongitude,
    userAddress,
    destinationLatitude,
    destinationLongitude,
    destinationAddress,
  } = useLocationStore();

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      intentConfiguration: {
        mode: {
          amount: parseInt(amount) * 100,
          currencyCode: "USD",
        },
        confirmHandler: confirmHandler,
      },
      returnURL: 'myapp"//book-ride',
    });
    if (error) {
      console.log({ error });
    }
  };

  const confirmHandler = async (
    paymentMethod: any,
    _: any,
    intentCreationCallback: any,
  ) => {
    // Make a request to your own server.
    const { paymentIntent, customer } = await fetchAPI("/api/stripe/create", {
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
    });

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

      if (client_secret) {
        intentCreationCallback({ clientSecret: client_secret });
      } else {
        intentCreationCallback({ error });
      }
    }

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

    return (
      <>
        <CustomButton
          title="Confirm Ride"
          className="my-10"
          onPress={openPaymentSheet}
        />
      </>
    );
  };
};
export default Payment;
