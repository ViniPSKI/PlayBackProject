import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { User } from "./interfaces/user";
import { useAuth } from "./contexts/auth/AuthProvider";
import { getUser } from "./services/firebaseService";
import ListUser from "./components/listUser";

export default function FallowingList(){
    const { userData } = useAuth();
    const [followingList, setFollowingList] = useState<User[]>([]);

    async function getUsersFollowing() {
        const userPromises = (userData?.following?.map((userId) => getUser(userId))) as [];
        const users = await Promise.all(userPromises);
        setFollowingList(users);
    }

    useEffect(()=>{
        getUsersFollowing();
    },[])

    return(
        <View className="p-2 flex gap-2">
            <Text className="font-medium text-xl text-center">Você segue</Text>
            {followingList.map((user, key)=>(
                <ListUser key={key} {...user} />
            ))}
        </View>
    );
}