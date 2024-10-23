import { AnimationObject } from "lottie-react-native";

export interface OnboardingData {
  id: number;
  people: number;
  animation: AnimationObject;
  title: string;
  description: string;
  text: string;
  amountDescription: string;
  textColor: string;
  backgroundColor: string;
}

const data: OnboardingData[] = [
  {
    id: 1,
    animation: require("../assets/animations/Lottie1.json"),
    title: "Group Event 2024",
    people: 5,
    description: "Reach your goal by March 1st 2024.",
    text: "£3726",
    amountDescription: "Total event balance:",
    textColor: "#333", // matching the darker text from the image
    backgroundColor: "#E8F5E9", // soft pastel green
  },
  {
    id: 2,
    animation: require("../assets/animations/Lottie2.json"),
    title: "Group Event 2024",
    people: 5,
    description: "You contributed to the event balance.",
    text: "£620",
    amountDescription: "Your contribution:",
    textColor: "#333",
    backgroundColor: "#F1F8E9", // another soft pastel color
  },
];

export default data;

export const moneyData = [];
