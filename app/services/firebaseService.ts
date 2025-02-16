import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, set, child, get, update } from 'firebase/database';
import { auth, database} from '../../firebase';
import { User } from '../interfaces/user';
import  AsyncStorage  from "@react-native-async-storage/async-storage";

export async function signUp (user: User) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
        const userId = userCredential.user.uid;

        await set(ref(database, `/users/${userId}`), user)
        return { user: userCredential.user };
      } catch (error:any) {
        return { error: error.message };
      }
};

export async function singIn(email:string, password:string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user.uid;
  } catch (error:any) {
    return null;
  }
};

export async function signOut() {
  await auth.signOut();
  AsyncStorage.removeItem("user")
}

export async function getUser(id?: string) {
  try{
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `users/${id}`));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  }catch(error:any){
    console.error('Erro ao recuperar usuário:', error.message);
  }
}

export async function updateUser(newData: Partial<User>,userId?: string) {
  try {
    await update(ref(database, `users/${userId}`), newData);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
  }
};
