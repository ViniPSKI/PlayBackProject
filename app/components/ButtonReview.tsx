import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import React from 'react';

interface ButtonProps extends TouchableOpacityProps {
  textButton?: string;
  classname?: string;
  textStyle?: string;
  fontSize?: number; // Nova propriedade para o tamanho da fonte
}

export default function ButtonReview({
  textButton,
  classname,
  textStyle,
  fontSize = 14, // Tamanho de fonte padrão se não for passado
  ...props
}: ButtonProps) {
  const defaultStyle = 'items-center justify-center rounded-md flex-row';

  return (
    <TouchableOpacity className={`${defaultStyle} ${classname}`} {...props}>
      {textButton && (
        <Text
          className={`font-semibold  ${textStyle}`}
          style={{ fontSize }} // Aplica o tamanho da fonte no texto
        >
          {textButton}
        </Text>
      )}
    </TouchableOpacity>
  );
}
