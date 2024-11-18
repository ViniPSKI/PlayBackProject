import { TextInput, View } from "react-native";
import  Icon  from "react-native-vector-icons/MaterialCommunityIcons";

interface InputProps{
    placeholder?: string;
    password?:string;
    classname?:string;
    icon?: string;
}

function Input({icon, ...props}:InputProps){
    const defaultstyle = "border border-gray rounded-xl flex flex-row items-center"
    return(
        <View className="flex flex-row">
            <View className={`${defaultstyle} ${props.classname}`}>
                {icon && (
                    <Icon 
                    name={icon}
                    className="px-2"
                    />
                )}
                <TextInput placeholder={props.placeholder}></TextInput>
            </View>
        </View>
    );
}

export default Input;