import { Timestamp } from "firebase/firestore";

export type UserDto = {
  bookings: BookingDto[];
};

export type BookingDto = {
  roomType: RoomTypes;
  name: string;
  price: string;
  roomNumber: string;
  arriveDate: Timestamp;
  leaveDate: Timestamp;
};

export type RoomTypes = "single" | "double" | "family";
