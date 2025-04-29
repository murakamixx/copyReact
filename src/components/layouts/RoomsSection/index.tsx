import { RoomTypes } from "../../../api/firebase/types";
import { Reviews } from "../../common/Reviews";
import { RoomCard } from "../../common/RoomCard";

export const RoomsSection = () => {
  const RoomsArray: Array<{
    title: string;
    cost: string;
    path: string;
    roomType: RoomTypes;
  }> = [
    {
      title: "Одиночный",
      cost: "$147 Ср/Ночь",
      path: "src/img/SoloRoom.jpeg",
      roomType: "single",
    },
    {
      title: "Двойной",
      cost: "$155 Ср/Ночь",
      path: "src/img/DoubleRoom.jpeg",
      roomType: "double",
    },
    {
      title: "Семейный",
      cost: "$180 Ср/Ночь",
      path: "src/img/FamilyRoom.jpeg",
      roomType: "family",
    },
  ];
  return (
    <div className="flex flex-col items-center gap-20 dark:bg-[#091121]">
      <div className="flex flex-col items-center mt-[76px] w-[60vw] gap-[20px] mb-7">
        <h1 className="font-family-Header text-primary text-5xl uppercase dark:text-white">
          Номера
        </h1>
        <p className="font-family-Montserrat text-primary text-xl text-center dark:text-white">
          В каждом из наших светлых, залитых светом номеров есть все, что вам
          может понадобиться для комфортного проживания. И да, комфорт — не
          единственная наша цель, мы также ценим хороший дизайн, элегантную
          современную мебель, дополненную богатыми тонами палитры природы,
          которые видны из окон и террас наших номеров с видом на море.
        </p>
      </div>
      {RoomsArray.map((room, index) => (
        <RoomCard
          title={room.title}
          cost={room.cost}
          path={room.path}
          key={index}
          roomType={room.roomType}
        />
      ))}
      <Reviews className="mt-30 w-[70vw]" />
    </div>
  );
};
