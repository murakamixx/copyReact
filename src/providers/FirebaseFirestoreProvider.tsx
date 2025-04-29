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
  getUserData: () => Promise<FirebaseFirestoreResponse> | null;
  createBooking: (
    booking: BookingDto
  ) => Promise<FirebaseFirestoreResponse> | null;
}>({
  userData: undefined,
  isLoading: false,
  getUserData: () => null,
  createBooking: () => null,
});

const db = getFirestore(firebaseApp);

export const useFirebaseFirestore = () => useContext(FirebaseFirestoreContext);

export const FirebaseFirestoreProvider = ({ children }: PropsWithChildren) => {
  const [userData, setUserData] = useState<UserDto | undefined>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { authData } = useFirebaseAuth();

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
          return { isSuccess: false, errorMessage: "userIsNotRegistered" };
        }
      } else {
        return {
          isSuccess: false,
          errorMessage: "Not authenticated",
        };
      }
    } catch (err) {
      console.log(err);
      return { isSuccess: false, errorMessage: err };
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
        return {
          isSuccess: true,
        };
      } else {
        return {
          isSuccess: false,
          errorMessage: "Not authenticated",
        };
      }
    } catch (err) {
      console.log(err);
      return { isSuccess: false, errorMessage: err };
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
        console.log(booking);
        await updateDoc(docRef, { bookings: [...userData.bookings, booking] });
        userData.bookings = [...userData.bookings, booking];
        setUserData(userData);
        return {
          isSuccess: true,
        };
      } else {
        return {
          isSuccess: false,
          errorMessage: "Not authenticated",
        };
      }
    } catch (err) {
      console.log(err);
      return { isSuccess: false, errorMessage: err };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FirebaseFirestoreContext.Provider
      value={{
        userData: userData,
        isLoading,
        createBooking,
        getUserData,
      }}
    >
      {children}
    </FirebaseFirestoreContext.Provider>
  );
};
