import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "./customButton";
import { PaymentSheetError, useStripe } from "@stripe/stripe-react-native";

const Payment = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [isSuccess, setIsSuccess] = useState(false);

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      intentConfiguration: {
        mode: {
          amount: 1099,
          currencyCode: "USD",
        },
        confirmHandler: confirmHandler,
      },
    });
    if (error) {
      // handle error
    }
  };

  const confirmHandler = async (
    paymentMethod,
    shouldSavePaymentMethod,
    intentCreationCallback,
  ) => {
    // Make a request to your own server.
    const response = await fetch(`/api/create-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // Call the `intentCreationCallback` with your server response's client secret or error
    const { client_secret, error } = await response.json();
    if (client_secret) {
      intentCreationCallback({ clientSecret: client_secret });
    } else {
      intentCreationCallback({ error });
    }
  };

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

export default Payment;
