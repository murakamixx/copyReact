import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as signOutFirebaseAuth,
  sendPasswordResetEmail,
  User,
} from "firebase/auth";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../api/firebase/config";

type AuthResponseStatus = {
  isSuccess: boolean;
  user?: User;
  errorMessage?: string;
};

const FirebaseAuthContext = createContext<{
  authData: User | null;
  isAuthenticating: boolean;
  signUp: (
    email: string,
    password: string
  ) => Promise<AuthResponseStatus> | null;
  signIn: (
    email: string,
    password: string
  ) => Promise<AuthResponseStatus> | null;
  signOut: () => Promise<AuthResponseStatus> | null;
  resetPassword: (email: string) => Promise<AuthResponseStatus> | null;
}>({
  authData: null,
  signUp: () => null,
  signIn: () => null,
  signOut: () => null,
  resetPassword: () => null,
  isAuthenticating: false,
});

export const useFirebaseAuth = () => useContext(FirebaseAuthContext);

export const FirebaseAuthProvider = ({ children }: PropsWithChildren) => {
  const [authData, setAuthData] = useState<User | null>(null);

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const signUp = async (
    email: string,
    password: string
  ): Promise<AuthResponseStatus> => {
    try {
      setIsAuthenticating(true);
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return { user: userCredentials.user, isSuccess: true };
    } catch (err) {
      console.log(err);
      return { errorMessage: err.message, isSuccess: false };
    } finally {
      setIsAuthenticating(false);
    }
  };

  const signIn = async (
    email: string,
    password: string
  ): Promise<AuthResponseStatus> => {
    try {
      setIsAuthenticating(true);
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return { user: userCredentials.user, isSuccess: true };
    } catch (err) {
      console.log(err);
      return { errorMessage: err.message, isSuccess: false };
    } finally {
      setIsAuthenticating(false);
    }
  };

  const signOut = async (): Promise<AuthResponseStatus> => {
    try {
      setIsAuthenticating(true);
      await signOutFirebaseAuth(auth);
      return { isSuccess: true };
    } catch (err) {
      console.log(err);
      return { errorMessage: err.message, isSuccess: false };
    } finally {
      setIsAuthenticating(false);
    }
  };

  const resetPassword = async (email: string): Promise<AuthResponseStatus> => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { isSuccess: true };
    } catch (err) {
      console.log(err);
      return { errorMessage: err.message, isSuccess: false };
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setAuthData(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <FirebaseAuthContext.Provider
      value={{
        authData: authData,
        signIn,
        signOut,
        signUp,
        resetPassword,
        isAuthenticating: isAuthenticating,
      }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  );
};
