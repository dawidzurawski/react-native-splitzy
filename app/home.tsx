import React from "react";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import RenderItem from "@/components/RenderItem";
import data, { OnboardingData } from "@/data/data";
import { FlatList, View, ViewToken, Image } from "react-native";
import Pagination from "@/components/Pagination";
import { useRoute } from "@react-navigation/native"; // Import to get route params

const Home = () => {
  const flatlistRef = useAnimatedRef<FlatList<OnboardingData>>();
  const x = useSharedValue(0);
  const flatlistIndex = useSharedValue(0);

  const splitzyLogo = require("../assets/splitzy-logo.png"); // Adjust path to your logo

  // Retrieve eventData from route params
  const route = useRoute();
  const { eventData } = route.params || {}; // Get the passed eventData from navigation

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems[0].index !== null) {
      flatlistIndex.value = viewableItems[0].index;
    }
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <View className="flex-1 items-center justify-start bg-white">
      <View className="mt-10 items-center">
        <Image source={splitzyLogo} style={{ width: 100, height: 40 }} />
      </View>

      <Animated.FlatList
        ref={flatlistRef}
        onScroll={onScroll}
        data={data}
        renderItem={({ item, index }) => {
          // Pass the eventData to RenderItem
          return (
            <RenderItem item={item} index={index} x={x} eventData={eventData} />
          );
        }}
        keyExtractor={(item) => item.id.toString()}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <View className="absolute bottom-5 mx-8 py-X flex-row justify-between items-center">
        <Pagination data={data} x={x} />
      </View>
    </View>
  );
};

export default Home;
