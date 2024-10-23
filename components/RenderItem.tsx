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
import * as Progress from "react-native-progress";

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
  const [contributions, setContributions] = useState(moneyData);

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

  const handleAddMoney = () => {
    if (goalReached) return;

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

              const updatedContributions = [
                ...contributions,
                {
                  id: contributions.length + 1,
                  name: "Laurence",
                  moneyIn: `£${money}`,
                },
              ];
              setContributions(updatedContributions);

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
      className="flex justify-center"
      style={{
        width: SCREEN_WIDTH,
        backgroundColor: "#44bca3",
        paddingVertical: 10,
        paddingHorizontal: 20,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 10,
          paddingHorizontal: 15,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: SCREEN_WIDTH - 30,
            backgroundColor: "#FFFFFF",
            borderRadius: 20,
            padding: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.15,
            shadowRadius: 20,
            elevation: 10,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              textAlign: "right",
              fontWeight: "600",
              color: "#1F2937",
              fontSize: 14,
              marginBottom: 10,
            }}
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
              style={{ width: SCREEN_WIDTH * 0.4, height: SCREEN_WIDTH * 0.4 }}
              autoPlay
              loop
            />
          </Animated.View>

          <Text
            style={{
              color: "#111827",
              fontWeight: "700",
              fontSize: 22,
              textAlign: "left",
              marginVertical: 10,
            }}
          >
            {eventData?.groupEvent || item.title}
          </Text>

          <Text
            style={{
              color: "#4B5563",
              fontWeight: "400",
              fontSize: 14,
              textAlign: "left",
            }}
          >
            {eventData
              ? `Reach your goal of £${eventData.savingsGoal} by ${new Date(
                  eventData.goalDate
                ).toDateString()}.`
              : item.description}
          </Text>

          <Text
            style={{
              color: "#1F2937",
              fontWeight: "600",
              fontSize: 16,
              textAlign: "left",
              marginTop: 20,
            }}
          >
            Total event balance:
          </Text>

          <Text
            style={{
              color: "#111827",
              fontWeight: "300",
              fontSize: 48,
              letterSpacing: 1,
              textAlign: "center",
              marginVertical: 15,
            }}
          >
            £{totalBalance.toFixed(2)}
          </Text>

          <Progress.Bar
            progress={totalBalance / groupGoal}
            width={SCREEN_WIDTH - 80}
            height={12}
            color="#3B82F6"
            unfilledColor="#E5E7EB"
            borderRadius={6}
            style={{ marginBottom: 15, alignSelf: "center" }}
          />

          <CustomButton
            title={goalReached ? "Goal Reached" : "Add money"}
            onPress={handleAddMoney}
            disabled={goalReached}
            style={{
              backgroundColor: goalReached ? "#906ef7" : "#3B82F6",
              borderRadius: 25,
              paddingVertical: 15,
              paddingHorizontal: 30,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 5,
              marginTop: 10,
              alignSelf: "center",
              width: SCREEN_WIDTH - 80,
              textAlign: "center",
            }}
          />
        </View>

        <View
          style={{
            width: SCREEN_WIDTH - 30,
            backgroundColor: "#FFFFFF",
            borderRadius: 20,
            padding: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
          }}
        >
          {contributions.map((contribution) => (
            <View
              key={contribution.id}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 15,
              }}
            >
              <Text style={{ fontWeight: "600", color: "#374151" }}>
                {contribution.name}
              </Text>
              <Text style={{ fontWeight: "600", color: "#374151" }}>
                {contribution.moneyIn}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default RenderItem;
