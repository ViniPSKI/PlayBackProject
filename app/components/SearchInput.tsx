import React from 'react';
import { TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface InputProps {
  placeholder?: string;
  classname?: string;
}

const SearchInput = ({ placeholder, classname }: InputProps) => {
  const defaultStyle = 'flex-row items-center border rounded-lg p-2';

  return (
    <View className={`${defaultStyle} ${classname}`}>
      {/* Ícone da lupa */}
      <Icon name="magnify" size={20} color="#808080" className="mr-2" />

      {/* Campo de texto */}
      <TextInput
        placeholder={placeholder}
        style={{ flex: 1, fontSize: 16 }} // Ajusta o estilo do texto
      />
    </View>
  );
};

export default SearchInput;
