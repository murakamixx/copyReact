import { RoomTypes } from "../../../api/firebase/types";
import { RoomReserve } from "../RoomReserve";

interface RoomCardProps {
  title: string;
  cost: string;
  path: string;
  roomType: RoomTypes;
  className?: string;
}

export const RoomCard = ({
  title,
  cost,
  path,
  className,
  roomType,
}: RoomCardProps) => {
  return (
    <div className="w-full md:w-[90vw] lg:w-[70vw] mx-auto">
      <div
        style={{
          backgroundImage: `url(${path})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className={`relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex justify-center items-end rounded-t-md ${className}`}
      >
        <div className="bg-primary flex justify-center items-center h-16 md:h-20 lg:h-25 w-full">
          <h1 className="font-family-MontserratBold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white uppercase px-2 text-center">
            {title}
          </h1>
        </div>
      </div>
      <RoomReserve
        cost={cost}
        path={path}
        roomType={roomType}
        className="w-full"
      />
    </div>
  );
};
