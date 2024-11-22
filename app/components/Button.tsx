import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ButtonProps extends TouchableOpacityProps {
  textButton?: string;
  classname?: string;
  icon?: string;
  iconSize?: number;
  iconColor?: string;
  textStyle?: string;
}

export default function Button({
  textButton,
  classname,
  icon,
  iconSize = 20,
  iconColor = '#000',
  textStyle,
  ...props
}: ButtonProps) {
  const defaultStyle = 'items-center justify-center rounded-md flex-row p-1';

  return (
    <TouchableOpacity className={`${defaultStyle} ${classname}`} {...props}>
      {icon && (
        <Icon 
          name={icon} 
          size={iconSize} 
          color={iconColor} 
          style={{ marginRight: textButton ? 8 : 0 }} 
        />
      )}
      {textButton && <Text className={`font-semibold ${textStyle}`}>{textButton}</Text>}
    </TouchableOpacity>
  );
}
