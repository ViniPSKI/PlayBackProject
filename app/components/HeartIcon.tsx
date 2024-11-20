import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface HeartIconProps {
  isFavorited: boolean;
  onToggleFavorite: () => void;
  size?: number;
}

export default function HeartIcon({ isFavorited, size, onToggleFavorite }:HeartIconProps) {
  return (
    <Icon
      name={isFavorited ? 'heart' : 'heart-outline'}
      size={size ? size : 20}
      color={isFavorited ? 'red' : 'gray'}
      onPress={onToggleFavorite}
      style={{ marginRight: 10 }}
    />
  );
};

