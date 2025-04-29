import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { BookingDto, UserDto } from "../api/firebase/types";
import { useFirebaseAuth } from "./FirebaseAuthProvider";
import { firebaseApp } from "../api/firebase/config";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";

type FirebaseFirestoreResponse = {
  isSuccess: boolean;
  errorMessage?: string;
};

const FirebaseFirestoreContext = createContext<{
  userData: UserDto | undefined;
  isLoading: boolean;
  getUserData: () => Promise<FirebaseFirestoreResponse>;
  createBooking: (booking: BookingDto) => Promise<FirebaseFirestoreResponse>;
}>({
  userData: undefined,
  isLoading: false,
  getUserData: () => Promise.resolve({ isSuccess: false, errorMessage: "Not implemented" }),
  createBooking: () => Promise.resolve({ isSuccess: false, errorMessage: "Not implemented" }),
});

const db = getFirestore(firebaseApp);

export const useFirebaseFirestore = () => useContext(FirebaseFirestoreContext);

export const FirebaseFirestoreProvider = ({ children }: PropsWithChildren) => {
  const [userData, setUserData] = useState<UserDto | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { authData } = useFirebaseAuth();

  const handleFirestoreError = (err: unknown): FirebaseFirestoreResponse => {
    if (typeof err === 'string') {
      return { isSuccess: false, errorMessage: err };
    } else if (err instanceof Error) {
      return { isSuccess: false, errorMessage: err.message };
    }
    return { isSuccess: false, errorMessage: "Unknown error occurred" };
  };

  useEffect(() => {
    if (authData) {
      getUserData();
    }
  }, [authData]);

  const getUserData = async (): Promise<FirebaseFirestoreResponse> => {
    try {
      if (authData?.uid) {
        const docRef = doc(db, "users", authData.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data() as UserDto);
          return { isSuccess: true };
        } else {
          await createUser();
          return { isSuccess: false, errorMessage: "User is not registered" };
        }
      }
      return { isSuccess: false, errorMessage: "Not authenticated" };
    } catch (err) {
      console.error("Get user data error:", err);
      return handleFirestoreError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const createUser = async (): Promise<FirebaseFirestoreResponse> => {
    try {
      setIsLoading(true);
      if (authData?.uid) {
        const user: UserDto = { bookings: [] };
        await setDoc(doc(db, "users", authData.uid), user);
        return { isSuccess: true };
      }
      return { isSuccess: false, errorMessage: "Not authenticated" };
    } catch (err) {
      console.error("Create user error:", err);
      return handleFirestoreError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const createBooking = async (
    booking: BookingDto
  ): Promise<FirebaseFirestoreResponse> => {
    try {
      setIsLoading(true);
      if (authData?.uid && userData) {
        const docRef = doc(db, "users", authData.uid);
        await updateDoc(docRef, { 
          bookings: [...userData.bookings, booking] 
        });
        setUserData({
          ...userData,
          bookings: [...userData.bookings, booking]
        });
        return { isSuccess: true };
      }
      return { isSuccess: false, errorMessage: "Not authenticated" };
    } catch (err) {
      console.error("Create booking error:", err);
      return handleFirestoreError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FirebaseFirestoreContext.Provider
      value={{
        userData,
        isLoading,
        createBooking,
        getUserData,
      }}
    >
      {children}
    </FirebaseFirestoreContext.Provider>
  );
};