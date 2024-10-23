import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";

const splitzyLogo = require("../assets/splitzy-logo.png");

const Index = () => {
  const [groupEvent, setGroupEvent] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [savingsGoal, setSavingsGoal] = useState("");
  const [goalDate, setGoalDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const navigation = useNavigation();

  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || goalDate;
    setShowDatePicker(false);
    setGoalDate(currentDate);
  };

  const handleSubmit = () => {
    const eventData = {
      groupEvent,
      groupSize,
      savingsGoal,
      goalDate,
    };

    navigation.navigate("home", { eventData });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#44bca3" }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Image
          source={splitzyLogo}
          style={{
            width: 120,
            height: 40,
            alignSelf: "center",
            marginVertical: 20,
          }}
        />

        <View
          style={{
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 20,
            marginBottom: 30,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#333",
              marginBottom: 10,
            }}
          >
            What is your group event?
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#e0e0e0",
              padding: 15,
              borderRadius: 10,
              marginBottom: 20,
            }}
            placeholder="Enter event name"
            value={groupEvent}
            onChangeText={(text) => setGroupEvent(text)}
          />
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 20,
            marginBottom: 30,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#333",
              marginBottom: 10,
            }}
          >
            How many people are in your group?
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#e0e0e0",
              padding: 15,
              borderRadius: 10,
              marginBottom: 20,
            }}
            placeholder="Enter group size"
            keyboardType="numeric"
            value={groupSize}
            onChangeText={(text) => setGroupSize(text)}
          />
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 20,
            marginBottom: 30,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#333",
              marginBottom: 10,
            }}
          >
            What is your group savings goal?
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#e0e0e0",
              padding: 15,
              borderRadius: 10,
              marginBottom: 20,
            }}
            placeholder="Enter savings goal"
            keyboardType="numeric"
            value={savingsGoal}
            onChangeText={(text) => setSavingsGoal(text)}
          />
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            padding: 20,
            borderRadius: 20,
            marginBottom: 30,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#333",
              marginBottom: 10,
            }}
          >
            When do you want to reach this goal by?
          </Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={{
              paddingVertical: 15,
              backgroundColor: "#e0e0e0",
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, color: "#555" }}>
              {goalDate.toDateString()}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={goalDate}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            backgroundColor: "#906ef7",
            paddingVertical: 15,
            borderRadius: 30,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>
            Submit
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
