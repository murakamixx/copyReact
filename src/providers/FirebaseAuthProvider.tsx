import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as signOutFirebaseAuth,
  sendPasswordResetEmail,
  User
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
  ) => Promise<AuthResponseStatus>;
  signIn: (
    email: string,
    password: string
  ) => Promise<AuthResponseStatus>;
  signOut: () => Promise<AuthResponseStatus>;
  resetPassword: (email: string) => Promise<AuthResponseStatus>;
}>({
  authData: null,
  signUp: () => Promise.resolve({ isSuccess: false, errorMessage: "Not implemented" }),
  signIn: () => Promise.resolve({ isSuccess: false, errorMessage: "Not implemented" }),
  signOut: () => Promise.resolve({ isSuccess: false, errorMessage: "Not implemented" }),
  resetPassword: () => Promise.resolve({ isSuccess: false, errorMessage: "Not implemented" }),
  isAuthenticating: false,
});

export const useFirebaseAuth = () => useContext(FirebaseAuthContext);

export const FirebaseAuthProvider = ({ children }: PropsWithChildren) => {
  const [authData, setAuthData] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleAuthError = (err: unknown): AuthResponseStatus => {
    if (typeof err === 'string') {
      return { errorMessage: err, isSuccess: false };
    } else if (err instanceof Error) {
      return { errorMessage: err.message, isSuccess: false };
    }
    return { errorMessage: "Unknown error occurred", isSuccess: false };
  };

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
      console.error("Sign up error:", err);
      return handleAuthError(err);
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
      console.error("Sign in error:", err);
      return handleAuthError(err);
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
      console.error("Sign out error:", err);
      return handleAuthError(err);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const resetPassword = async (email: string): Promise<AuthResponseStatus> => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { isSuccess: true };
    } catch (err) {
      console.error("Password reset error:", err);
      return handleAuthError(err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setAuthData(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <FirebaseAuthContext.Provider
      value={{
        authData,
        signIn,
        signOut,
        signUp,
        resetPassword,
        isAuthenticating,
      }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  );
};