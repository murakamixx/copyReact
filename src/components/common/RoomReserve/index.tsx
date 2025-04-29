import { useForm } from "react-hook-form";
import { useFirebaseAuth } from "../../../providers/FirebaseAuthProvider";
import { Button } from "../Button";
import { useState } from "react";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import { useFirebaseFirestore } from "../../../providers/FirebaseFirestoreProvider";
import { BookingDto, RoomTypes } from "../../../api/firebase/types";
import { Timestamp } from "firebase/firestore";

interface RoomReserveProps {
  cost: string;
  path: string;
  roomType: RoomTypes;
  className?: string;
}

const RESERVEROOMFORM_SCHEMA = yup.object({
  name: yup.string().required("Данное поле обязательно"),
  arriveDate: yup.date().required("Данное поле обязательно"),
  leaveDate: yup.date().required("Данное поле обязательно"),
});

export const RoomReserve = ({
  cost,
  path,
  className,
  roomType,
}: RoomReserveProps) => {
  const [isFormShowed, setFormShow] = useState(false);
  const FormShowChange = () => setFormShow(!isFormShowed);

  const { authData } = useFirebaseAuth();
  const { createBooking } = useFirebaseFirestore();
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(RESERVEROOMFORM_SCHEMA),
  });

  const onSubmit = async (data: {
    name: string;
    arriveDate: Date;
    leaveDate: Date;
  }) => {
    if (!authData) {
      navigate("/signin");
      return;
    } else {
      const booking: BookingDto = {
        roomType: roomType,
        name: data.name,
        price: cost,
        roomNumber: (
          Math.floor(Math.random() * (1216 - 1200 + 1)) + 1200
        ).toString(),
        arriveDate: Timestamp.fromDate(data.arriveDate),
        leaveDate: Timestamp.fromDate(data.leaveDate),
      };

      createBooking(booking);
      return;
    }
  };

  return (
    <div
      className={`flex flex-col justify-center items-center border-primary border-2 rounded-b-md py-6 md:py-10 ${className}`}
    >
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-10 w-full max-w-[95vw] mx-auto">
        <div className="flex gap-3 items-center min-w-[60%]">
          <Button
            url={isFormShowed ? "src/img/minus.svg" : "src/img/plus.svg"}
            onClick={FormShowChange}
            className="bg-accent p-2 md:p-3 rounded-full h-8 w-8 md:h-10 md:w-10 hover:bg-[#edc988] transition duration-100 ease-in cursor-pointer flex-shrink-0"
          />
          <p className="font-family-MontserratBold text-base md:text-xl uppercase text-primary text-left dark:text-white whitespace-nowrap overflow-hidden text-ellipsis">
            {isFormShowed ? "Скрыть детали" : "Показать детали"}
          </p>
        </div>
        <Button
          title={cost}
          onClick={FormShowChange}
          className="bg-accent font-family-MontserratBold text-white text-sm md:text-md rounded-sm py-2 px-4 md:py-3 md:px-6  hover:bg-[#edc988] transition duration-100 ease-in cursor-pointer flex-shrink-0"
        />
      </div>
      {isFormShowed && (
        <div className="flex flex-col lg:flex-row justify-between px-4 sm:px-6 md:px-10 w-full max-w-[95vw] mx-auto mt-6 md:mt-8 gap-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full lg:w-[55%] flex flex-col justify-between gap-4 md:gap-6"
          >
            <div className="flex flex-col gap-3">
              <input
                {...register("name")}
                placeholder="Фамилия, имя, отчество"
                className="w-full bg-[#F3F3F3] border-2 border-primary rounded-md pl-2 pr-4 py-2 md:py-3"
              />
              <p>{formState.errors.name?.message}</p>
              <input
                type="date"
                {...register("arriveDate")}
                placeholder="Дата заезда"
                className="w-full bg-[#F3F3F3] border-2 border-primary rounded-md pl-2 pr-4 py-2 md:py-3"
              />
              <p>{formState.errors.arriveDate?.message}</p>
              <input
                type="date"
                {...register("leaveDate")}
                placeholder="Дата выезда"
                className="w-full bg-[#F3F3F3] border-2 border-primary rounded-md pl-2 pr-4 py-2 md:py-3"
              />
              <p>{formState.errors.leaveDate?.message}</p>
            </div>
            <Button
              type="submit"
              title="ЗАБРОНИРОВАТЬ"
              disabled={!authData}
              className={`w-full bg-accent font-family-MontserratBold text-white text-sm md:text-md rounded-sm py-2 px-4 md:py-3 md:px-6 hover:bg-[#edc988] transition duration-100 ease-in cursor-pointer`}
            />
          </form>
          <div
            style={{
              backgroundImage: `url(${path})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="w-full lg:w-[40%] aspect-[4/3] rounded-xl"
          />
        </div>
      )}
    </div>
  );
};
