import { auth } from "../plugins/firebase";
import { auth as Iauth } from "firebase";

const emailLogin = async (email: string, password: string): Promise<Iauth.UserCredential | null> => {
    try {
        return await auth.signInWithEmailAndPassword(email, password)
    } catch (error) {
        console.log(error)
        return null
    }
}

const logout = async (): Promise<void> => {
    try {
        await auth.signOut()
    } catch (error) {
        console.log(error)
    }
}

export {
    emailLogin,
    logout
}
