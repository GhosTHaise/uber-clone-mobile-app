import { ButtonProps } from "@/types/type";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const getBgVariantStyle = (bgVariant: ButtonProps["bgVariant"]) => {
  switch (bgVariant) {
    case "secondary":
      return "bg-gray-500";
    case "danger":
      return "bg-sred-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
    default:
      return "bg-[#0286ff]";
  }
};

const getTextVariantStyle = (bgVariant: ButtonProps["textVariant"]) => {
  switch (bgVariant) {
    case "primary":
      return "text-black";
    case "danger":
      return "text-red-100";
    case "secondary":
      return "text-gray-100";
    case "success":
      return "text-green-100";
    default:
      return "text-white";
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  ...props
}: ButtonProps) => (
  <TouchableOpacity
    className={`w-full p-3 mb-4 rounded-full flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 ${getBgVariantStyle(bgVariant)} ${className}`}
    onPress={onPress}
    {...props}
  >
    {IconLeft && <IconLeft />}
    <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}>
      {title}
    </Text>
    {IconRight && <IconRight />}
  </TouchableOpacity>
);

export default CustomButton;
