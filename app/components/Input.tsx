import { useState } from "react";
import { TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface InputProps{
    placeholder?: string;
    password?:boolean;
    classname?:string;
    icon?: string;
    multiline?:boolean;
    styleTextInput?:string;
    value?: string;
    onChangeText?: (text: string) => void;
}

function Input({ icon, password, multiline, ...props }: InputProps) {
    const defaultstyle = "border-gray rounded-xl flex flex-row items-center";
    const [secure, setSecure] = useState(password);
    
    return (
        <View className={`${defaultstyle} ${props.classname}`}>
            {icon && (
                <Icon 
                    name={icon}
                    className="px-2"
                />
            )}
            <TextInput
                multiline={multiline}
                secureTextEntry={secure}
                placeholder={props.placeholder}
                className={props.styleTextInput}
                defaultValue={props.value} 
                onChangeText={props.onChangeText} 
            />
            {password && 
                <Icon
                    name={secure ? "eye" : 'eye-off-outline'}
                    size={20}
                    color='gray' 
                    className="absolute right-3"
                    onPress={() => setSecure(!secure)}
                />
            }
        </View>
    );
}


export default Input;
