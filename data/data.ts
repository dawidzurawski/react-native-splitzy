import { AnimationObject } from "lottie-react-native";

export interface OnboardingData {
  id: number;
  animation: AnimationObject;
  text: string;
  textColor: string;
  backgroundColor: string;
}

const data: OnboardingData[] = [
  {
    id: 1,
    animation: require("../assets/animations/Lottie1.json"),
    text: "£3726",
    textColor: "#1e2169",
    backgroundColor: "#bae4fd",
  },
  {
    id: 2,
    animation: require("../assets//animations/Lottie2.json"),
    text: "£620",
    textColor: "#005b4f",
    backgroundColor: "#ffa3ce",
  },
  {
    id: 3,
    animation: require("../assets//animations/Lottie3.json"),
    text: "£1238",
    textColor: "#F15937",
    backgroundColor: "#faeb8a",
  },
];

export default data;
