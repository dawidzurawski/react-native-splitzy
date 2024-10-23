import React, { ReactNode } from "react";
import { View } from "react-native";

// Define the props interface
interface CardProps {
  children: ReactNode; // children is of type ReactNode
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <View className="bg-white rounded-xl shadow-lg p-4 m-4">
      <View className="mt-4">{children}</View>
    </View>
  );
};

export default Card;
