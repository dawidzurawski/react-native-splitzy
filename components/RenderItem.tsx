import {
  View,
  Text,
  useWindowDimensions,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { moneyData, OnboardingData } from "@/data/data";
import LottieView from "lottie-react-native";
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import Card from "./Card";
import CustomButton from "./CustomButton";

type Props = {
  item: OnboardingData;
  index: number;
  x: SharedValue<number>;
  eventData?: any;
};

const RenderItem = ({ item, index, x, eventData }: Props) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const [totalBalance, setTotalBalance] = useState(0);
  const [goalReached, setGoalReached] = useState(false);

  // State for keeping track of user contributions
  const [contributions, setContributions] = useState(moneyData); // Initialize with existing contributors

  const groupGoal = parseFloat(eventData?.savingsGoal || "0");

  const lottieAnimationStyle = useAnimatedStyle(() => {
    const tranlateYAnimation = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [200, 0, -200],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ translateY: tranlateYAnimation }],
    };
  });

  const circleAnimation = useAnimatedStyle(() => {
    const scale = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [1, 4, 4],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ scale: scale }],
    };
  });

  // Function to handle adding money
  const handleAddMoney = () => {
    if (goalReached) return;

    // Prompt the user to enter an amount
    Alert.prompt(
      "Add Money",
      `Enter the amount you'd like to add (Goal: £${groupGoal})`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Add",
          onPress: (amount) => {
            const money = parseFloat(amount);
            if (isNaN(money) || money <= 0) {
              Alert.alert("Invalid input", "Please enter a valid number.");
              return;
            }

            // Check if adding this amount exceeds the goal
            if (totalBalance + money > groupGoal) {
              Alert.alert(
                "Amount exceeds goal",
                `You can only add up to £${(groupGoal - totalBalance).toFixed(
                  2
                )} more.`
              );
            } else {
              const newBalance = totalBalance + money;
              setTotalBalance(newBalance);

              // Add Laurence's contribution to the contributions list
              const updatedContributions = [
                ...contributions,
                {
                  id: contributions.length + 1,
                  name: "Laurence",
                  moneyIn: `£${money}`,
                },
              ];
              setContributions(updatedContributions);

              // Check if goal is reached
              if (newBalance >= groupGoal) {
                setGoalReached(true);
                Alert.alert(
                  "Congratulations!",
                  "You've reached your savings goal!"
                );
              }
            }
          },
        },
      ],
      "plain-text"
    );
  };

  return (
    <View
      className="flex justify-center pt-12"
      style={{ width: SCREEN_WIDTH, backgroundColor: item.backgroundColor }}
    >
      <ScrollView>
        <View className="absolute inset-0 items-center">
          <Animated.View
            style={[
              {
                width: SCREEN_WIDTH,
                height: SCREEN_WIDTH,
                backgroundColor: item.backgroundColor,
                borderRadius: SCREEN_WIDTH / 2,
              },
              circleAnimation,
            ]}
          />
        </View>

        <Card>
          {/* Display the updated group size from eventData */}
          <Text
            className="text-right font-bold pt-2 mx-5 text-base"
            style={{ color: item.textColor }}
          >
            {eventData?.groupSize
              ? `${eventData.groupSize} People`
              : `${item.people} People`}
          </Text>

          <Animated.View
            style={lottieAnimationStyle}
            className="items-center pt-5"
          >
            <LottieView
              source={item.animation}
              style={{ width: SCREEN_WIDTH * 0.5, height: SCREEN_WIDTH * 0.5 }}
              autoPlay
              loop
            />
          </Animated.View>

          {/* Display the updated group event title */}
          <Text
            className="text-left font-bold pt-8 mx-5 text-lg"
            style={{ color: item.textColor }}
          >
            {eventData?.groupEvent || item.title}
          </Text>

          {/* Update description with goal and goal date */}
          <Text
            className="text-left font-light pt-2 mx-5 text-base"
            style={{ color: item.textColor }}
          >
            {eventData
              ? `Reach your goal of £${eventData.savingsGoal} by ${new Date(
                  eventData.goalDate
                ).toDateString()}.`
              : item.description}
          </Text>

          {/* Dynamically updated event balance */}
          <Text
            className="text-left font-bold pt-6 mx-5 text-xl"
            style={{ color: item.textColor }}
          >
            Total event balance:
          </Text>

          <Text
            className="text-left text-7xl font-thin mb-2.5 pt-4 mx-5"
            style={{ color: item.textColor }}
          >
            £{totalBalance.toFixed(2)}{" "}
            {/* Display the balance with 2 decimal places */}
          </Text>

          {/* Disable button if goal is reached */}
          <CustomButton
            title={goalReached ? "Goal Reached" : "Add money"}
            onPress={handleAddMoney}
            disabled={goalReached} // Disable button when goal is reached
          />
        </Card>

        <Card>
          {/* Render the updated list of contributors, including Laurence */}
          {contributions.map((contribution) => (
            <View
              key={contribution.id}
              className="flex-row justify-between mb-4"
            >
              <Text className="text-gray-600">{contribution.name}</Text>
              <Text className="text-gray-600">{contribution.moneyIn}</Text>
            </View>
          ))}
        </Card>
      </ScrollView>
    </View>
  );
};

export default RenderItem;
