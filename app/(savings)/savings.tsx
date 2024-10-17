import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated from "react-native-reanimated";
import RenderItem from "@/components/RenderItem";
import data from "@/data/data";

const Savings = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Animated.FlatList
        data={data}
        renderItem={({ item, index }) => {
          return <RenderItem item={item} index={index} />;
        }}
        keyExtractor={(item) => item.id}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Savings;
