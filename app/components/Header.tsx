import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface HeaderProps {
  title: string;
  onBackPress: () => void;
  classname?: string;
}

function Header({ title, onBackPress, classname }: HeaderProps) {
  const defaultStyle = "flex flex-row items-center justify-between p-4 mt-10";

  return (
    <View className={`${defaultStyle} ${classname}`}>

      <TouchableOpacity onPress={onBackPress}>
        <Icon name="chevron-left" size={60} color="gray" />
      </TouchableOpacity>

      <Text className="text-[27px] text-center flex-1">{title}</Text>

      <View style={{ width: 24 }} />
    </View>
  );
}

export default Header;
