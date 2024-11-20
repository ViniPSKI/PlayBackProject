import { TextInput, View } from "react-native";

interface InputProps{
    placeholder?: string;
    password?:string;
    classname?:string;
    classnameText?:string;
    icon?: string;
    multiline?: boolean;
    placeholderTextColor?: string;
}

function InputReview({icon, ...props}:InputProps){
    const defaultstyle = "rounded-xl flex flex-row items-center"
    return(
        <View className="flex flex-row">
            <View className={`${defaultstyle} ${props.classname}`}>
                <TextInput 
                placeholder={props.placeholder}
                multiline={props.multiline}
                placeholderTextColor={props.placeholderTextColor || '#808080'}
                className={`${props.classnameText}`}>
                </TextInput>
            </View>
        </View>
    );
}

export default InputReview;
